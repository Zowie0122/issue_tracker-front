const PW_REGEX = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}/;
const EM_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const VALIDATIONS = {
  required: { required: 'This field is required' },
  password: {
    pattern: {
      value: PW_REGEX,
      message: 'Must be minimum eight characters, at least one letter, one number and one special character.',
    },
  },
  email: {
    pattern: {
      value: EM_REGEX,
      message: 'Must be a valid email format.',
    },
  },
};

type Rule = 'required' | 'password' | 'email';

type Validation = {
  required?: string;
  pattern?: {
    value: string;
    message: string;
  };
};

export const getValidations = (rules: Rule[]): Validation => {
  let result = {};

  rules.forEach((rule) => {
    result = { ...result, ...VALIDATIONS[rule] };
  });

  return result;
};
