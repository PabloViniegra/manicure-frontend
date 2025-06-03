import { helpers } from '@vuelidate/validators'

export const phoneValidator = helpers.regex(/^([6-7]\d{8})$/)
export const postalValidator = helpers.regex(/^\d{5}$/)
