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
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { crearResponsable } from '../../hooks/useResponsables'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle ,Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  nombre: z.string().min(2, { message: 'requerido' }),
  alias: z.string().min(2, { message: 'requerido' })
})

export default function Responsable () {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      alias: ''
    }
  })

  const { toast } = useToast()

  const { trigger, isLoading, error, responsable, errorMsg } =
    crearResponsable()

  async function onSubmit (values: z.infer<typeof formSchema>) {
    await trigger({
      nombre: values.nombre,
      alias: values.alias
    })

    form.reset()
    toast({
      title: 'Responsable se guardo correctamente',
      variant: 'success'
    })
  }

  console.log(isLoading)

  return (
    <>
      <h2 className='text-center mb-4 font-semibold'>Crear Responsables</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-2 grid-rows-1 gap-2'>
            <FormField
              control={form.control}
              name='nombre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
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
          </div>
          <Button type='submit' disabled={isLoading} className='mx-auto'>
            <Loader2
              className={'mr-2 h-4 w-4 animate-spin ' + (!isLoading ? 'hidden' : '')}
            />
            Crear Responsable
          </Button>

          {error && (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </>
  )
}
