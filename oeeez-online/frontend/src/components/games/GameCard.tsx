import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

interface GameCardProps {
  id: string
  name: string
  description: string
  players: number
  image: string
}

export const GameCard: React.FC<GameCardProps> = ({ id, name, description, players, image }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p className="mt-2">Players: {players}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Play Now</Button>
      </CardFooter>
    </Card>
  )
}
