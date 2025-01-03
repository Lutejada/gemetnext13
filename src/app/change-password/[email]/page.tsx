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
import { useParams } from "next/navigation";
import { useVerifyNewUser } from "@/app/dashboard/hooks/useAuth";
import { getSubdomain } from "@/lib/helpers/getSubDoimain";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

const passwordChangeSchema = z
  .object({
    verificationCode: z.string().min(8, {
      message: "El código de verificación debe tener al menos 8 caracteres",
    }),
    newPassword: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type PasswordChangeSchema = z.infer<typeof passwordChangeSchema>;

export default function PasswordChangeForm() {
  const form = useForm<PasswordChangeSchema>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      verificationCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const params = useParams();

  const { verify, error, errorMsg, isLoading } = useVerifyNewUser();
  async function onSubmit(values: PasswordChangeSchema) {
    // Aquí iría la lógica para cambiar la contraseña
    const decodeEmail = decodeURIComponent(params?.email as string);
    const clienteNombre = getSubdomain() ?? "";
    await verify({
      password: values.newPassword,
      verifiedCode: values.verificationCode,
      clienteNombre: clienteNombre,
      correo: decodeEmail,
    });
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cambiar Contraseña</CardTitle>
          <CardDescription>
            Ingresa tu código de verificación y nueva contraseña
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código de Verificación</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa el código de verificación"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Ingresa tu nueva contraseña"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repetir Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Repite tu nueva contraseña"
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
                Cambiar Contraseña
              </Button>
            </CardFooter>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      </Card>
    </div>
  );
}
