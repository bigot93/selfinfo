import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  category: string
  description?: string
  content: string
  year: string
  month: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  category: string
  description?: string
  year: string
  month: string
}

// 모든 포스트 가져오기
export function getAllPosts(): PostMeta[] {
  const posts: PostMeta[] = []
  
  // content/posts 디렉토리 구조: YYYY/MM/post-name.md
  const years = fs.readdirSync(postsDirectory)
  
  years.forEach(year => {
    const yearPath = path.join(postsDirectory, year)
    if (!fs.statSync(yearPath).isDirectory()) return
    
    const months = fs.readdirSync(yearPath)
    
    months.forEach(month => {
      const monthPath = path.join(yearPath, month)
      if (!fs.statSync(monthPath).isDirectory()) return
      
      const files = fs.readdirSync(monthPath)
      
      files.forEach(file => {
        if (!file.endsWith('.md')) return
        
        const filePath = path.join(monthPath, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        
        const slug = file.replace(/\.md$/, '')
        
        posts.push({
          slug,
          title: data.title || slug,
          date: data.date || '',
          tags: data.tags || [],
          category: data.category || 'Uncategorized',
          description: data.description || '',
          year,
          month,
        })
      })
    })
  })
  
  // 날짜순으로 정렬 (최신순)
  return posts.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}

// 특정 포스트 가져오기
export async function getPostBySlug(year: string, month: string, slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, year, month, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .process(content)
  
  const contentHtml = processedContent.toString()
  
  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    tags: data.tags || [],
    category: data.category || 'Uncategorized',
    description: data.description || '',
    content: contentHtml,
    year,
    month,
  }
}

// 태그별 포스트 가져오기
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter(post => post.tags.includes(tag))
}

// 카테고리별 포스트 가져오기
export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(post => post.category === category)
}

// 모든 태그 가져오기
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

// 모든 카테고리 가져오기
export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  
  posts.forEach(post => {
    categories.add(post.category)
  })
  
  return Array.from(categories).sort()
}

// 월별 포스트 가져오기
export function getPostsByMonth(year: string, month: string): PostMeta[] {
  return getAllPosts().filter(post => post.year === year && post.month === month)
}

// 모든 연도-월 조합 가져오기
export function getAllMonths(): { year: string; month: string }[] {
  const posts = getAllPosts()
  const months = new Set<string>()
  
  posts.forEach(post => {
    months.add(`${post.year}-${post.month}`)
  })
  
  return Array.from(months)
    .map(ym => {
      const [year, month] = ym.split('-')
      return { year, month }
    })
    .sort((a, b) => {
      if (a.year !== b.year) return b.year.localeCompare(a.year)
      return b.month.localeCompare(a.month)
    })
}

