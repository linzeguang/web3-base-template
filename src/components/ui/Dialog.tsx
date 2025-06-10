import React, { forwardRef, useImperativeHandle, useState } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import { Icon } from '@/components/svgr'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export interface DialogMethods {
  isOpen: boolean
  open: () => void
  close: () => void
}

export interface DialogProps extends React.ComponentProps<typeof DialogPrimitive.Root>, React.PropsWithChildren {
  closeable?: boolean
  title?: React.ReactNode
  trigger?: React.ComponentProps<typeof DialogPrimitive.Trigger>
  content?: React.ComponentProps<typeof DialogPrimitive.Content>
}

export const Dialog = forwardRef<DialogMethods, DialogProps>(
  ({ closeable = true, children, content, trigger, title, ...props }, methods) => {
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(
      methods,
      () => ({
        isOpen: props.open ?? isOpen,
        open: () => {
          if (props.onOpenChange) props.onOpenChange(true)
          else setIsOpen(true)
        },
        close: () => {
          if (props.onOpenChange) props.onOpenChange(true)
          else setIsOpen(false)
        }
      }),
      [isOpen, props]
    )

    return (
      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen} {...props}>
        {trigger && <DialogPrimitive.Trigger {...trigger} />}
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              'dialog-overlay',
              'data-[state=open]:animate-in data-[state=open]:fade-in-0',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
            )}
          />
          <DialogPrimitive.Content
            {...content}
            className={cn(
              'dialog-content',
              'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-1/4',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-1/4',
              content?.className
            )}
          >
            <DialogPrimitive.Title className="pr-8 pb-4 text-xl font-semibold">{title}</DialogPrimitive.Title>

            {children}

            {closeable && (
              <DialogPrimitive.Close asChild>
                <Button ghost size="xs" className="absolute top-3 right-3 h-auto border-0">
                  <Icon.Close />
                </Button>
              </DialogPrimitive.Close>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }
)
