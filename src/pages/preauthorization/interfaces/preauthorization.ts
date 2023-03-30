// availables project roles

//this is used to command the entity (schemma) that only accept this values in the collection

export const role_project = {
  ADM: 'Account Delivery Manager',
  DO: 'Delivery Owner',
  DM: 'Delivery Manager',
  AO: 'Account Owner',
  TL: 'Technical Lead',
} as const;

//used to type the status at typescript level

export type RoleProject = (typeof role_project)[keyof typeof role_project];

export interface PreauthorizationRow {
  id: number;
  email: string;
  position: string;
  name: string;
}
