import { useCallback, useMemo } from 'react'

import { CurrencyAmount, Token, TradeType } from '@uniswap/sdk-core'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { Router, Trade } from '@uniswap/v2-sdk'
import { useAccount, useWriteContract } from 'wagmi'

import { DEFAULT_DEADLINE_FROM_NOW, INITIAL_ALLOWED_SLIPPAGE } from '@/constants/trade'
import { useApproveCallbackFromTrade } from '@/features/transaction/hooks/useApproveCallback'

import { ROUTER } from '../constants/addresses'
import { basisPointsToPercent } from '../libs/utils'

import { useRoute } from './useRoute'

export const useTrade = (currencyAmount: CurrencyAmount<Token>, token: Token, isExactIn: boolean = true) => {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  const route = useRoute(currencyAmount.currency, token)

  const trade = useMemo(() => {
    if (!route) return undefined
    return isExactIn ? Trade.exactIn(route, currencyAmount) : Trade.exactOut(route, currencyAmount)
  }, [currencyAmount, isExactIn, route])

  const allowedSlippage = basisPointsToPercent(INITIAL_ALLOWED_SLIPPAGE)

  const [approveState, approve] = useApproveCallbackFromTrade(trade, INITIAL_ALLOWED_SLIPPAGE)

  const swapParameters = useMemo(
    () =>
      trade &&
      address &&
      Router.swapCallParameters(trade, {
        allowedSlippage,
        ttl: DEFAULT_DEADLINE_FROM_NOW,
        recipient: address
      }),
    [address, allowedSlippage, trade]
  )

  const swap = useCallback(() => {
    approve()
    if (!swapParameters) return

    writeContract({
      abi: IUniswapV2Router02ABI,
      address: ROUTER,
      functionName: swapParameters.methodName,
      args: swapParameters.args
    })
  }, [approve, swapParameters, writeContract])

  return {
    approveState,
    trade,
    swap,
    approve
  }
}

export type ITrade =
  | Trade<Token, Token, TradeType.EXACT_INPUT>
  | Trade<Token, Token, TradeType.EXACT_OUTPUT>
  | undefined
