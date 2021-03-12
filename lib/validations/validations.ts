import * as Yup from 'yup';

// Min 8 characters. At least 1 capital, 1 number, 1 special char.

const strongCombination = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/;

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Mandatory field')
    .matches(strongCombination, 'Please enter a valid password'),
});

export default passwordSchema;
