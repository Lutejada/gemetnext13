"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForgotPassword } from "../dashboard/hooks/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSubdomain } from "@/lib/helpers/getSubDoimain";

const passwordForgotSchema = z.object({
  email: z.string().email(),
});

export type PasswordForgotSchema = z.infer<typeof passwordForgotSchema>;
export default function ForgotPassword() {
  const router = useRouter();
  const { error, isLoading, send, errorMsg, response } = useForgotPassword();
  const form = useForm<PasswordForgotSchema>({
    resolver: zodResolver(passwordForgotSchema),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();
  async function onSubmit(values: PasswordForgotSchema) {
    const clienteNombre = getSubdomain() ?? "";
    await send({
      email: values.email,
      clienteNombre,
    });
    toast({
      title: "Recibiras un correo con las instrucciones",
      variant: "success",
    });
    router.push("/login<");
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Olvide mi contraseña</CardTitle>
          <CardDescription>Ingresa tu email</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electronico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="correo@correo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="mx-auto">
                <Loader2
                  className={
                    "mr-2 h-4 w-4 animate-spin " + (!isLoading ? "hidden" : "")
                  }
                />
                Solicitar cambio
              </Button>
            </CardFooter>
          </form>
        </Form>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}
      </Card>
    </div>
  );
}
