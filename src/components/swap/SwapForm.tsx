import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAccount, useBalance } from 'wagmi'
import z from 'zod'

import { QuickInputButton } from '@/components/common/QuickInputButton'
import TokenSelector from '@/components/common/TokenSelector'
import SlippageDialog from '@/components/settings/SlippageDialog'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { ModuleTitle, Text } from '@/components/ui/Text'
import { Addresses } from '@/features/swap/sdks/v2/constants'

import type { Address } from 'viem'

const formSchema = z.object({
  inToken: z.string(),
  outToken: z.string()
})

const SwapForm: React.FC = () => {
  const { address } = useAccount()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inToken: Addresses.AAA
    }
  })

  const inToken = form.watch('inToken')

  const inTokenBalance = useBalance({
    address,
    token: inToken as Address
  })

  return (
    <div className="mt-20 space-y-4">
      <Flex className="items-center justify-between">
        <ModuleTitle>Swap</ModuleTitle>
        <Flex>
          <SlippageDialog />
        </Flex>
      </Flex>
      <Card className="space-y-4">
        <Form {...form}>
          <form>
            <FormItem>
              <FormLabel className="flex justify-between">
                <Text variant="tertiary">From</Text>
                <Text variant="tertiary">~{inTokenBalance.data?.formatted}</Text>
              </FormLabel>
              <FormControl>
                <Input
                  wrapperClassName="w-full"
                  prefixNode={
                    <TokenSelector
                      tokenAddress={inToken}
                      onSelect={(tokenAddress) => form.setValue('inToken', tokenAddress)}
                    />
                  }
                  suffixNode={<QuickInputButton />}
                />
              </FormControl>
            </FormItem>
          </form>
        </Form>
        <Button variant="primary">Connect Wallet</Button>
      </Card>
    </div>
  )
}

export default SwapForm
