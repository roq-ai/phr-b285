import { PatientInterface } from 'interfaces/patient';
import { GetQueryInterface } from 'interfaces';

export interface MedicalRecordInterface {
  id?: string;
  record: string;
  patient_id?: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  _count?: {};
}

export interface MedicalRecordGetQueryInterface extends GetQueryInterface {
  id?: string;
  record?: string;
  patient_id?: string;
}
