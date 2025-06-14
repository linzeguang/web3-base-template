import React, { type PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

export const Card: React.FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={cn('card border-base-300 border bg-white/5 p-6 backdrop-blur-md', className)} {...rest}>
      {children}
    </div>
  )
}
