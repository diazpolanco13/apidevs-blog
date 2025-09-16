import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import BlogHeader from '@/components/BlogHeader'
import PostGrid from '@/components/PostGrid'
import CategoryFilter from '@/components/CategoryFilter'

const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    featured,
    readTime,
    "categories": categories[]->{ title, slug, color, icon },
    "author": author->{ name, image },
    tradingMetadata
  }
`

const categoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    color,
    icon
  }
`

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(categoriesQuery)
  ])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <BlogHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            APIDevs Trading <span className="text-green-500">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Análisis técnico avanzado, estrategias de trading con IA, y guías exclusivas 
            sobre nuestros indicadores premium para TradingView
          </p>
        </div>

        {/* Featured Posts */}
        {posts.filter(p => p.featured).length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              📌 Artículos Destacados
            </h2>
            <PostGrid posts={posts.filter(p => p.featured)} featured />
          </section>
        )}

        {/* Category Filter */}
        <CategoryFilter categories={categories} />

        {/* All Posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            📚 Todos los Artículos
          </h2>
          <PostGrid posts={posts.filter(p => !p.featured)} />
        </section>
      </main>
    </div>
  )
}