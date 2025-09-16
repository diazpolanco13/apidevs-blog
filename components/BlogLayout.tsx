'use client'

import { useState } from 'react'
import { Search, TrendingUp, Clock, BookOpen, Zap, ChevronRight, Filter, X } from 'lucide-react'
import BlogPostCard from './BlogPostCard'
import Link from 'next/link'

interface BlogLayoutProps {
  posts: any[]
  categories: any[]
  recentPosts: any[]
  featuredPosts: any[]
}

export default function BlogLayout({ posts, categories, recentPosts, featuredPosts }: BlogLayoutProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || 
                           post.categories?.some((cat: any) => cat.slug.current === selectedCategory)
    return matchesSearch && matchesCategory
  })

  const displayPosts = activeTab === 'featured' ? featuredPosts : 
                       activeTab === 'recent' ? recentPosts : 
                       filteredPosts

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section - Compact */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gray-900 dark:text-white">APIDevs Trading</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">Blog</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Análisis técnico, estrategias de trading y guías sobre indicadores premium
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar artículos, estrategias, indicadores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-green-500 dark:focus:border-green-500 transition-colors text-gray-900 dark:text-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 dark:bg-gray-900/50 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'recent'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Recientes
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'featured'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Destacados
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Section Headers */}
          {activeTab === 'all' && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedCategory ? 
                  `${categories.find(c => c.slug.current === selectedCategory)?.title || 'Categoría'}` : 
                  'Todos los Artículos'
                }
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {displayPosts.length} {displayPosts.length === 1 ? 'artículo' : 'artículos'}
              </span>
            </div>
          )}

          {/* Posts Grid */}
          {displayPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {displayPosts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/30 rounded-xl">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No se encontraron artículos</p>
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory(null)
                  }}
                  className="mt-4 text-green-500 hover:text-green-600 font-medium"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full mb-6 px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300"
          >
            <Filter className="w-5 h-5" />
            Filtros y Categorías
          </button>

          <div className={`space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Categorías
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                    !selectedCategory
                      ? 'bg-green-500/10 text-green-500 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>Todas las categorías</span>
                  <span className="text-xs">{posts.length}</span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category.slug.current)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                      selectedCategory === category.slug.current
                        ? 'bg-green-500/10 text-green-500 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.title}</span>
                    </span>
                    <span className="text-xs">{category.count || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Tags Populares
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Bitcoin', 'Ethereum', 'DeFi', 'NFT', 'Scalping', 'Day Trading', 'Swing', 'HODLing'].map(tag => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm hover:bg-green-500/10 hover:text-green-500 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Posts Sidebar */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-500" />
                Más Recientes
              </h3>
              <div className="space-y-3">
                {recentPosts.slice(0, 3).map((post) => (
                  <Link
                    key={post._id}
                    href={`/post/${post.slug.current}`}
                    className="block group"
                  >
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-500 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short'
                      })} • {post.readTime || 5} min
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-green-500 to-cyan-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">📬 Newsletter</h3>
              <p className="text-sm mb-4 opacity-90">
                Únete a 3,500+ traders y recibe análisis exclusivos
              </p>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-2 bg-white/20 backdrop-blur rounded-lg placeholder-white/70 text-white border border-white/30 focus:outline-none focus:border-white mb-3"
              />
              <button className="w-full py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
