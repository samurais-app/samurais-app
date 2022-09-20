import { FieldHelperProps, FieldInputProps, FieldMetaProps, FormikErrors, FormikState, FormikTouched, FormikValues } from 'formik';

export type Values = FormikValues;

export type FormData<V = FormikValues> = {
  initialValues: V;
  initialErrors: FormikErrors<unknown>;
  initialTouched: FormikTouched<unknown>;
  initialStatus: any;
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
  handleReset: (e: any) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  resetForm: (nextState?: Partial<FormikState<V>> | undefined) => void;
  setErrors: (errors: FormikErrors<V>) => void;
  setFormikState: (stateOrCb: FormikState<V> | ((state: FormikState<V>) => FormikState<V>)) => void;
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean | undefined) => Promise<FormikErrors<V>> | Promise<void>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<V>> | Promise<void>;
  setFieldError: (field: string, value: string | undefined) => void;
  setStatus: (status: any) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setTouched: (touched: FormikTouched<V>, shouldValidate?: boolean | undefined) => Promise<FormikErrors<V>> | Promise<void>;
  setValues: (values: React.SetStateAction<V>, shouldValidate?: boolean | undefined) => Promise<FormikErrors<V>> | Promise<void>;
  submitForm: () => Promise<any>;
  validateForm: (values?: V) => Promise<FormikErrors<V>>;
  validateField: (name: string) => Promise<void> | Promise<string | undefined>;
  isValid: boolean;
  dirty: boolean;
  unregisterField: (name: string) => void;
  registerField: (name: string, { validate }: any) => void;
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  getFieldMeta: (name: string) => FieldMetaProps<any>;
  getFieldHelpers: (name: string) => FieldHelperProps<any>;
  validateOnBlur: boolean;
  validateOnChange: boolean;
  validateOnMount: boolean;
  values: V;
  errors: FormikErrors<V>;
  touched: FormikTouched<V>;
  isSubmitting: boolean;
  isValidating: boolean;
  status?: any;
  submitCount: number;
};