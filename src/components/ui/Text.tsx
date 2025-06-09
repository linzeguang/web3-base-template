import React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textVariants = cva('', {
  variants: {},
  defaultVariants: {}
})

export interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: React.ElementType
}

export const Text = React.forwardRef<React.HTMLAttributes<HTMLElement>, TextProps>(
  ({ as: Component = 'p', className, ...rest }, ref) => (
    <Component ref={ref} className={textVariants({ className })} {...rest} />
  )
)

export const UnboundedText = React.forwardRef<
  React.ComponentRef<typeof Text>,
  React.ComponentPropsWithRef<typeof Text>
>((props, ref) => <Text ref={ref} {...props} className={cn('font-Unbounded', props.className)} />)

export const Exo2Text = React.forwardRef<React.ComponentRef<typeof Text>, React.ComponentPropsWithRef<typeof Text>>(
  (props, ref) => <Text ref={ref} {...props} className={cn('font-Exo2', props.className)} />
)

export const ModuleTitle: React.FC<React.ComponentPropsWithRef<typeof Text>> = (props) => (
  <UnboundedText {...props} className={cn('text-2xl font-black', props.className)} />
)
