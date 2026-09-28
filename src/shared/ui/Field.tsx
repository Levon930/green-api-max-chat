import type { InputHTMLAttributes } from 'react'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Field = ({ label, ...inputProps }: FieldProps) => {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input className="field__input" {...inputProps} />
    </label>
  )
}
