import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'

interface BlogPostCardProps {
  post: any
  featured?: boolean
}

export default function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  return (
    <article className="group bg-white dark:bg-gray-900/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all duration-300">
      <Link href={`/post/${post.slug?.current}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <span className="text-6xl opacity-20">📊</span>
            </div>
          )}
          
          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
              ⭐ DESTACADO
            </div>
          )}

          {/* Category Badge */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute bottom-3 left-3">
              <span 
                className="px-3 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur text-white"
              >
                {post.categories[0].icon} {post.categories[0].title}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-green-500 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {post.excerpt || 'Descubre más sobre este tema en nuestro análisis completo...'}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-3">
              {/* Author */}
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{post.author.name}</span>
                </div>
              )}
              
              {/* Date */}
              {post.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </time>
                </div>
              )}
            </div>

            {/* Read Time */}
            {post.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime} min</span>
              </div>
            )}
          </div>

          {/* Trading Metadata */}
          {post.tradingMetadata && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex flex-wrap gap-1">
                {post.tradingMetadata.difficulty && (
                  <span className="px-2 py-0.5 text-xs rounded bg-green-500/10 text-green-600 dark:text-green-400">
                    {post.tradingMetadata.difficulty === 'beginner' && 'Principiante'}
                    {post.tradingMetadata.difficulty === 'intermediate' && 'Intermedio'}
                    {post.tradingMetadata.difficulty === 'advanced' && 'Avanzado'}
                  </span>
                )}
                {post.tradingMetadata.strategyType && (
                  <span className="px-2 py-0.5 text-xs rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {post.tradingMetadata.strategyType}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
