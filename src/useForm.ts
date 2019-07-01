import React, { useState } from "react";

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

export default function useForm(
  initialValues: InitialValues,
  validate: (values: InitialValues) => Errors,
  submit: (values: InitialValues) => void
): [
  object,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.ChangeEvent<HTMLInputElement>) => Errors,
  () => void,
  () => void,
  Errors
] {
  let [form, setForm] = useState(initialValues);
  let [dirties, setDirties] = useState({} as Dirties);
  let [errors, setErrors] = useState({} as Errors);

  // TODO 缺乏对数组的判断
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;

    const val = /number|range/.test(type)
      ? parseFloat(value)
      : /checkbox/.test(type)
      ? checked
      : /radio/.test(type) // is this needed?
      ? value
      : value;

    setForm({
      ...form,
      [name]: val
    });
  };

  // TODO validate
  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;
    const val = /number|range/.test(type)
      ? parseFloat(value)
      : /checkbox/.test(type)
      ? checked
      : /radio/.test(type) // is this needed?
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
