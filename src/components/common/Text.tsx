import React from 'react'

import * as Slot from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textVariants = cva('', {
  variants: {
    variant: {
      primary: 'text-color-text-primary',
      secondary: 'text-color-text-secondary',
      tertiary: 'text-color-text-tertiary',
      info: 'text-info',
      success: 'text-success',
      destructive: 'text-destructive',
      warning: 'text-warning',
      disabled: 'text-disabled'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  asChild?: boolean
  as?: 'span' | 'div' | 'label' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Text = React.forwardRef<React.ElementRef<'span'>, TextProps>(
  ({ className, children, as: Tag = 'span', asChild, variant, ...rest }, ref) => (
    <Slot.Root ref={ref} className={cn(textVariants({ variant, className }))} {...rest}>
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  )
)
Text.displayName = 'Text'

export const UnboundedText = React.forwardRef<React.ComponentRef<typeof Text>, React.ComponentProps<typeof Text>>(
  (props, ref) => <Text {...props} ref={ref} className={cn('font-Unbounded', props.className)} />
)

export const Exo2Text = React.forwardRef<React.ComponentRef<typeof Text>, React.ComponentProps<typeof Text>>(
  (props, ref) => <Text {...props} ref={ref} className={cn('font-Exo2', props.className)} />
)
