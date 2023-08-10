import { PatientInterface } from 'interfaces/patient';
import { GetQueryInterface } from 'interfaces';

export interface InsuranceDetailInterface {
  id?: string;
  insurance_provider: string;
  policy_number: string;
  patient_id?: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  _count?: {};
}

export interface InsuranceDetailGetQueryInterface extends GetQueryInterface {
  id?: string;
  insurance_provider?: string;
  policy_number?: string;
  patient_id?: string;
}
