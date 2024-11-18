import React from 'react'
import { ProductCard } from './ProductCard'

const dummyProducts = [
  { id: '1', name: 'Product 1', description: 'Description 1', price: 19.99, image: '/placeholder.svg' },
  { id: '2', name: 'Product 2', description: 'Description 2', price: 29.99, image: '/placeholder.svg' },
  { id: '3', name: 'Product 3', description: 'Description 3', price: 39.99, image: '/placeholder.svg' },
]

export const ProductList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummyProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
