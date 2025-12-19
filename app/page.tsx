import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function Home() {
  const posts = getAllPosts().slice(0, 5) // 최신 5개만 표시
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/blogicon.png" 
              alt="Blog Icon" 
              className="h-32 w-32 object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            환영합니다!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Next.js로 만든 아름다운 블로그입니다
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">최신 글</h2>
          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">아직 작성된 글이 없습니다.</p>
            ) : (
              posts.map(post => (
                <article
                  key={post.slug}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700"
                >
                  <Link href={`/blog/${post.year}/${post.month}/${post.slug}`}>
                    <h3 className="text-2xl font-semibold mb-2 text-primary-600 dark:text-primary-400 hover:underline">
                      {post.title}
                    </h3>
                  </Link>
                  {post.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{post.description}</p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                    <div className="flex items-center space-x-4">
                      <time>
                        {post.date && format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                      </time>
                      <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
        
        {posts.length > 0 && (
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              모든 글 보기 →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

