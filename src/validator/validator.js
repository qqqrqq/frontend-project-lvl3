import * as yup from 'yup';

const validator = (content) => {
  const shema = yup.string().url().min(1);
  return shema.validate(content);
};

export default validator;
