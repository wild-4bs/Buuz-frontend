import { Project } from "@/services/vimeo";

export interface Portfolio {
  _id: string;
  name: string;
  description: string;
  image: string;
  logo: string;
  projects: Project[];
  projects_count: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PortfoliosGetByFieldsResponse {
  message: string;
  payload: Portfolio[];
}

export interface GetPortfolios {
  message: string;
  payload: Portfolio[];
}
export interface GetPortfolio {
  message: string;
  payload: Portfolio;
}

export interface DeletePortfolio {
  message: string;
}

export interface UpdatePortfolio {
  message: string;
  payload: Portfolio;
}

export interface CreatePortfolio {
  message: string;
  payload: Portfolio;
}
