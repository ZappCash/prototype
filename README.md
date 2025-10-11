# ZappCash DApp 💸

Decentralized payment application for Costa Rica using stablecoins (USDC).

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📱 Features (Prototype)

- ✅ Assets Dashboard
- ✅ Balance Display
- ✅ Quick Actions (Send, Receive, Envelopes, Card)
- ✅ Transaction History
- 🔄 Contact Management (Coming Soon)
- 🔄 Wallet Integration (Coming Soon)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

```
app/
├── assets/          # Assets/Home page
├── layout.tsx       # Root layout
└── page.tsx         # Root redirect

components/
├── assets/          # Assets page components
├── layout/          # Layout components (Header, BottomNav)
└── ui/              # Reusable UI components

lib/
├── data/            # Mock data
├── types/           # TypeScript types
└── utils.ts         # Utility functions
```

## 🎨 Design System

- **Primary Color**: #00FF88 (Green)
- **Secondary Color**: #00CC66
- **Background**: Black (#0a0a0a)
- **Glass Effects**: Backdrop blur with transparency
- **Animations**: Smooth transitions with Framer Motion

## 📝 Notes

This is a **prototype** for testing user engagement and flow. All data is stored in-memory (no backend/database).

---

Made with 💚 by ZappCash Team