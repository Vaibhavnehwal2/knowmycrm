import { CRMProfile, ERPProfile, Industry, Service } from '@/types';
import crmData from '@/data/crm.json';
import erpData from '@/data/erp.json';
import industriesData from '@/data/industries.json';
import servicesData from '@/data/services.json';

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

export function getAllIndustries(): Industry[] {
  return industriesData as Industry[];
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industriesData.find((ind: any) => ind.slug === slug) as Industry | undefined;
}

export function getIndustriesByCategory(category: string): Industry[] {
  return industriesData.filter((ind: any) => ind.category === category) as Industry[];
}

export function getUniqueCategories(): string[] {
  const categories = industriesData.map((ind: any) => ind.category);
  return Array.from(new Set(categories)).sort();
}

export function getAllServices(): Service[] {
  return servicesData as Service[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find((svc: any) => svc.slug === slug) as Service | undefined;
}