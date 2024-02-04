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
import { obtenerResponsables } from '../../hooks/useResponsables'
import { crearUbicacion } from '../../hooks/useUbicaciones'
import { useToast } from '@/components/ui/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { CrearVariableDto } from '@/src/app/api/variables/dtos/crear'
import { useCrearVariable } from '../../hooks/useVariables'
import { obtenerMagnitudes } from '../../hooks/useMagnitud'

const formSchema = z.object({
  alias: z.string().min(2, { message: 'requerido' }),
  descripcion: z
    .string({ required_error: 'Seleccione un responsable' })
    .min(2, { message: 'requerido' }),
  magnitud_id: z
    .string({
      required_error: 'Please select an email to display.'
    })
})

export default function Ubicacion () {
  const { isError, responsables } = obtenerMagnitudes()
  const { crear, error, errorMsg, isLoading, } = useCrearVariable()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alias: '',
      descripcion:''
    }
  })

  const { toast } = useToast()

  async function onSubmit (values: z.infer<typeof formSchema>) {
    console.log(values);
    await crear({
      alias: values.alias,
      descripcion: values.descripcion,
      magnitud_id:values.magnitud_id
    })
    form.reset()
    toast({
      title: 'La variable se guardo correctamente',
      variant: 'success'
    })
  }

  return (
    <>
      <h2 className='text-center mb-4 font-semibold'>Crear Variables</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-2 grid-rows-1 gap-2'>
          <FormField
            control={form.control}
            name='descripcion'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingrese una descripcion'
                    {...field}
                  />
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
                <FormLabel>alias</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingrese un alias'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='magnitud_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Magnitud</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione una Magnitud' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {responsables.map(res => (
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

            </div>
          <Button type='submit' disabled={isLoading} className='mx-auto'>
            <Loader2
              className={
                'mr-2 h-4 w-4 animate-spin ' + (!isLoading ? 'hidden' : '')
              }
            />
            Crear Variable
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
