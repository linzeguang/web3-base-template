import React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(cn('input px-4'), {
  variants: {
    size: {
      xs: 'input-xs',
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
      xl: 'input-xl'
    }
  },
  defaultVariants: {
    size: 'lg'
  }
})

export interface InputProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof inputVariants> {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  prefixNode?: React.ReactNode
  suffixNode?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ inputProps, prefixNode, suffixNode, size, className, ...rest }, ref) => (
    <label className={inputVariants({ className, size })} {...rest}>
      {prefixNode}
      <input ref={ref} {...inputProps} className={cn('grow', inputProps?.className)} />
      {suffixNode}
    </label>
  )
)
