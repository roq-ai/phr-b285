import axios from 'axios';
import queryString from 'query-string';
import { LaboratoryResultInterface, LaboratoryResultGetQueryInterface } from 'interfaces/laboratory-result';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getLaboratoryResults = async (
  query?: LaboratoryResultGetQueryInterface,
): Promise<PaginatedInterface<LaboratoryResultInterface>> => {
  const response = await axios.get('/api/laboratory-results', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createLaboratoryResult = async (laboratoryResult: LaboratoryResultInterface) => {
  const response = await axios.post('/api/laboratory-results', laboratoryResult);
  return response.data;
};

export const updateLaboratoryResultById = async (id: string, laboratoryResult: LaboratoryResultInterface) => {
  const response = await axios.put(`/api/laboratory-results/${id}`, laboratoryResult);
  return response.data;
};

export const getLaboratoryResultById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/laboratory-results/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLaboratoryResultById = async (id: string) => {
  const response = await axios.delete(`/api/laboratory-results/${id}`);
  return response.data;
};
