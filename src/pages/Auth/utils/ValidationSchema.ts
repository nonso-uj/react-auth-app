import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be 50 characters or less'),
  
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be 50 characters or less'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W]{8,}$/,
        'Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character'
    )
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
});

export const passwordResetSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W]{8,}$/,
        'Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character'
      ),
  
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const taskSchema = yup.object().shape({
    name: yup
      .string()
      .required('Task is required')
});