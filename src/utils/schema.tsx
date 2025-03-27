'use client';
import * as yup from 'yup';

export const newUserSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup
        .string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    dob: yup.string().required('Date of Birth is required'),
    image: yup.mixed().required('Image is Required'),
    age: yup.string().required('Age is required'),
});
