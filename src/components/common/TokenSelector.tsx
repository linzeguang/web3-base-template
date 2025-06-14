import React, { useMemo, useRef } from 'react'

import { SimpleBalance } from '@/components/common/Balance'
import { Icon } from '@/components/svgr'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Dialog, type DialogMethods } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Text } from '@/components/ui/Text'
import { Tokens } from '@/features/swap/sdks/v2/constants'
import { formatAddress } from '@/lib/format'
import { randomColor } from '@/lib/utils'

const TokenSelector: React.FC<{
  tokenAddress: string
  onSelect: (tokenAddress: string) => void
}> = ({ tokenAddress, onSelect }) => {
  const dialogRef = useRef<DialogMethods | null>(null)
  const selectedToken = useMemo(
    () => Object.values(Tokens).find(({ address }) => tokenAddress === address),
    [tokenAddress]
  )

  return (
    <Dialog
      ref={dialogRef}
      title="Select a Token"
      trigger={{
        asChild: true,
        children: (
          <Button size="sm" type="button" outline className="rounded-full text-white hover:bg-transparent">
            <Flex
              className="size-4 items-center justify-center rounded-full border text-[6px]"
              style={{ backgroundColor: randomColor() }}
            >
              {selectedToken?.symbol}
            </Flex>
            <span>{selectedToken?.name}</span>
            <Icon.SelectorArrow />
          </Button>
        )
      }}
      content={{
        className: 'w-[384px] space-y-4'
      }}
    >
      <Input wrapperClassName="w-full" placeholder="token or paste address" suffixNode={<Icon.Search />} />
      <div>
        <Flex className="mb-1 items-center justify-between text-xs">
          <Text variant="tertiary">Token</Text>
          <Text variant="tertiary">Balance/Address</Text>
        </Flex>
        <ul className="max-h-[360px] space-y-1 overflow-y-auto">
          {[Tokens.AAA, Tokens.BBB, Tokens.CCC, Tokens.DDD, Tokens.WMON].map(({ address, symbol, name }) => (
            <li
              key={address}
              className="hover:bg-primary/20 flex cursor-pointer items-center justify-between rounded-md px-3 py-2"
              onClick={() => {
                onSelect(address)
                dialogRef.current?.close()
              }}
            >
              <Flex className="items-center gap-2">
                <Flex
                  className="size-8 items-center justify-center rounded-full border text-[8px]"
                  style={{ backgroundColor: randomColor() }}
                >
                  {symbol}
                </Flex>
                <div>
                  <Text className="text-sm font-medium">{symbol}</Text>
                  <Text className="text-sm font-extralight">{name}</Text>
                </div>
              </Flex>
              <div className="space-y-1 text-right">
                <SimpleBalance token={address} />
                <Text className="flex items-center justify-end gap-1 text-xs" variant="tertiary">
                  <span>{formatAddress(address)}</span>
                  <Icon.Copy />
                </Text>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  )
}

export default TokenSelector
