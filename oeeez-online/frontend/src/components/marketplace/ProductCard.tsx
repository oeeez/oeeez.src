import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, image }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p className="mt-2 text-lg font-bold">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
