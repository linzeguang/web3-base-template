import { ChainId } from '@uniswap/sdk-core'
import { FACTORY_ADDRESS_MAP as _FACTORY_ADDRESS_MAP } from '@uniswap/v2-sdk'

export const FACTORY_ADDRESS_MAP = {
  ..._FACTORY_ADDRESS_MAP,
  [ChainId.MONAD_TESTNET]: '0x765AF30746C4B59125bbaa31524F4aAFc5A9f9fc'
}

export const FACTORY_ADDRESS = FACTORY_ADDRESS_MAP[ChainId.MONAD_TESTNET]

export const INIT_CODE_HASH =
  '0xd8d1e7a84c4928205c287c5d45dbdc322aa337b0c59788b11ab24d996802966c'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT'
}

export * as Addresses from './addresses'
export * as Tokens from './tokens'
