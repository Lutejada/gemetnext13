"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSubdomain } from "@/lib/helpers/getSubDoimain";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { set } from "date-fns";

const formSchema = z.object({
  correo: z.string().email(),
  password: z.string().min(8),
});

export default function ProfileForm() {
  // ...ç
  // 1. Define your form.
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: "",
      password: "",
    },
  });
  const [error, setError] = useState({
    isError: false,
    errorMsg: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError({
      errorMsg: "",
      isError: false,
    });
    const res = await signIn("credentials", {
      correo: values.correo,
      password: values.password,
      cliente: getSubdomain(),
      redirect: false,
    });
    if (res?.error === "Correo no verificado") {
      setError({
        errorMsg: res.error,
        isError: true,
      }); // mostrar error
      setIsLoading(false);
      return;
    }
    if (res?.error) {
      //pendiente por agregar el mensaje de error
      setError({
        errorMsg: res.error,
        isError: true,
      });
      setIsLoading(false);
      return;
    }
    router.push("/dashboard");
    setIsLoading(false);
  }

  return (
    <>
      <div className=" flex container relative h-[729px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
          <Image src="/banner-login.jpg" alt="me" width={1280} height={843} />
        </div>
        <div className="w-full p-4 md:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Image src="/logo.jpg" alt="me" width={150} height={50} />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="correo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo</FormLabel>
                      <FormControl>
                        <Input placeholder="correo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Olvide mi contraseña
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex mx-auto"
                >
                  <Loader2
                    className={
                      "mr-2 h-4 w-4 animate-spin " +
                      (!isLoading ? "hidden" : "")
                    }
                  />
                  Solicitar cambio
                </Button>
                {error.isError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.errorMsg}</AlertDescription>
                  </Alert>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
