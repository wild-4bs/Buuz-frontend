export enum Services {
  VIDEO_PRODUCTION = "video-production",
  TVC_COMMERCIAL = "tvc-commercial",
  CREATIVE_CONCEPTS = "creative-concepts",
  MARKETING_CAMPAIGNS = "marketing-campaigns",
}

export interface Client {
  name: string;
  email: string;
  phone_number: string;
  services: Services[];
  createdAt: Date;
  updatedAt: Date;
  message: string;
  _id: string;
}

export interface GetClientsRes {
  message: string;
  payload: Client[];
}

export interface deleteClientRes {
  message: string;
}
