import * as yup from 'yup';

export const laboratoryResultValidationSchema = yup.object().shape({
  result: yup.string().required(),
  patient_id: yup.string().nullable(),
});
