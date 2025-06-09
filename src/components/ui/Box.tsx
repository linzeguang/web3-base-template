import React, { type HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export const Flex = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn('flex', className)} {...rest} />
))

export const Grid = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn('grid', className)} {...rest} />
))
