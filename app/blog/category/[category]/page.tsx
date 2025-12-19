import { getAllPosts, getAllCategories } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map(category => ({
    category: encodeURIComponent(category),
  }))
}

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const decodedCategory = decodeURIComponent(params.category)
  const posts = getAllPosts().filter(post => post.category === decodedCategory)
  const categories = getAllCategories()
  
  if (!categories.includes(decodedCategory)) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          카테고리: <span className="text-primary-600 dark:text-primary-400">{decodedCategory}</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {posts.length}개의 글이 있습니다.
        </p>
        
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">이 카테고리에 해당하는 글이 없습니다.</p>
          ) : (
            posts.map(post => (
              <article
                key={post.slug}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700"
              >
                <Link href={`/blog/${post.year}/${post.month}/${post.slug}`}>
                  <h2 className="text-2xl font-semibold mb-2 text-primary-600 dark:text-primary-400 hover:underline">
                    {post.title}
                  </h2>
                </Link>
                {post.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{post.description}</p>
                )}
                <div className="flex items-center justify-between flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center space-x-4 flex-wrap">
                    <time>
                      {post.date && format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                    </time>
                    <Link
                      href={`/blog/category/${encodeURIComponent(post.category)}`}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                    >
                      {post.category}
                    </Link>
                  </div>
                  <div className="flex space-x-2 flex-wrap">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${encodeURIComponent(tag)}`}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-xs"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
        
        <div className="mt-8">
          <Link
            href="/blog"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            ← 블로그 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}

