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
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { editarDatosMetrologicos } from "@/app/dashboard/hooks/usePatron";
import { Patron } from "@/app/api/patrones/dominio";
const formSchema = z.object({
  codigo: z.string({ description: "codigo requerido" }),
  emp: z.coerce
    .string({ description: "emp requerido" })
    .transform((val) => Number(val)),
  divisionEscala: z.coerce
    .string({ description: "division_escala requerido" })
    .transform((val) => Number(val)),
  resolucion: z.coerce
    .string({ description: "resolucion requerido" })
    .transform((val) => Number(val)),
  rangoMinimo: z.coerce
    .string({ description: "rango_minimo requerido" })
    .transform((val) => Number(val)),
  rangoMaximo: z.coerce
    .string({ description: "rango_maximo requerido" })
    .transform((val) => Number(val)),
});
interface Props {
  patron: Patron;
}
function EditarDatosmetrologicos({ patron }: Props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const { editar, error, errorMsg } = editarDatosMetrologicos();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: patron.codigo,
      divisionEscala: patron.datos_metrologicos?.division_escala,
      emp: patron.datos_metrologicos?.emp,
      rangoMaximo: patron.datos_metrologicos?.rango_maximo,
      rangoMinimo: patron.datos_metrologicos?.rango_minimo,
      resolucion: patron.datos_metrologicos?.resolucion,
    },
  });
  useEffect(() => {}, []);

  if (patron.datos_metrologicos?.division_escala === undefined) {
    return <p>El equipo no tiene datos metrologicos</p>;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editar({
      codigo: values.codigo,
      divisionEscala: values.divisionEscala,
      emp: values.emp,
      rangoMaximo: values.rangoMaximo,
      rangoMinimo: values.rangoMinimo,
      resolucion: values.resolucion,
    });

    form.reset();
    toast({
      title: "Patron se edito correctamente",
      variant: "success",
    });
    router.push("/dashboard/patrones/consultar");
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
                    <Input {...field} value={patron?.codigo} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="divisionEscala"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division de escala</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emp</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rangoMaximo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango Maximo</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rangoMinimo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango Minimo</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolucion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolucion</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="button"
            style={{ display: !isDisabled ? "none" : "block" }}
            onClick={() => setIsDisabled(false)}
            className="mx-auto"
          >
            Editar Patron
          </Button>

          <Button
            type="submit"
            disabled={false}
            className="mx-auto"
            style={{ display: isDisabled ? "none" : "block" }}
          >
            <Loader2
              className={
                "mr-2 h-4 w-4 animate-spin " + (!false ? "hidden" : "")
              }
            />
            Guardar Cambios
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

export default EditarDatosmetrologicos;
