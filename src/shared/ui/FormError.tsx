import type { ReactNode } from 'react'

interface FormErrorProps {
  children: ReactNode
}

export const FormError = ({ children }: FormErrorProps) => {
  return (
    <p className="form-error" role="alert">
      {children}
    </p>
  )
}
