import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'

// import { Icon } from '@/components/svgr'
// import Button from '@/components/ui/Button'
// import { Text } from '@/components/ui/Text'

interface DialogMethods {
  open: () => void
  close: () => void
}

interface DialogProps extends React.PropsWithChildren {
  closeable?: boolean
  title?: React.ReactNode
  trigger?: React.ComponentProps<typeof DialogPrimitive.Trigger>
}

const Dialog = forwardRef<DialogMethods, DialogProps>(({ children, trigger }, methods) => {
  const ref = useRef<HTMLDialogElement | null>(null)

  const open = useCallback(() => {
    ref.current?.showModal()
  }, [])

  const close = useCallback(() => {
    ref.current?.close()
  }, [])

  useImperativeHandle(
    methods,
    () => ({
      open,
      close
    }),
    [close, open]
  )

  return (
    <DialogPrimitive.Root>
      {trigger && <DialogPrimitive.Trigger {...trigger} />}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="dialog-overlay animate__animated data-[state=open]:bg-red" />
        <DialogPrimitive.Content className="dialog-content animate__animated data-[state=open]:animate__zoomIn data-[state=closed]:animate__zoomOut">
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
  // createPortal(
  //   <dialog ref={ref} className="modal">
  //     <div className="modal-box border-base-300 relative border bg-[#101114] p-4">
  //       {closeable && (
  //         <Button ghost size="xs" className="absolute top-3 right-3 h-auto border-0" onClick={close}>
  //           <Icon.Close />
  //         </Button>
  //       )}
  //       {title && <Text className="pr-8 text-xl font-semibold">{title}</Text>}
  //       {children}
  //     </div>
  //   </dialog>,
  //   document.body
  // )
})

export default Dialog
