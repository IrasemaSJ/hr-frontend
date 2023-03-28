// availables project roles

//this is used to command the entity (schemma) that only accept this values in the collection

export const project_role = {
  ADM: 'Account Delivery Manager',
  DO: 'Delivery Owner',
  DM: 'Delivery Manager',
  AO: 'Account Owner',
  TL: 'Technical Lead',
} as const;

//used to type the status at typescript level

export type ProjectRole = (typeof project_role)[keyof typeof project_role];

export interface PreauthorizationRow {
  id: number;
  email: string;
  position: string;
  name: string;
}
