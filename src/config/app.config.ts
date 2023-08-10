interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['System Administrator'],
  customerRoles: [],
  tenantRoles: [
    'System Administrator',
    'Healthcare Provider',
    'Insurance Agent',
    'Lab Technician',
    'Patient',
    'Physician',
  ],
  tenantName: 'Organization',
  applicationName: 'PHR',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
