import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { Calendar, Clock, User, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react'

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
      <div className="text-center py-12 glass-card rounded-2xl">
        <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">No hay artículos disponibles aún.</p>
        <p className="text-sm text-gray-500 mt-2">Vuelve pronto para contenido épico 🚀</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-8 ${featured ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
      {posts.map((post, index) => (
        <article 
          key={post._id}
          className="group relative"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Link href={`/post/${post.slug?.current}`}>
            <div className="relative h-full glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                {post.mainImage ? (
                  <>
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/20 to-purple-500/20">
                    <TrendingUp className="w-20 h-20 text-white/20" />
                  </div>
                )}
                
                {/* Featured Badge */}
                {post.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-black rounded-full flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    DESTACADO
                  </div>
                )}

                {/* Categories floating badges */}
                {post.categories && post.categories.length > 0 && (
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {post.categories.slice(0, 2).map((cat) => (
                      <span 
                        key={cat.slug?.current}
                        className="px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-md bg-black/50 text-white border border-white/20"
                      >
                        {cat.icon} {cat.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt || 'Descubre insights revolucionarios en este análisis detallado...'}
                </p>

                {/* Trading Metadata Pills */}
                {post.tradingMetadata && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tradingMetadata.difficulty && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-green-500/10 to-green-500/5 text-green-400 border border-green-500/20">
                        {post.tradingMetadata.difficulty === 'beginner' && '🟢 Principiante'}
                        {post.tradingMetadata.difficulty === 'intermediate' && '🟡 Intermedio'}
                        {post.tradingMetadata.difficulty === 'advanced' && '🔴 Avanzado'}
                      </span>
                    )}
                    {post.tradingMetadata.strategyType && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 text-cyan-400 border border-cyan-500/20">
                        {post.tradingMetadata.strategyType}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {/* Author */}
                    {post.author && (
                      <div className="flex items-center gap-1.5">
                        {post.author.image ? (
                          <Image
                            src={urlFor(post.author.image).url()}
                            alt={post.author.name}
                            width={20}
                            height={20}
                            className="rounded-full border border-white/20"
                          />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                        <span className="text-gray-400">{post.author.name}</span>
                      </div>
                    )}
                    
                    {/* Read Time */}
                    {post.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime} min</span>
                      </div>
                    )}
                  </div>

                  {/* Read More Arrow */}
                  <div className="flex items-center gap-1 text-green-500 font-semibold text-sm group-hover:text-green-400 transition-colors">
                    Leer
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl shadow-[0_0_50px_rgba(0,255,136,0.3)]" />
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}