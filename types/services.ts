export interface Service {
  name: string;
  _id: string;
}

export interface ServicesResponse {
  message: string;
  payload: Service[];
}
