import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const props = register(name, { required: required })

  return (
    <Width width={width}>
      <div>
        <input
          type="checkbox"
          defaultChecked={defaultValue}
          id={name}
          {...props}
        />
        <label htmlFor={name}>
          {required && (
            <span className="required">
              *{" "}<span className="sr-only">(required)</span>
            </span>
          )}
          {label}
        </label>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
