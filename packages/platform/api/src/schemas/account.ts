import * as yup from 'yup';

export const AccountSchema = yup.object({
    account: yup.string().required(),
    password: yup.string().required(),
    code: yup.string()
});