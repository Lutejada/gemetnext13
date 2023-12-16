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
import { ObtenerEquiposDtoOutput } from "@/app/api/equipos/dtos/obtenerEquipos.dto.output";
import { ObtenerDatosDto } from "@/app/dashboard/types";

const formSchema = z.object({
  termino: z.string().min(3, { message: "requerido" }),
  valor: z
    .string({ required_error: "requerido" })
    .min(3, { message: "requerido" }),
});

interface Props {
  buscarPorTermino: (
    args?: ObtenerDatosDto | undefined
  ) => Promise<ObtenerEquiposDtoOutput | undefined>;
}

export default function SearchForm({ buscarPorTermino }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      termino: "",
      valor: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    await buscarPorTermino({ termino: values.termino, valor: values.valor });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 grid-rows-1 gap-2 mb-2"
        >
          <FormField
            control={form.control}
            name="termino"
            render={({ field }) => (
              <FormItem className="col-span-1/2">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Buscar por" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="codigo">codigo</SelectItem>
                    <SelectItem value="marca">Marca</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormControl>
                  <Input placeholder="Ingrese el valor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="col-span-1">
            Buscar
          </Button>
        </form>
      </Form>
    </>
  );
}
