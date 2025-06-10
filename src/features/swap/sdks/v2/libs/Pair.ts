import { ChainId, Token } from '@uniswap/sdk-core'
import { Pair as V2Pair } from '@uniswap/v2-sdk'

import { FACTORY_ADDRESS, FACTORY_ADDRESS_MAP } from '../constants'

import { computePairAddress } from './utils'

export default class Pair extends V2Pair {
  public static getAddress(tokenA: Token, tokenB: Token): string {
    const factoryAddress = FACTORY_ADDRESS_MAP[ChainId.MONAD_TESTNET] ?? FACTORY_ADDRESS
    return computePairAddress({ factoryAddress, tokenA, tokenB })
  }
}
