import React, { useRef } from 'react'

import { Icon } from '@/components/svgr'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { Text } from '@/components/ui/Text'

const SlippageDialog: React.FC = () => {
  const dialogRef = useRef<React.ComponentRef<typeof Dialog> | null>(null)
  return (
    <>
      <Dialog
        ref={dialogRef}
        title="Set max.slippage(%)"
        trigger={{
          asChild: true,
          children: (
            <Button
              size="xs"
              outline
              className="text-white/80"
              onClick={() => {
                dialogRef.current?.open()
              }}
            >
              <Icon.Slippage />
              <Text as="span" variant="secondary">
                0.5%
              </Text>
            </Button>
          )
        }}
        content={{
          className: 'w-[432px]'
        }}
      >
        1111
      </Dialog>
    </>
  )
}

export default SlippageDialog
