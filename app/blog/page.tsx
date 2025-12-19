import Link from 'next/link'
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function Blog() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 사이드바 */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">카테고리</h2>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <Link
                      href={`/blog/category/${encodeURIComponent(category)}`}
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">태그</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm"
                    >
                      #{tag}
                    </Link>
                ))}
              </div>
            </div>
          </aside>
          
          {/* 메인 콘텐츠 */}
          <main className="flex-1">
            {posts.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">아직 작성된 글이 없습니다.</p>
            ) : (
              <div className="space-y-6">
                {posts.map(post => (
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
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

