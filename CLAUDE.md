# Buffer Gaze

A web application for viewing and managing Buffer posts.

## Project Structure

```
Buffer/
├── web/           # Next.js frontend (React 19, Next.js 16, Tailwind 4)
├── web-tests/     # Playwright e2e tests
└── design/        # Design assets ( ignored by git )
```

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State**: TanStack Query
- **Testing**: Playwright (in web-tests/)
- **Linting/Formatting**: Biome (strict)

## Commands

```bash
# Web app
cd web && npm run dev      # Start dev server
cd web && npm run build    # Production build
cd web && npm run check    # Lint + format with Biome

# Tests
cd web-tests && npm test   # Run Playwright tests
cd web-tests && npm run check  # Lint + format
```

## Conventions

- Use functional components with hooks
- Use `<img>` for images (not `next/image` - too many external domains)
- Use `useRouter` for navigation, not `window.location`
- Keep components small and focused
- Colocate related files

## Git

- **ALWAYS ask before committing or pushing - no exceptions**
- Keep commit messages short (one line)
- No co-authored-by lines
