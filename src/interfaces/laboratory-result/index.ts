import { PatientInterface } from 'interfaces/patient';
import { GetQueryInterface } from 'interfaces';

export interface LaboratoryResultInterface {
  id?: string;
  result: string;
  patient_id?: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  _count?: {};
}

export interface LaboratoryResultGetQueryInterface extends GetQueryInterface {
  id?: string;
  result?: string;
  patient_id?: string;
}
