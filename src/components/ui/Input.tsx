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

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  prefixNode?: React.ReactNode
  suffixNode?: React.ReactNode
  wrapperClassName?: React.LabelHTMLAttributes<HTMLLabelElement>['className']
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ prefixNode, suffixNode, size, wrapperClassName, ...rest }, ref) => (
    <label className={inputVariants({ className: wrapperClassName, size })}>
      {prefixNode}
      <input {...rest} ref={ref} className={cn('grow', rest?.className)} />
      {suffixNode}
    </label>
  )
)
