import fs from 'fs';
import path from 'path';

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

export interface Location {
  name: string;
  address: Address;
  phone: string;
  phoneRaw: string;
}

export interface CompanyContact {
  companyName: string;
  locations: {
    india: Location;
    romania: Location;
  };
}

const CONTACT_PATH = path.join(process.cwd(), 'content', 'company', 'contact.json');

/**
 * Get company contact information
 */
export function getCompanyContact(): CompanyContact {
  try {
    const fileContents = fs.readFileSync(CONTACT_PATH, 'utf8');
    return JSON.parse(fileContents) as CompanyContact;
  } catch (error) {
    console.error('Error reading company contact file:', error);
    // Return default fallback
    return {
      companyName: 'KnowMyCRM',
      locations: {
        india: {
          name: 'India',
          address: {
            line1: 'Urbtech NPX, P5/522',
            line2: 'Noida-Greater Noida Expy, Sector 153',
            city: 'Noida',
            state: 'Uttar Pradesh',
            postalCode: '201304',
            country: 'India',
          },
          phone: '+91 9315156055',
          phoneRaw: '+919315156055',
        },
        romania: {
          name: 'Romania',
          address: {
            line1: 'Strada BUZEŞTI, Nr. 75-77',
            line2: 'Camera 7, Etaj 9',
            city: 'Bucureşti Sectorul 1',
            state: '',
            postalCode: '',
            country: 'Romania',
          },
          phone: '+40 754 324 179',
          phoneRaw: '+40754324179',
        },
      },
    };
  }
}

/**
 * Format address as a single string
 */
export function formatAddress(address: Address): string {
  const parts = [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean);
  return parts.join(', ');
}

/**
 * Get phone numbers for trust line display
 */
export function getPhoneNumbers(): { india: string; romania: string } {
  const contact = getCompanyContact();
  return {
    india: contact.locations.india.phone,
    romania: contact.locations.romania.phone,
  };
}
