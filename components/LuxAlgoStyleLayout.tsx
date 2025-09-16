'use client'

import { useState } from 'react'
import { Search, TrendingUp, Clock, ChevronRight, X, Calendar, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface LuxAlgoStyleLayoutProps {
  posts: any[]
  categories: any[]
  recentPosts: any[]
  featuredPost: any
  technicalAnalysisPosts: any[]
  strategiesPosts: any[]
  aiTechPosts: any[]
}

export default function LuxAlgoStyleLayout({ 
  posts, 
  recentPosts, 
  featuredPost,
  technicalAnalysisPosts,
  strategiesPosts,
  aiTechPosts 
}: LuxAlgoStyleLayoutProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const displayPosts = searchTerm ? filteredPosts : recentPosts

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      {/* Search Bar - Better positioned */}
      <div className="mb-8">
        <div className="flex justify-end">
          {!showSearch ? (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-400" />
            </button>
          ) : (
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-white"
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchTerm('')
                  setShowSearch(false)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Featured Post - LuxAlgo Style */}
      {featuredPost && !searchTerm && (
        <section className="mb-16">
          <Link href={`/post/${featuredPost.slug?.current}`}>
            <div className="relative group cursor-pointer">
              <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                {featuredPost.mainImage && (
                  <>
                    <Image
                      src={urlFor(featuredPost.mainImage).url()}
                      alt={featuredPost.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </>
                )}
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <div className="max-w-3xl">
                    {featuredPost.categories?.[0] && (
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-bold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                        {featuredPost.categories[0].title}
                      </span>
                    )}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors">
                      {featuredPost.title}
                    </h1>
                    <p className="text-lg text-gray-300 mb-6 line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      {featuredPost.author && (
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {featuredPost.author.name}
                        </span>
                      )}
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      {featuredPost.readTime && (
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime} min
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-green-500/30 transition-all duration-500" />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Search Results */}
      {searchTerm && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Resultados de búsqueda
            <span className="text-gray-500 text-base ml-2">({filteredPosts.length})</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Section - LuxAlgo Style */}
      {!searchTerm && (
        <>
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Recent</h2>
              <Link href="#" className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayPosts.slice(0, 8).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </section>

          {/* Technical Analysis Section */}
          {technicalAnalysisPosts.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Technical Analysis</h2>
                <Link href="#" className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {technicalAnalysisPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Strategies & Tips Section */}
          {strategiesPosts.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Strategies & Tips</h2>
                <Link href="#" className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {strategiesPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* AI & Technology Section */}
          {aiTechPosts.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">AI & Technology</h2>
                <Link href="#" className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {aiTechPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Newsletter CTA - APIDevs Style */}
      <section className="mt-20 mb-10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-purple-500/10 p-[1px]">
          <div className="relative bg-[#0f1419] rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Start trading like <span className="text-green-400">smart money</span>
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Access the best indicators, backtesting software, and 500+ community.
            </p>
            <Link 
              href="https://apidevs-react.vercel.app/pricing"
              className="inline-flex px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all transform hover:scale-105"
            >
              Sign up →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Post Card Component
function PostCard({ post }: { post: any }) {
  return (
    <Link href={`/post/${post.slug?.current}`}>
      <article className="group cursor-pointer h-full">
        <div className="relative h-48 rounded-xl overflow-hidden bg-gray-900 mb-4">
          {post.mainImage ? (
            <>
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <TrendingUp className="w-12 h-12 text-gray-700" />
            </div>
          )}
          
          {/* Category Badge */}
          {post.categories?.[0] && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-semibold bg-black/60 backdrop-blur rounded text-green-400">
                {post.categories[0].title}
              </span>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {post.author && (
              <span>By {post.author.name}</span>
            )}
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
