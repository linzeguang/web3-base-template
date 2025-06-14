import React, { forwardRef } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { Grid } from '@/components/ui/Box'
import { cn } from '@/lib/utils'

const buttonVariants = cva(cn('btn'), {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      neutral: 'btn-neutral'
    },
    size: {
      xs: 'btn-xs p-1.5 font-normal',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
      xl: 'btn-xl'
    },
    outline: {
      true: 'btn-outline'
    },
    ghost: {
      true: 'btn-ghost'
    }
  },
  defaultVariants: {
    size: 'lg',
    variant: 'neutral'
  }
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, outline, ghost, variant, ...rest }, ref) => (
    <button ref={ref} className={buttonVariants({ className, size, outline, ghost, variant })} {...rest} />
  )
)

interface BaseOption {
  label: React.ReactNode
  value: number | string
}
export interface ButtonRadioProps<D extends BaseOption = BaseOption> extends React.HTMLAttributes<HTMLDivElement> {
  options: D[]
  value?: D['value']
  optionProps?: ButtonProps
  onValueChange?: (value: D['value'], option: D) => void
}

export const ButtonRadio = <D extends BaseOption = BaseOption>({
  optionProps,
  options,
  value: currentValue,
  onValueChange,
  ...rest
}: ButtonRadioProps<D>) => {
  return (
    <Grid {...rest}>
      {options.map((option) => (
        <Button
          key={option.value}
          outline={currentValue === option.value}
          variant={currentValue === option.value ? 'primary' : 'secondary'}
          size="md"
          type="button"
          {...optionProps}
          onClick={(ev) => {
            onValueChange?.(option.value, option)
            optionProps?.onClick?.(ev)
          }}
        >
          {option.label}
        </Button>
      ))}
    </Grid>
  )
}
