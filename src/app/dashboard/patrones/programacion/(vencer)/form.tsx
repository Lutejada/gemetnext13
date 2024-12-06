"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AlertCircle, CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { obtenerResponsables } from "@/app/dashboard/hooks/useResponsables";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { crearEjecucionPatron } from "@/app/dashboard/hooks/useEjecucionPatron";
import { useRouter } from "next/navigation";
import { validateFileListSize } from "@/app/api/common/files/filesSize";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  fechaEjecucion: z.date({ required_error: "fechaInicio requerida" }),
  responsable: z.string({ required_error: "Seleccione un responsable" }),
  observaciones: z
    .string()
    .min(10, {
      message: "observaciones must be at least 10 characters.",
    })
    .max(160, {
      message: "observaciones must not be longer than 30 characters.",
    }),
  archivos: z
    .any()
    .refine(validateFileListSize, {
      message: "Los archivos no deben pensar mas de 4 MB",
    })
    .optional(),
});
interface Props {
  programacionPatronId: string;
  closeModal: () => void;
}

export function FormEjecucionPatron({
  programacionPatronId,
  closeModal,
}: Props) {
  const router = useRouter();
  const { responsables } = obtenerResponsables();
  const { crear, error, errorMsg, isLoading } = crearEjecucionPatron();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await crear({
      ejecutorId: data.responsable,
      fechaEjecucion: data.fechaEjecucion.toISOString(),
      observaciones: data.observaciones,
      programacionPatronId: programacionPatronId,
      archivos: data.archivos,
    });
    toast({
      title: "Patron ejecutado corrrectamente",
      variant: "success",
    });
    closeModal();
    router.push("/dashboard/patrones/ejecucion");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fechaEjecucion"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha Ejecucion</FormLabel>
              <Popover modal={true}>
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
                        <span>Escoja una fecha</span>
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
                Ingrese la fecha de ejecucion de la programacion
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsable</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un responsable" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {responsables.map((res) => (
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
        <FormField
          control={form.control}
          name="observaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observaciones"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="archivos"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Archivos</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,application/pdf"
                  className="cursor-pointer"
                  onChange={(event) => {
                    onChange(event.target.files);
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormDescription>
                Seleccione uno o más archivos PDF
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Ejecutar
        </Button>
      </form>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
    </Form>
  );
}
