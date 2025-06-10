import { getCreate2Address } from '@ethersproject/address'
import { keccak256, pack } from '@ethersproject/solidity'
import { CurrencyAmount, Percent, Token } from '@uniswap/sdk-core'
import { ethers } from 'ethers'

import { RPC_URL } from '@/constants/wallet'

import { FACTORY_ADDRESS, Field, INIT_CODE_HASH } from '../constants'
import { V2_RESERVES_ABI } from '../constants/abis'
import { type ITrade } from '../hooks/useTrade'

import Pair from './Pair'

export function basisPointsToPercent(num: number): Percent {
  return new Percent(num, 10000)
}

export const computePairAddress = ({
  factoryAddress,
  tokenA,
  tokenB
}: {
  factoryAddress: string
  tokenA: Token
  tokenB: Token
}): string => {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  return getCreate2Address(
    factoryAddress,
    keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
    INIT_CODE_HASH
  )
}

export function computeSlippageAdjustedAmounts(
  trade: ITrade | undefined,
  allowedSlippage: number
): { [field in Field]?: CurrencyAmount<Token> } {
  const pct = basisPointsToPercent(allowedSlippage)
  return {
    [Field.INPUT]: trade?.maximumAmountIn(pct),
    [Field.OUTPUT]: trade?.minimumAmountOut(pct)
  }
}

export function getProvider(): ethers.providers.BaseProvider {
  return new ethers.providers.JsonRpcProvider(RPC_URL)
}

export async function getPair(tokenA: Token, tokenB: Token, blockNumber: number): Promise<Pair> {
  const pairAddress = computePairAddress({
    factoryAddress: FACTORY_ADDRESS,
    tokenA,
    tokenB
  })
  const contract = new ethers.Contract(pairAddress, V2_RESERVES_ABI, getProvider())
  const { reserve0, reserve1 } = await contract.getReserves({
    blockTag: blockNumber
  })
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  return new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1))
}
