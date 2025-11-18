export interface Value {
  title: string;
  description: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ValuesResponse {
  message: string;
  payload: Value[];
}

export interface DeleteValueRes {
  message: string;
}

export interface CreateValueRes {
  message: string;
}
