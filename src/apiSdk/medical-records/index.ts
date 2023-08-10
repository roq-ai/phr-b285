import axios from 'axios';
import queryString from 'query-string';
import { MedicalRecordInterface, MedicalRecordGetQueryInterface } from 'interfaces/medical-record';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMedicalRecords = async (
  query?: MedicalRecordGetQueryInterface,
): Promise<PaginatedInterface<MedicalRecordInterface>> => {
  const response = await axios.get('/api/medical-records', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createMedicalRecord = async (medicalRecord: MedicalRecordInterface) => {
  const response = await axios.post('/api/medical-records', medicalRecord);
  return response.data;
};

export const updateMedicalRecordById = async (id: string, medicalRecord: MedicalRecordInterface) => {
  const response = await axios.put(`/api/medical-records/${id}`, medicalRecord);
  return response.data;
};

export const getMedicalRecordById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/medical-records/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMedicalRecordById = async (id: string) => {
  const response = await axios.delete(`/api/medical-records/${id}`);
  return response.data;
};
