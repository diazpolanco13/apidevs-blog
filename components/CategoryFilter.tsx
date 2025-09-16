'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Category {
  _id: string
  title: string
  slug: { current: string }
  description: string
  color: string
  icon: string
}

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          🏷️ Filtrar por Categoría
        </h2>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕ Limpiar filtro
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(
              selectedCategory === category.slug?.current ? null : category.slug?.current
            )}
            className={`
              px-4 py-2 rounded-full font-medium transition-all transform hover:scale-105
              ${selectedCategory === category.slug?.current
                ? 'text-white shadow-lg'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }
            `}
            style={{
              backgroundColor: selectedCategory === category.slug?.current ? category.color : undefined,
              borderColor: category.color,
              borderWidth: '2px',
              borderStyle: 'solid'
            }}
          >
            <span className="mr-2">{category.icon}</span>
            {category.title}
          </button>
        ))}
      </div>

      {/* Category Description */}
      {selectedCategory && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {categories.find(c => c.slug?.current === selectedCategory)?.description}
        </div>
      )}
    </div>
  )
}
