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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import {  useState } from "react";
import { obtenerMarcas } from "../../../hooks/useMarca";

import {
  obtenerUbicaciones,
} from "../../../hooks/useUbicaciones";

import { useRouter } from "next/navigation";
import { Patron } from "@/app/api/patrones/dominio";
import { editarDatosBasicos } from "@/app/dashboard/hooks/usePatron";
const formSchema = z.object({
  codigo: z.string().min(2, { message: "codigo requerido" }),
  descripcion: z.string().min(2, { message: "descripcion requerido" }),
  modelo: z.string().min(2, { message: "modelo requerido" }),
  serie: z.string().min(2, { message: "serie requerido" }),
  marcaId: z.string().min(2, { message: "marca requerido" }),
  ubicacionId: z.string().min(2, { message: "ubicacionId requerido" }),
});

interface Props {
  patron: Patron;
}

function EditarPatronesBasicos({ patron }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: patron.codigo,
      descripcion: patron.descripcion,
      modelo: patron.modelo,
      serie: patron.serie,
      marcaId: patron.marca_id,
      ubicacionId: patron.ubicacionId,
    },
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const { marcas } = obtenerMarcas();
  const { ubicaciones } = obtenerUbicaciones();
  const { editar, errorMsg, error } = editarDatosBasicos();

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editar({
      codigo: values.codigo,
      descripcion: values.descripcion,
      modelo: values.modelo,
      serie: values.serie,
      marcaId: values.marcaId,
      ubicacionId: values.ubicacionId,
    });
    form.reset();
    toast({
      title: "patron se edito correctamente",
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
                  <FormLabel>Codigo</FormLabel>
                  <FormControl>
                    <Input disabled {...field} value={patron?.codigo} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input disabled={isDisabled} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input disabled={isDisabled} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serie</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marcaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={isDisabled}
                    value={field.value}
                    defaultValue={patron.marca_id}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={"hola"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {marcas.map((res) => (
                        <>
                          <SelectItem value={res.id} key={res.id}>
                            {res.descripcion}
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ubicacionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicacion</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={isDisabled}
                    value={field.value}
                    defaultValue={patron.ubicacionId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={patron?.ubicacion?.nombre} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ubicaciones.map((res) => (
                        <>
                          <SelectItem value={res.id} key={res.id}>
                            {res.nombre}
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
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

export default EditarPatronesBasicos;
