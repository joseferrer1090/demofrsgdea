import React from 'react';
import classNames from 'classnames';
import { ReactstrapRadio } from 'reactstrap-formik';

export const RadioButtonSi = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <span>
      <label htmlFor={id}>{label}</label>
      &nbsp;
      <input
        name={name}
        id={id}
        component={ReactstrapRadio}
        type="radio"
        value={id}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames('radio-button')}
        {...props}
      />
    </span>
  );
};

export const RadioButtonNo = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <span className="offset-6">
      <label htmlFor={id}>{label}</label>
      &nbsp;
      <input
        name={name}
        id={id}
        component={ReactstrapRadio}
        type="radio"
        value={id}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames('radio-button')}
        {...props}
      />
    </span>
  );
};
