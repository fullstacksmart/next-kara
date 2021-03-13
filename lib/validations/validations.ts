import * as Yup from 'yup';

// Min 8 characters. At least 1 capital, 1 number, 1 special char.

const strongCombination = /^(?=.*?[0-9])(?=.*?[A-Z]).{8,}$/;

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Mandatory field')
    .matches(strongCombination, 'Please enter a stronger password'),
});

export default passwordSchema;
