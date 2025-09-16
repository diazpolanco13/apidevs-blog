import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { Calendar, Clock, User, TrendingUp } from 'lucide-react'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage: any
  publishedAt: string
  featured: boolean
  readTime: number
  categories: Array<{
    title: string
    slug: { current: string }
    color: string
    icon: string
  }>
  author: {
    name: string
    image: any
  }
  tradingMetadata?: {
    difficulty?: string
    strategyType?: string
    indicators?: string[]
  }
}

interface PostGridProps {
  posts: Post[]
  featured?: boolean
}

export default function PostGrid({ posts, featured = false }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No hay artículos disponibles aún.</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-8 ${featured ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
      {posts.map((post) => (
        <article 
          key={post._id}
          className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Image */}
          <Link href={`/post/${post.slug?.current}`}>
            <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
                  <TrendingUp className="w-16 h-16 text-white opacity-50" />
                </div>
              )}
              
              {/* Featured Badge */}
              {post.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                  ⭐ DESTACADO
                </div>
              )}

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {post.categories.map((cat) => (
                    <span 
                      key={cat.slug?.current}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-black/70 text-white backdrop-blur-sm"
                      style={{ 
                        backgroundColor: cat.color ? `${cat.color}99` : 'rgba(0,0,0,0.7)' 
                      }}
                    >
                      {cat.icon} {cat.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <Link href={`/post/${post.slug?.current}`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-green-500 transition-colors">
                {post.title}
              </h3>
            </Link>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {post.excerpt || 'Descubre más sobre este tema en nuestro artículo completo...'}
            </p>

            {/* Trading Metadata */}
            {post.tradingMetadata && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tradingMetadata.difficulty && (
                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">
                    {post.tradingMetadata.difficulty === 'beginner' && '🟢 Principiante'}
                    {post.tradingMetadata.difficulty === 'intermediate' && '🟡 Intermedio'}
                    {post.tradingMetadata.difficulty === 'advanced' && '🔴 Avanzado'}
                  </span>
                )}
                {post.tradingMetadata.strategyType && (
                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">
                    📈 {post.tradingMetadata.strategyType}
                  </span>
                )}
              </div>
            )}

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                {/* Author */}
                {post.author && (
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                )}
                
                {/* Read Time */}
                {post.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min</span>
                  </div>
                )}
              </div>

              {/* Date */}
              {post.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              )}
            </div>

            {/* Read More Link */}
            <Link 
              href={`/post/${post.slug?.current}`}
              className="inline-flex items-center mt-4 text-green-500 hover:text-green-600 font-semibold group"
            >
              Leer más 
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
