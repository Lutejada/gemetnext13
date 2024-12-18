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
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FieldConfig {
  name: string;
  label: string;
  placeholder: string;
  validation: z.ZodType<any>;
  options?: { value: string; label: string }[]; // Opciones para select
  isSelect?: boolean; // Indica si es un campo select
}

interface GenericFormProps<T> {
  entityName: string;
  toasMessage: string;
  fields: FieldConfig[];
  onSubmit: (data: T) => Promise<void>;
  initialValues?: Partial<T>;
  isEditing?: boolean;
  closeModal?: () => void;
}

export function ConfigurationForm<T>({
  fields,
  onSubmit,
  initialValues,
  isEditing = false,
  closeModal,
  toasMessage,
  entityName,
}: GenericFormProps<T>) {
  const formSchema = z.object(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation;
      return acc;
    }, {} as Record<string, z.ZodType<any>>)
  );

  const labelButton = isEditing
    ? `Editar ${entityName}`
    : `Guardar ${entityName}`;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const { toast } = useToast();

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await onSubmit(values as T);
    if (closeModal) {
      setIsLoading(false);
      closeModal();
    }
    form.reset();
    toast({
      title: toasMessage,
      variant: "success",
    });
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.isSelect ? (
                      <Select {...formField}>
                        <SelectTrigger>
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input placeholder={field.placeholder} {...formField} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="block mt-5 mx-auto"
        >
          <Loader2
            className={
              "mr-2 h-4 w-4 animate-spin " + (isLoading ? "" : "hidden")
            }
          />
          {labelButton}
        </Button>
      </form>
    </Form>
  );
}
