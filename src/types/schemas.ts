import * as yup from 'yup'

export const registerSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  lastname: yup.string().required('El apellido es obligatorio'),
  email: yup.string().email('Formato de email inválido').required('El email es obligatorio'),
  password: yup
    .string()
    .min(6, 'Debe tener al menos 6 caracteres')
    .max(20, 'Máximo 20 caracteres')
    .required('Contraseña obligatoria')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
      'Debe contener al menos una mayúscula, un número y un carácter especial',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Campo obligatorio'),
  phone: yup
    .string()
    .matches(/^[6-9]\d{8}$/, 'Introduce un teléfono válido (ej: 600000000)')
    .required('Teléfono obligatorio'),
  address: yup.string().required('Dirección obligatoria'),
  postalCode: yup
    .string()
    .matches(/^\d{5}$/, 'Debe ser un código postal válido (5 dígitos)')
    .required('Código postal obligatorio'),
})

export const loginSchema = yup.object({
  email: yup.string().email('Formato de email inválido').required('El email es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
})

export const appointmentCreateSchema = yup.object({
  date: yup
    .string()
    .matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}$/, 'Fecha inválida (YYYY-MM-DD HH:mm)')
    .required('La fecha es obligatoria'),
  service_ids: yup.array().of(yup.number()).min(1, 'Selecciona al menos un servicio'),
  notes: yup.string().optional(),
})
