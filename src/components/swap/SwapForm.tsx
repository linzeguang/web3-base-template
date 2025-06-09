import React from 'react'

import SlippageDialog from '@/components/settings/SlippageDialog'
import { Flex } from '@/components/ui/Box'
import { ModuleTitle } from '@/components/ui/Text'

const SwapForm: React.FC = () => {
  return (
    <div className="mt-20">
      <Flex className="items-center justify-between">
        <ModuleTitle>Swap</ModuleTitle>
        <Flex>
          <SlippageDialog />
        </Flex>
      </Flex>
    </div>
  )
}

export default SwapForm
