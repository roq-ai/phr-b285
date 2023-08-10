import * as yup from 'yup';

export const medicalRecordValidationSchema = yup.object().shape({
  record: yup.string().required(),
  patient_id: yup.string().nullable(),
});
