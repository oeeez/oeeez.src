import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

interface AccountSummaryProps {
  balance: number
  currency: string
}

export const AccountSummary: React.FC<AccountSummaryProps> = ({ balance, currency }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{currency}{balance.toFixed(2)}</div>
        <p className="text-sm text-gray-500">Current Balance</p>
      </CardContent>
    </Card>
  )
}
