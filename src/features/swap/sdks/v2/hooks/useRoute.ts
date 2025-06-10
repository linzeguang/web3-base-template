import { useMemo } from 'react'

import { Token } from '@uniswap/sdk-core'
import { Route } from '@uniswap/v2-sdk'

import { usePair } from './usePair'

export const useRoute = (tokenA: Token, tokenB: Token) => {
  const pair = usePair(tokenA, tokenB)

  return useMemo(() => {
    if (!pair) return null
    return new Route([pair], tokenA, tokenB)
  }, [pair, tokenA, tokenB])
}
