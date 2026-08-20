import personal from "./personal.json";

export interface PersonalDomain {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface PersonalValue {
  title: string;
  description: string;
}

export interface PersonalData {
  headline: string;
  bio: string[];
  mission: string;
  vision: string;
  values: PersonalValue[];
  availableFor: string[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
    twitter: string;
    location: string;
  };
  cvPath: string;
  domains: PersonalDomain[];
}

export const personalData = personal as PersonalData;
