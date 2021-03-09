import * as Yup from 'yup';

const strongCombination = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/;

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Mandatory field')
    .matches(strongCombination, 'Please enter a valid password'),
});

export default passwordSchema;
