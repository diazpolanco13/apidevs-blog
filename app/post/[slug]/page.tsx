import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { Calendar, Clock, User, ArrowLeft, TrendingUp, Hash } from 'lucide-react'
import BlogHeader from '@/components/BlogHeader'

interface PostPageProps {
  params: {
    slug: string
  }
}

// Query para obtener un post específico
const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    mainImage,
    publishedAt,
    excerpt,
    featured,
    readTime,
    "categories": categories[]->{ title, slug, color, icon },
    "author": author->{ name, bio, image },
    tradingMetadata,
    seoMetadata
  }
`

// Query para posts relacionados
const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    "categories": categories[]->{ title, slug, color, icon }
  }
`

// Componente para renderizar el contenido portable text
const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ' '}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-green-500 pl-4 my-6 italic text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a 
          href={value.href} 
          rel={rel}
          className="text-green-500 hover:text-green-600 underline"
        >
          {children}
        </a>
      )
    },
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
  },
}

export async function generateStaticParams() {
  const posts = await client.fetch(
    groq`*[_type == "post"]{ slug }`
  )
  
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await client.fetch(postQuery, { slug: params.slug })
  
  if (!post) {
    return {
      title: 'Post no encontrado - APIDevs Blog',
    }
  }

  return {
    title: `${post.title} - APIDevs Blog`,
    description: post.excerpt || post.seoMetadata?.metaDescription || '',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const [post, relatedPosts] = await Promise.all([
    client.fetch(postQuery, { slug: params.slug }),
    client.fetch(relatedPostsQuery, { slug: params.slug })
  ])

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <BlogHeader />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Post no encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            El artículo que buscas no existe o ha sido eliminado.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center text-green-500 hover:text-green-600 font-semibold"
          >
            <ArrowLeft className="mr-2" />
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <BlogHeader />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link 
          href="/"
          className="inline-flex items-center text-green-500 hover:text-green-600 font-semibold mb-8 group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver al blog
        </Link>

        {/* Hero Image */}
        {post.mainImage && (
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-8 neon-border">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((cat: any) => (
              <span 
                key={cat.slug?.current}
                className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                style={{ 
                  borderColor: cat.color || '#10b981',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                {cat.icon} {cat.title}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {post.author.name}
                </div>
                {post.author.bio && (
                  <div className="text-sm">{post.author.bio}</div>
                )}
              </div>
            </div>
          )}
          
          {/* Date */}
          {post.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>
          )}
          
          {/* Read Time */}
          {post.readTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min de lectura</span>
            </div>
          )}
        </div>

        {/* Trading Metadata */}
        {post.tradingMetadata && (
          <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 mb-8 neon-border">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Información de Trading
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {post.tradingMetadata.difficulty && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Dificultad</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {post.tradingMetadata.difficulty === 'beginner' && '🟢 Principiante'}
                    {post.tradingMetadata.difficulty === 'intermediate' && '🟡 Intermedio'}
                    {post.tradingMetadata.difficulty === 'advanced' && '🔴 Avanzado'}
                  </div>
                </div>
              )}
              {post.tradingMetadata.timeframe && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Timeframe</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {post.tradingMetadata.timeframe}
                  </div>
                </div>
              )}
              {post.tradingMetadata.strategyType && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Estrategia</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {post.tradingMetadata.strategyType}
                  </div>
                </div>
              )}
              {post.tradingMetadata.tradingPair && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Par</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {post.tradingMetadata.tradingPair}
                  </div>
                </div>
              )}
            </div>
            {post.tradingMetadata.relatedIndicators && post.tradingMetadata.relatedIndicators.length > 0 && (
              <div className="mt-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Indicadores Relacionados</div>
                <div className="flex flex-wrap gap-2">
                  {post.tradingMetadata.relatedIndicators.map((indicator: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium"
                    >
                      <Hash className="w-3 h-3 inline mr-1" />
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.body && (
            <PortableText 
              value={post.body}
              components={PortableTextComponents}
            />
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-500/30">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Listo para mejorar tu trading?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Únete a más de 3,500 traders que ya están usando nuestros indicadores premium
          </p>
          <Link 
            href="https://apidevs-react.vercel.app/pricing"
            target="_blank"
            className="inline-flex px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
          >
            Ver Indicadores Premium →
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Artículos Relacionados
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <Link 
                  key={relatedPost._id}
                  href={`/post/${relatedPost.slug.current}`}
                  className="group"
                >
                  <article className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 neon-border">
                    {relatedPost.mainImage && (
                      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={urlFor(relatedPost.mainImage).url()}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-green-500 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
