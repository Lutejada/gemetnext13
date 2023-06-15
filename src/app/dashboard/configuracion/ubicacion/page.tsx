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
import { useResponsables } from '../../hooks/useResponsables'

const formSchema = z.object({
  nombre: z.string().min(2, { message: 'requerido' }),
  responsables: z.string().min(2, { message: 'requerido' })
})

export default function Ubicacion () {
  const { obtenerResponsables } = useResponsables()
  const responsables = obtenerResponsables()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      responsables: ''
    }
  })

  // 2. Define a submit handler.
  async function onSubmit (values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <h2 className='text-center mb-4 font-semibold'>Crear Ubicaciones</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='nombre'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingrese nombre de la ubicacion'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='responsables'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {responsables.responsables?.map((res) => (
                      <>
                        <SelectItem value={res.id} key={res.id} >
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

          <Button type='submit'>Crear</Button>
        </form>
      </Form>
    </>
  )
}
