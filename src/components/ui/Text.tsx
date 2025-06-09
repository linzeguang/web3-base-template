import React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textVariants = cva('', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'text-white/80',
      tertiary: 'text-white/60',
      disabled: 'text-[#A4A4A4]',
      gray: 'text-[#BBBBBB ]'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: React.ElementType
}

export const Text = React.forwardRef<React.HTMLAttributes<HTMLElement>, TextProps>(
  ({ as: Component = 'p', className, variant, ...rest }, ref) => (
    <Component ref={ref} className={textVariants({ className, variant })} {...rest} />
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
