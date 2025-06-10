import React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(cn('toggle border-none'), {
  variants: {
    variant: {
      primary: 'bg-white/80 checked:bg-primary'
    },
    size: {
      xs: 'toggle-xs',
      sm: 'toggle-sm',
      md: 'toggle-md',
      lg: 'toggle-lg',
      xl: 'toggle-xl'
    },
    outline: {
      true: 'btn-outline'
    },
    ghost: {
      true: 'btn-ghost'
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary'
  }
})

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof toggleVariants> {}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(({ className, size, variant, ...rest }, ref) => (
  <input ref={ref} type="checkbox" className={toggleVariants({ className, size, variant })} {...rest} />
))
