# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZappCash is a decentralized payment application prototype for Costa Rica using USDC stablecoins. Built with Next.js 15 (App Router) and TypeScript, this is a **prototype** for testing user engagement and flow. All data is stored in-memory (no backend/database).

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### App Router Structure
The app uses Next.js 15 App Router with the following main routes:
- `/assets` - Home page with balance, quick actions, and transactions
- `/send` - Send payment flow
- `/receive` - Receive payment options (QR, share)
- `/envelopes` - Budget envelopes (individual and shared)
- `/recurring` - Recurring payments management
- `/card` - Virtual card display
- `/transactions` - Transaction history with filters

### Layout System
All pages share a common layout pattern:
- `Header` component (sticky top) - Shows user avatar, name, and action icons (QR, Share, Bell)
- `BottomNav` component (fixed bottom) - Main navigation with 4 tabs: Social, Recurring, Assets, Settings
- Glass morphism effects with animated orbs and dot patterns

### Component Organization
```
components/
├── layout/          # Header and BottomNav (app-level)
├── [feature]/       # Feature-specific components (assets, send, receive, etc.)
└── ui/              # Reusable UI primitives (Button, GlassCard, Avatar, etc.)
```

### Data Layer
All data lives in `lib/data/mock.ts`:
- `mockUser` - Current user data (balance, username, address)
- `mockTransactions` - Transaction history
- `mockEnvelopes` - Budget envelopes (individual and shared types)
- `mockRecurringPayments` - Recurring payment setups

TypeScript types are in `lib/types/index.ts`.

### Animation System
Framer Motion animation variants in `lib/animations.ts`:
- `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight` - Directional fades
- `fadeIn` - Simple fade
- `scaleIn`, `rotateIn` - Transform animations
- `staggerContainer` - Sequential child animations

Use these consistently across the app for smooth transitions.

### Design System

**Theme Colors:**
- Primary: `#00FF88` (green)
- Secondary: `#00CC66` (dark green)
- Background: Black (`#0a0a0a`)

**CSS Utilities** (in `app/globals.css`):
- `.glass`, `.glass-strong` - Glassmorphism effects
- `.glass-card`, `.glass-card-strong` - Card components
- `.glass-nav` - Navigation bars
- `.gradient-text`, `.gradient-text-animated` - Text gradients
- `.btn-primary`, `.btn-secondary`, `.btn-ghost` - Button variants
- `.orb-green`, `.orb-dark-green` - Animated background orbs
- `.dot-pattern`, `.grid-pattern` - Background patterns

### PWA Configuration
PWA is enabled via `next-pwa` in [next.config.ts](next.config.ts). Features:
- Service worker registration
- Offline support
- App manifest with icons
- Mobile-first optimizations
- Security headers (HSTS)

## Key Patterns

### Page Structure
All feature pages follow this pattern:
1. Gradient background with animated orbs
2. Dot pattern overlay
3. Header component
4. Main content (max-w-md centered mobile container)
5. BottomNav component

### State Management
Currently using React state within components. No global state management library (Redux, Zustand, etc.) is used yet.

### Styling
- Tailwind CSS 4 for utility classes
- Custom CSS utilities in `globals.css`
- Glass morphism and gradient effects throughout
- Mobile-first responsive design

### Feature Flags
Envelopes support two types:
- `individual` - Personal budget envelopes
- `shared` - Collaborative envelopes with QR code/URL sharing

Recurring payments support two recipient types:
- `username` - Send to @username
- `address` - Send to wallet address

## Notes

- This is a UI prototype - no blockchain integration yet
- All transactions are mock data
- Spanish text is used for user-facing content (Costa Rica market)
- Mobile-first design (max-w-md containers)
- Uses custom Tailwind theme with primary green (#00FF88)
