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
import {  obtenerUbicaciones } from '../../hooks/useUbicaciones'
import { useToast } from '@/components/ui/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { obtenerMarcas } from '../../hooks/useMarca'
import { crearPatron } from '../../hooks/usePatron'


const formSchema = z.object({
  codigo: z.string().min(2, { message: 'codigo requerido' }),
  descripcion: z.string().min(2, { message: 'descripcion requerido' }),
  modelo: z.string().min(2, { message: 'modelo requerido' }),
  serie: z.string().min(2, { message: 'serie requerido' }),
  marcaId: z.string().min(2, { message: 'marcaId requerido' }),
  ubicacionId: z.string().min(2, { message: 'ubicacionId requerido' }),
})
   
export default function CrearPatronesBasicos () {
  const {marcas} = obtenerMarcas()
  const {ubicaciones} = obtenerUbicaciones()
  const { crear, error, errorMsg, isLoading } = crearPatron()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      codigo:'',
      descripcion:'',
      modelo:'',
      serie:'',
      marcaId:'',
      ubicacionId:''
    }
  })

  console.log(form);

  const { toast } = useToast()

  async function onSubmit (values: z.infer<typeof formSchema>) {
    
    await crear({
      codigo: values.codigo,
      descripcion: values.descripcion,
      modelo: values.modelo,
      serie: values.serie,
      marcaId: values.marcaId,
      ubicacionId: values.ubicacionId,
    })
    form.reset()
    console.log(form.getValues());
    toast({
      title: 'Patron se guardo correctamente',
      variant: 'success'
    })
  }

  return (
    <>
      <h2 className='text-center mb-4 font-semibold'>Crear PatronW</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-2 grid-rows-1 gap-2'>
          <FormField
            control={form.control}
            name='codigo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Codigo</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingrese nombre de la Codigo'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='descripcion'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingrese nombre de la Descripcion'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='modelo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingrese nombre del Modelo'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='serie'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serie</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingrese nombre de la series'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='marcaId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <Select
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione un Descripcion' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {marcas.map(res => (
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
            name='ubicacionId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicacion</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione una Ubicacion' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ubicaciones.map(res => (
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
          <Button type='submit' disabled={isLoading} className='mx-auto'>
            <Loader2
              className={
                'mr-2 h-4 w-4 animate-spin ' + (!isLoading ? 'hidden' : '')
              }
            />
            Crear Patron
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
