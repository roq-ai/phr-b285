import { InsuranceDetailInterface } from 'interfaces/insurance-detail';
import { LaboratoryResultInterface } from 'interfaces/laboratory-result';
import { MedicalRecordInterface } from 'interfaces/medical-record';
import { PrescriptionInterface } from 'interfaces/prescription';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PatientInterface {
  id?: string;
  first_name: string;
  last_name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  insurance_detail?: InsuranceDetailInterface[];
  laboratory_result?: LaboratoryResultInterface[];
  medical_record?: MedicalRecordInterface[];
  prescription?: PrescriptionInterface[];
  user?: UserInterface;
  _count?: {
    insurance_detail?: number;
    laboratory_result?: number;
    medical_record?: number;
    prescription?: number;
  };
}

export interface PatientGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  user_id?: string;
}
