import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

export const Sidebar: React.FC = () => {
  return (
    <aside className="bg-secondary text-secondary-foreground w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/marketplace">Marketplace</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/games">Games</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/banking">Banking</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/profile">Profile</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
