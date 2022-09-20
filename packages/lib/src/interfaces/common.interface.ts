export enum Protocol {
  HTTP = 'http',
  HTTPS = 'https',
}

export enum Environment {
  development = 'development',
  production = 'production',
  test = 'test',
  stage = 'stage'
}

export interface IVerify { error?: Error, value?: any }