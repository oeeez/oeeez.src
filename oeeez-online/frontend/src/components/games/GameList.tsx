import React from 'react'
import { GameCard } from './GameCard'

const dummyGames = [
  { id: '1', name: 'Game 1', description: 'Description 1', players: 2, image: '/placeholder.svg' },
  { id: '2', name: 'Game 2', description: 'Description 2', players: 4, image: '/placeholder.svg' },
  { id: '3', name: 'Game 3', description: 'Description 3', players: 6, image: '/placeholder.svg' },
]

export const GameList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummyGames.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  )
}
