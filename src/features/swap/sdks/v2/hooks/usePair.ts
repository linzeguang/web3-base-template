import { useCallback, useEffect, useState } from 'react'

import { Token } from '@uniswap/sdk-core'

import useBlockNumber from '@/features/block/hooks/useBlockNumber'

import Pair from '../libs/Pair'
import { getPair } from '../libs/utils'

export const usePair = (tokenA: Token, tokenB: Token) => {
  const { blockNumber } = useBlockNumber()
  const [pair, setPair] = useState<Pair>()

  const fetchPair = useCallback(async () => {
    if (!blockNumber) return

    try {
      const pair = await getPair(tokenA, tokenB, blockNumber)
      setPair(pair)
    } catch {
      setPair(undefined)
    }
  }, [blockNumber, tokenA, tokenB])

  useEffect(() => {
    fetchPair()
  }, [fetchPair])

  return pair
}
