import React from 'react'

import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { QUICK_INPUT } from '@/constants/common'

export interface QuickInputButtonProps {
  options?: Array<{ label: React.ReactNode; value: number }>
}

export const QuickInputButton: React.FC<QuickInputButtonProps> = ({
  options = [
    { label: 'HALF', value: QUICK_INPUT.HALF },
    { label: 'MAX', value: QUICK_INPUT.MAX }
  ]
}) => {
  return (
    <Flex className="gap-2">
      {options.map(({ label, value }) => (
        <Button key={value} type="button" size="xs" variant="secondary">
          {label}
        </Button>
      ))}
    </Flex>
  )
}
