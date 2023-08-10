import * as yup from 'yup';

export const insuranceDetailValidationSchema = yup.object().shape({
  insurance_provider: yup.string().required(),
  policy_number: yup.string().required(),
  patient_id: yup.string().nullable(),
});
