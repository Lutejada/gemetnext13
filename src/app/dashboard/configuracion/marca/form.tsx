"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { crearMarca, editarMarca } from "../../hooks/useMarca";
import { Marca } from "@/app/api/marca/dominio";

const formSchema = z.object({
  descripcion: z
    .string()
    .min(2, { message: "requerido" })
    .max(20, "los caracteres maximos son 20"),
  identificacion: z.string().min(2, { message: "requerido" }),
});

interface Props {
  isEditing?: boolean;
  marca?: Marca;
  closeModal?: () => void;
}

export function MarcaForm({ isEditing = false, marca, closeModal }: Props) {
  const labelform = isEditing ? "Editar Marca" : "Crear Marca";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identificacion: marca?.identificacion ?? "",
      descripcion: marca?.descripcion ?? "",
    },
  });

  const { toast } = useToast();
  const { crear, error, errorMsg, isLoading: isLoadingCreated } = crearMarca();
  const { editar, isLoading: isLoadingEdit } = editarMarca();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditing) {
      await editar({
        identificacion: values.identificacion,
        descripcion: values.descripcion,
        id: marca?.id!,
      });
    } else {
      await crear({
        identificacion: values.identificacion,
        descripcion: values.descripcion,
      });
    }

    if (closeModal) {
      closeModal();
    }
    form.reset();
    toast({
      title: "Marca se guardo correctamente",
      variant: "success",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 grid-rows-1 gap-2">
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese una descripcion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="identificacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identificacion</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese un alias" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoadingEdit || isLoadingCreated} className="mx-auto">
          <Loader2
            className={
              "mr-2 h-4 w-4 animate-spin " + ((isLoadingCreated || isLoadingEdit) ? "" : "hidden")
            }
          />
          {labelform}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
