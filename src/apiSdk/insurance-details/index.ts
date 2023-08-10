import axios from 'axios';
import queryString from 'query-string';
import { InsuranceDetailInterface, InsuranceDetailGetQueryInterface } from 'interfaces/insurance-detail';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getInsuranceDetails = async (
  query?: InsuranceDetailGetQueryInterface,
): Promise<PaginatedInterface<InsuranceDetailInterface>> => {
  const response = await axios.get('/api/insurance-details', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createInsuranceDetail = async (insuranceDetail: InsuranceDetailInterface) => {
  const response = await axios.post('/api/insurance-details', insuranceDetail);
  return response.data;
};

export const updateInsuranceDetailById = async (id: string, insuranceDetail: InsuranceDetailInterface) => {
  const response = await axios.put(`/api/insurance-details/${id}`, insuranceDetail);
  return response.data;
};

export const getInsuranceDetailById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/insurance-details/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInsuranceDetailById = async (id: string) => {
  const response = await axios.delete(`/api/insurance-details/${id}`);
  return response.data;
};
