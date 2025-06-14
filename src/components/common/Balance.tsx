import type React from 'react'

import { useAccount, useBalance } from 'wagmi'

import { Text } from '@/components/ui/Text'

import type { Address } from 'viem'

export const Balance = () => {
  return null
}

export const SimpleBalance: React.FC<{ token: string }> = ({ token }) => {
  const { address } = useAccount()
  const { data, isLoading } = useBalance({
    address: address,
    token: token as Address
  })

  console.log('>>>>>> data: ', address, data)

  return (
    <Text className="text-xs">
      {isLoading ? <span className="loading loading-spinner size-4"></span> : data?.formatted || '--'}
    </Text>
  )
}
