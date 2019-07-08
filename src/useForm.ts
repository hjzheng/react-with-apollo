import React, { useState } from "react";
import _set from "lodash.set";

// https://jaredpalmer.com/formik/docs/overview
// https://github.com/wsmd/react-use-form-state
// https://github.com/kitze/react-hanger

export type InitialValues = {
  [propName: string]: any;
};

export type Errors = {
  [propName: string]: any;
};

export type Touched = {
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
  submit: (values: InitialValues, errors: Errors, touched: Touched) => void
): FormResult {
  let [form, setForm] = useState(initialValues);
  let [touched, setTouched] = useState({} as Touched);
  let [errors, setErrors] = useState({} as Errors);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;

    let isMultiValue = Array.isArray(form[name]);

    let val: any, newForm: any;

    if (!isMultiValue) {
      // 单值
      val = /number|range/.test(type)
        ? parseFloat(value)
        : /checkbox/.test(type)
        ? checked
        : /radio/.test(type)
        ? value
        : value;

      newForm = _set(form, name, val);
    } else {
      // 多值 checkbox or multi-selector
      val = new Set(form[name]);
      checked ? val.add(value) : val.delete(value);
      newForm = _set(form, name, Array.from(val));
    }

    setForm({
      ...newForm
    });
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setErrors({
      ...errors,
      ...validate(form)
    });

    setTouched({
      ...touched,
      [name]: true
    });

    return errors;
  };

  const onReset = () => {
    setForm(initialValues);
  };

  // TODO
  const onSubmit = () => {
    submit(form, errors, touched);
  };

  return [form, onChange, onBlur, onReset, onSubmit, errors];
}
