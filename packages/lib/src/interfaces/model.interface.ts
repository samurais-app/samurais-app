export interface IApplication {
  name: string;
  version: string;
}

export interface IProject {
  name: string;
}

export interface IAccount {
  account: string,
  password: string,
  code?: string
}

export interface IPayload<T = any> {
  code: number;
  message: string;
  data?: T
}