import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getAllPosts()
  
  return posts.map(post => ({
    year: post.year,
    month: post.month,
    slug: post.slug,
  }))
}

export default async function PostPage({
  params,
}: {
  params: { year: string; month: string; slug: string }
}) {
  const post = await getPostBySlug(params.year, params.month, params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <time>
                {post.date && format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
              </time>
              <div className="flex items-center space-x-4 flex-wrap">
                <Link
                  href={`/blog/category/${encodeURIComponent(post.category)}`}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                >
                  {post.category}
                </Link>
                <div className="flex space-x-2 flex-wrap">
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${encodeURIComponent(tag)}`}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </header>
          
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/blog"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              ← 블로그 목록으로 돌아가기
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

