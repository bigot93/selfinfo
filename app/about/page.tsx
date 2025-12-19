export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About</h1>
        <div className="prose prose-lg dark:prose-invert">
          <p>
            안녕하세요! 이 블로그는 Next.js로 만든 정적 사이트입니다.
          </p>
          <p>
            마크다운으로 글을 작성하고, 태그와 카테고리로 분류할 수 있습니다.
            월별로 글을 관리하며, 아름다운 UI로 콘텐츠를 즐길 수 있습니다.
          </p>
          <h2>기술 스택</h2>
          <ul>
            <li>Next.js 14</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Markdown (remark)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

