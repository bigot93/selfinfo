# GitHub Pages 배포 가이드

## 방법 1: GitHub Actions 사용 (권장)

1. GitHub 리포지토리 생성
2. 코드를 푸시
3. 리포지토리 Settings > Pages에서:
   - Source: "GitHub Actions" 선택
4. `main` 브랜치에 푸시하면 자동으로 배포됩니다

## 방법 2: 수동 배포

만약 GitHub Actions를 사용할 수 없다면:

1. 프로젝트 빌드:
```bash
npm run build
```

2. `out` 폴더의 내용을 `gh-pages` 브랜치에 푸시:
```bash
git subtree push --prefix out origin gh-pages
```

또는:

```bash
npm install -g gh-pages
gh-pages -d out
```

## 리포지토리 이름이 있는 경우

만약 리포지토리 이름이 `blog2`가 아니라면, `next.config.js`에 `basePath`를 추가하세요:

```javascript
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',
  // ...
}
```

