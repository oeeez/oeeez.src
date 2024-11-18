import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Oeeez.online</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/marketplace">Marketplace</Link></li>
            <li><Link href="/games">Games</Link></li>
            <li><Link href="/banking">Banking</Link></li>
          </ul>
        </nav>
        <div>
          <Button variant="secondary" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
