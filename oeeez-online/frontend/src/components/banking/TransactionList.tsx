import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: 'credit' | 'debit'
}

const dummyTransactions: Transaction[] = [
  { id: '1', date: '2023-05-01', description: 'Deposit', amount: 1000, type: 'credit' },
  { id: '2', date: '2023-05-02', description: 'Purchase', amount: 50, type: 'debit' },
  { id: '3', date: '2023-05-03', description: 'Transfer', amount: 200, type: 'debit' },
]

export const TransactionList: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {dummyTransactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
