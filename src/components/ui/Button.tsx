import React, { forwardRef } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(cn('btn'), {
  variants: {
    variant: {},
    size: {
      xs: 'btn-xs p-1.5 font-normal',
      sm: '',
      md: '',
      lg: '',
      xl: ''
    },
    outline: {
      true: 'btn-outline'
    },
    ghost: {
      true: 'btn-ghost'
    }
  },
  defaultVariants: {
    size: 'lg'
  }
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, size, outline, ghost, ...rest }, ref) => (
  <button ref={ref} className={buttonVariants({ className, size, outline, ghost })} {...rest} />
))

export default Button
