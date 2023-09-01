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
import { obtenerUbicaciones } from "../../hooks/useUbicaciones";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { obtenerMarcas } from "../../hooks/useMarca";
import { crearDatosMetrologicos, crearEquipo } from "../../hooks/useEquipo";

const formSchema = z.object({
  codigo: z.string({ description: "codigo requerido" }),
  emp: z
    .string({ description: "emp requerido" })
    .transform((val) => Number(val)),
  divisionEscala: z
    .string({ description: "division_escala requerido" })
    .transform((val) => Number(val)),
  resolucion: z
    .string({ description: "resolucion requerido" })
    .transform((val) => Number(val)),
  rangoMinimo: z
    .string({ description: "rango_minimo requerido" })
    .transform((val) => Number(val)),
  rangoMaximo: z
    .string({ description: "rango_maximo requerido" })
    .transform((val) => Number(val)),
});

function CrearDatosComplementarios() {
  const { crear, error, errorMsg, isLoading } = crearDatosMetrologicos();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    await crear({
      codigo: values.codigo,
      divisionEscala: values.divisionEscala,
      emp:values.emp,
      rangoMaximo:values.rangoMaximo,
      rangoMinimo:values.rangoMinimo,
      resolucion:values.resolucion
    });

    form.reset();
    toast({
      title: "Datos complementarios se guardaron correctamente",
      variant: "success",
    });
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <FormField
              control={form.control}
              name="codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo Equipo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese codigo del equipo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="mx-auto">
            <Loader2
              className={
                "mr-2 h-4 w-4 animate-spin " + (!isLoading ? "hidden" : "")
              }
            />
            Crear Datos Complementarios
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
    </>
  );
}

export default CrearDatosComplementarios;
