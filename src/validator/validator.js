import * as yup from 'yup';
import { setLocale } from 'yup';

const validator = (i18, content) => {
  setLocale({
    mixed: {
      default: 'field_invalid',
    },
    string: {
      url: i18.t('validation.errors.errorValid'),
      min: i18.t('validation.errors.errorUrlExist'),
    },
  });
  const shema = yup.string().url().min(1);
  return shema.validate(content);
};

export default validator;
