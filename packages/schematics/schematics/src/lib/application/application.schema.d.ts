export interface ApplicationOptions {
  name: string | number;
  author?: string;
  description?: string;
  directory?: string;
  strict?: boolean;
  version?: string;
  type?: 'react' | 'vue';
  dependencies?: string;
  devDependencies?: string;
}
