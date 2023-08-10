const mapping: Record<string, string> = {
  'insurance-details': 'insurance_detail',
  'laboratory-results': 'laboratory_result',
  'medical-records': 'medical_record',
  organizations: 'organization',
  patients: 'patient',
  prescriptions: 'prescription',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
