import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import BlogHeader from '@/components/BlogHeader'
import LuxAlgoStyleLayout from '@/components/LuxAlgoStyleLayout'
import Footer from '@/components/Footer'

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
    icon,
    "count": count(*[_type == "post" && references(^._id)])
  }
`

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(categoriesQuery)
  ])

  // Categorize posts
  const recentPosts = posts.slice(0, 8)
  const featuredPost = posts.find(p => p.featured) || posts[0]
  
  // Group posts by category
  const technicalAnalysisPosts = posts.filter(p => 
    p.categories?.some((c: any) => c.title === 'Technical Analysis')
  ).slice(0, 4)
  
  const strategiesPosts = posts.filter(p => 
    p.categories?.some((c: any) => c.title === 'Estrategias')
  ).slice(0, 4)
  
  const aiTechPosts = posts.filter(p => 
    p.categories?.some((c: any) => c.title === 'IA & Technology')
  ).slice(0, 4)

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <BlogHeader />
      <LuxAlgoStyleLayout 
        posts={posts}
        categories={categories}
        recentPosts={recentPosts}
        featuredPost={featuredPost}
        technicalAnalysisPosts={technicalAnalysisPosts}
        strategiesPosts={strategiesPosts}
        aiTechPosts={aiTechPosts}
      />
      <Footer />
    </div>
  )
}