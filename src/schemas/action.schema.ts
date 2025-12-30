
import { z } from 'zod';


export const createActionSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  description: z
    .string()
    .min(1, 'La descripción es obligatoria')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(100, 'La descripción no puede exceder 100 caracteres'),
  
  color: z
    .string()
    .min(1, 'El color es obligatorio')
    .regex(/^#[0-9A-Fa-f]{6}$/, 'El color debe ser un código hexadecimal válido (ej: #00A896)'),
  
  status: z
    .number()
    .int('El estado debe ser un número entero')
    .min(0, 'El estado debe ser 0 o 1')
    .max(1, 'El estado debe ser 0 o 1'),
  
  icon: z
    .instanceof(File, { message: 'Debes seleccionar un archivo' })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'El archivo no debe superar 5MB',
    })
    .refine(
      (file) => {
        const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg'];
        return validTypes.includes(file.type);
      },
      {
        message: 'El archivo debe ser SVG, PNG o JPG',
      }
    ),
});


export type CreateActionFormData = z.infer<typeof createActionSchema>;