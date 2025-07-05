# Aspire Card Management App

A modern banking card management application built with **React 19**, **Next.js 15**, and **TypeScript**. This responsive app allows users to manage their debit cards with real-time updates and persistent data storage.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aspire-card-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build application for production        |
| `npm run start` | Start production server                 |
| `npm run lint`  | Run ESLint for code quality             |

## 🎯 Core Features

### Card Management

- **Interactive Carousel**: Browse through multiple debit cards
- **Add New Cards**: Modal form with comprehensive validation
- **Freeze/Unfreeze**: Toggle card status with visual feedback
- **Show/Hide Card Numbers**: Toggle card number visibility for security
- **Transaction History**: View recent transactions per card

### Technical Features

- **Redux Integration**: Complete state management with Redux Toolkit
- **API Architecture**: Mock API with localStorage persistence
- **Real-time Validation**: Form validation with instant feedback
- **Responsive Design**: Mobile-first design that adapts to all screen sizes
- **Accordion Components**: Reusable UI components for card details and transactions

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript with full type safety
- **Styling**: Tailwind CSS 4.0 with custom design tokens
- **State Management**: Redux Toolkit with async thunks
- **Icons**: Lucide React and custom SVG icons
- **Storage**: localStorage with automatic persistence

## 📱 Application Structure

```
src/
├── app/page.tsx              # Main application page
├── components/
│   ├── Card/                 # Card-related components
│   ├── Modal/                # Modal components
│   ├── ui/                   # Reusable UI components
│   └── icons/                # Icon components
├── hooks/                    # Custom React hooks
├── store/                    # Redux store and slices
├── services/                 # API services
├── types/                    # TypeScript interfaces
└── utils/                    # Utility functions
```

## 🎨 Sample Data

The application comes pre-loaded with 4 sample cards:

- **Mark Henry** (Tech enthusiast)
- **Sarah Johnson** (Travel lover)
- **Michael Brown** (Family man)
- **Emily Davis** (Fashion enthusiast)

Each card includes realistic transaction history with different merchants and categories.

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically with zero configuration

### Deploy to Netlify

1. Build: `npm run build`
2. Upload the `.next` folder
3. Configure Next.js redirects

## 📋 Environment

No environment variables required - the app uses mock data and localStorage for persistence.

## 📖 Detailed Implementation

For comprehensive implementation details, API architecture, and component documentation, see [IMPLEMENTATION.md](./IMPLEMENTATION.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

---

**Built with ❤️ using React 19 and Next.js 15**
