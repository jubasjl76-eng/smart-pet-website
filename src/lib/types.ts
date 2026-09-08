/**
 * Public projection of the breeder platform. Mirrors the `/api/public/*`
 * responses documented in `docs/public-api.md`. Only published rows ever
 * reach these shapes — nothing here is buyer PII or internal medical data.
 */

export type Breed = "Golden Retriever" | "Labrador Retriever" | (string & {});
export type Sex = "male" | "female";

export interface Social {
  label: string;
  url: string;
}

export interface Kennel {
  name: string;
  tagline: string;
  about: string;
  breeds: Breed[];
  location: string; // city / region only — never a street address
  email: string;
  phone?: string;
  socials?: Social[];
}

export interface HealthTest {
  name: string;
  result: string;
}

export interface Dog {
  id: string;
  name: string;
  sex: Sex;
  breed: Breed;
  role: "sire" | "dam";
  color?: string;
  dob?: string; // ISO date
  titles?: string; // registrations / titles, free text
  bio?: string;
  healthTests?: HealthTest[];
  photos: string[];
}

export type LitterStatus =
  | "planned"
  | "expecting"
  | "born"
  | "available"
  | "reserved"
  | "sold_out";

export type PuppyStatus = "available" | "reserved" | "sold";

export interface WeightPoint {
  date: string; // ISO date
  grams: number;
}

export interface Puppy {
  id: string;
  name: string;
  sex: Sex;
  status: PuppyStatus;
  color?: string;
  photos: string[];
  weightSeries?: WeightPoint[];
}

export interface LitterRef {
  id: string;
  name: string;
}

export interface Litter {
  id: string;
  name: string;
  breed: Breed;
  status: LitterStatus;
  sire?: LitterRef;
  dam?: LitterRef;
  bornOn?: string;
  expectedOn?: string;
  description?: string;
  photos: string[];
  puppyCount: number;
  availableCount: number;
  puppies: Puppy[];
}

/** Body for `POST /api/inquiries` (the site's own route, which proxies the backend). */
export interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  /** set when reserving a specific puppy */
  puppyId?: string;
  /** set when the interest is a litter rather than one puppy */
  litterId?: string;
}
