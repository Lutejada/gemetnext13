'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import axios from 'axios'



const formSchema = z.object({
  nombre: z.string().min(2, { message: 'requerido' }),
  alias: z.string().min(2, { message: 'requerido' })
})

export default function Ubicacion () {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      alias: ''
    }
  })

  // 2. Define a submit handler.
  async function onSubmit (values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const res = await axios.post('/api/responsables/crear',{
      nombre:values.nombre,
      alias:values.alias
    })
    console.log(res.data);
    //LLAMAR EL ENDPOIN DE CREAR RESPONSABLE
  }

  return (
    <>
      <h2 className='text-center mb-4 font-semibold'>Crear Responsables</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='nombre'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input placeholder='Ingrese su nombre' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='alias'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alias</FormLabel>
                <FormControl>
                  <Input placeholder='Ingrese sus iniciales' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Crear</Button>
        </form>
      </Form>
    </>
  )
}
