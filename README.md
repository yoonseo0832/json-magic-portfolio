# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e8964c7c-4a87-40b4-af09-6999d354370a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e8964c7c-4a87-40b4-af09-6999d354370a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### GitHub Pages 자동 배포

이 프로젝트는 GitHub Actions를 사용하여 자동 배포됩니다.

1. **GitHub Pages 설정**:
   - Repository Settings > Pages로 이동
   - Source를 "GitHub Actions"로 설정
   - Environment에서 "github-pages" 환경이 자동으로 생성됩니다

2. **자동 배포**:
   - `main` 브랜치에 코드를 push하면 자동으로 배포됩니다
   - 배포 상태는 Actions 탭에서 확인할 수 있습니다
   - 수동 배포는 Actions 탭에서 "Deploy Portfolio to Pages" 워크플로우를 실행할 수 있습니다

3. **배포 URL**:
   - 배포 완료 후 `https://[username].github.io/json-magic-portfolio/`에서 확인 가능
   - 첫 배포는 보통 5-10분 정도 소요됩니다

4. **배포 문제 해결**:
   - 배포 실패 시 Actions 탭에서 로그를 확인하세요
   - 문제가 지속되면 Issues 탭에서 배포 문제를 신고해주세요

### 수동 배포

```bash
# 프로덕션 빌드
npm run build:prod

# 로컬에서 미리보기
npm run preview:prod
```

### Lovable 배포

기존 Lovable 플랫폼을 통한 배포도 가능합니다:
Simply open [Lovable](https://lovable.dev/projects/e8964c7c-4a87-40b4-af09-6999d354370a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
