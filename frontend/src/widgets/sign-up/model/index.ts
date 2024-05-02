import { sample, createEffect, restore } from 'effector';
import { useUnit } from 'effector-react';
import { createForm, Rule, useForm } from 'effector-forms';

type SignupForm = {
  username: string;
  password: string;
  repeatedPassword: string;
};

const rules = {
  required: (): Rule<string> => ({
    name: 'required',
    validator: (value) => ({
      isValid: Boolean(value),
      errorText: 'Required field',
    }),
  }),
  minLength: (min: number): Rule<string> => ({
    name: 'minLength',
    validator: (value) => ({
      isValid: value.length >= min,
      errorText: `It's too short. Need to be longer than ${min}`,
    }),
  }),
  maxLength: (max: number): Rule<string> => ({
    name: 'maxLength',
    validator: (value) => ({
      isValid: value.length <= max,
      errorText: `It's too long. Need to be shorter than ${max}`,
    }),
  }),
  equalPasswords: (): Rule<string> => ({
    name: 'equalPasswords',
    validator: (value, { password }) => ({
      isValid: value === password,
      errorText: 'Passwords are not equals',
    }),
  }),
};

const signupFx = createEffect<SignupForm, unknown, Error>({
  name: 'signupFx',
  // async handler({ username, password, repeatedPassword }) {},
});
const $signupError = restore(signupFx.failData, null);

const signupForm = createForm({
  fields: {
    username: {
      init: '',
      rules: [rules.required(), rules.minLength(5), rules.maxLength(20)],
      validateOn: ['change'],
    },
    password: {
      init: '',
      rules: [rules.required(), rules.minLength(6)],
      validateOn: ['change'],
    },
    repeatedPassword: {
      init: '',
      rules: [rules.required(), rules.minLength(6), rules.equalPasswords()],
      validateOn: ['change'],
    },
  },
  validateOn: ['submit'],
});

$signupError.watch((res) => console.log('$signupError', res));

$signupError.reset(signupForm.$values.updates);

sample({
  clock: signupForm.formValidated,
  target: signupFx,
});

function useSignUp() {
  const pending = useUnit(signupFx.pending);
  const { submit, fields, eachValid, hasError, errorText } = useForm(signupForm);

  const isDirty = Object.values(fields).filter((field) => field.isDirty).length === 3;
  const isFormValid = isDirty && eachValid;

  return { pending, submit, fields, isFormValid, hasError, errorText };
}

export { useSignUp };
