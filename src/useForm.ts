import React, { useState } from "react";
import _set from "lodash.set";

// https://jaredpalmer.com/formik/docs/overview

export type InitialValues = {
  [propName: string]: any;
};

export type Errors = {
  [propName: string]: any;
};

export type Dirties = {
  [propName: string]: boolean;
};

export type FormResult = [
  any,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
  () => void,
  Errors
];

export default function useForm(
  initialValues: InitialValues,
  validate: (values: InitialValues) => Errors,
  submit: (values: InitialValues) => void
): FormResult {
  let [form, setForm] = useState(initialValues);
  let [dirties, setDirties] = useState({} as Dirties);
  let [errors, setErrors] = useState({} as Errors);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;

    const val = /number|range/.test(type)
      ? parseFloat(value)
      : /checkbox/.test(type)
      ? checked
      : /radio/.test(type)
      ? value
      : value;

    let newForm = _set(form, name, val);

    setForm({
      ...newForm
    });
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;
    const val = /number|range/.test(type)
      ? parseFloat(value)
      : /checkbox/.test(type)
      ? checked
      : /radio/.test(type)
      ? value
      : value;

    if (dirties[name]) {
      setErrors({
        ...errors,
        ...validate({ [name]: val })
      });
    }

    setDirties({
      ...dirties,
      [name]: true
    });

    return errors;
  };

  const onReset = () => {
    setForm(initialValues);
  };

  // TODO
  const onSubmit = () => {
    submit(form);
  };

  return [form, onChange, onBlur, onReset, onSubmit, errors];
}
