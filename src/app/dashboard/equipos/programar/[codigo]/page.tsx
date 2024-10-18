"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  crearProgramacionEquipo,
  obtenerEquipoPorCodigo,
} from "../../../hooks/useEquipo";
import {
  Form,
  FormControl,
  FormDescription,
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
import { AlertCircle, CalendarIcon, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { obtenerActividades } from "../../../hooks/useActividad";
import { obtenerFrecuencias } from "../../../hooks/useFrecuencia";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const formSchema = z.object({
  codigo: z.string(),
  descripcion: z.string(),
  actividad: z.string().min(2, { message: "actividad requerida" }),
  frecuencia: z.string().min(2, { message: "frecuencia requerida" }),
  fechaInicio: z.date({ required_error: "fechaInicio requerida" }),
});
export default function Programar() {
  const params = useParams<{ codigo: string }>();
  const router = useRouter();

  const { toast } = useToast();
  const { obtener, equipo } = obtenerEquipoPorCodigo(params.codigo);
  const { actividades } = obtenerActividades();
  const { frecuencias } = obtenerFrecuencias();
  const { crear, isLoading, error, errorMsg } = crearProgramacionEquipo();
  useEffect(() => {
    obtener();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  useEffect(() => {
    form.setValue("codigo", equipo?.codigo!);
    form.setValue("descripcion", equipo?.descripcion!);
  }, [equipo]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await crear({
      actividadId: values.actividad,
      codigo: values.codigo,
      fechaProgramacion: values.fechaInicio.toISOString(),
      frecuenciaId: values.frecuencia,
      equipoId: equipo?.id!,
    });
    toast({
      title: "Equipo se guardo correctamente",
      variant: "success",
    });
    router.push("/dashboard/equipos/programacion");
  }

  return (
    <>
      <h2 className="text-center mb-4 font-semibold">
        Programacion de Equipos
      </h2>
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
                    <Input disabled {...field} value={equipo?.codigo ?? ""} />
                  </FormControl>
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
                    <Input
                      disabled
                      {...field}
                      value={equipo?.descripcion ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="actividad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Actividad</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una Actividad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {actividades.map((res) => (
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
              name="frecuencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frecuencia</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una Frecuencia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {frecuencias.map((res) => (
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
              name="fechaInicio"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha inicial</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= new Date()}
                        initialFocus
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Fecha de inicio de la programcion del equipo.
                  </FormDescription>
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
            Programa Equipo
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
