import { CRMProfile, ERPProfile } from '@/types';
import crmData from '@/data/crm.json';
import erpData from '@/data/erp.json';

export function getAllCRMs(): CRMProfile[] {
  return crmData as CRMProfile[];
}

export function getCRMBySlug(slug: string): CRMProfile | undefined {
  return crmData.find((crm: any) => crm.slug === slug) as CRMProfile | undefined;
}

export function getAllERPs(): ERPProfile[] {
  return erpData as ERPProfile[];
}

export function getERPBySlug(slug: string): ERPProfile | undefined {
  return erpData.find((erp: any) => erp.slug === slug) as ERPProfile | undefined;
}