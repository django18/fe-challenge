# Aspire Card Management App

A modern banking card management application built with **React 19**, **Next.js 15**, and **TypeScript**. This responsive app allows users to manage their debit cards with real-time updates and persistent data storage.

## 🌐 Live Demo

**🚀 [View Live Application](https://fe-challenge-xi.vercel.app/)**

Experience the full application with interactive card management, real-time updates, and responsive design optimized for both desktop and mobile devices.

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
- **Add New Cards**: Modal form with validation
- **Freeze/Unfreeze**: Toggle card status with visual feedback
- **Show/Hide Card Numbers**: Toggle card number visibility for security
- **Transaction History**: View recent transactions per card

### Technical Features

- **Redux Integration**: State management with Redux Toolkit
- **API Architecture**: Mock API with localStorage persistence
- **Real-time Validation**: Form validation with instant feedback
- **Responsive Design**: Mobile-first design that adapts to all screen sizes
- **Reusable Components**: UI components for card details and transactions

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

### Live Production App

The application is currently deployed and accessible at:
**[https://fe-challenge-xi.vercel.app/](https://fe-challenge-xi.vercel.app/)**

### Build for Production

```bash
npm run build
npm start
```

## 🔮 Future Enhancements

The following features are planned for future development:

### Core Banking Features

- **Spending Limits**: Set and manage monthly/weekly spending limits per card
- **Payment Notifications**: Real-time push notifications for transactions
- **Card Statements**: Monthly/yearly statement generation with PDF export
- **Transaction Categories**: Auto-categorize transactions with manual override
- **Budgeting Tools**: Track spending against budget goals

### Advanced Security

- **Two-Factor Authentication**: SMS/Email verification for sensitive actions
- **Biometric Authentication**: Fingerprint/Face ID support for mobile
- **Temporary Card Numbers**: Generate virtual cards for online shopping
- **Transaction Alerts**: Customizable alerts for unusual spending patterns

### User Experience

- **Dark Mode**: Theme toggle for better accessibility
- **Custom Card Designs**: Upload personal images or choose from templates
- **Advanced Search**: Filter transactions by date, amount, merchant, category
- **Export Options**: Export transaction data to CSV/Excel
- **Keyboard Shortcuts**: Power user navigation shortcuts

### Technical Improvements

- **Real Backend Integration**: Connect to actual banking APIs
- **Offline Support**: PWA capabilities with service workers
- **Performance Monitoring**: Real user monitoring and error tracking
- **Testing Suite**: Comprehensive unit and integration tests
- **Animation Library**: Enhanced micro-interactions with Framer Motion

### Mobile Enhancements

- **Native Apps**: React Native versions for iOS/Android
- **Widget Support**: Balance and recent transactions in phone widgets
- **Apple Pay/Google Pay**: Direct integration with mobile wallets
- **QR Code Payments**: Scan-to-pay functionality

### Analytics & Insights

- **Spending Analytics**: Visual charts and spending pattern analysis
- **Financial Health Score**: Credit score monitoring and tips
- **Merchant Insights**: Detailed breakdown of spending by merchant
- **Savings Goals**: Set and track progress toward financial goals

### Administrative Features

- **User Management**: Multi-user support for family accounts
- **Card Sharing**: Shared cards for families with spending controls
- **Transaction Disputes**: Built-in dispute filing and tracking
- **Customer Support**: In-app chat and ticket system

## 📋 Environment

No environment variables required - the app uses mock data and localStorage for persistence.

## 📖 Detailed Implementation

For detailed implementation information, API architecture, and component documentation, see [IMPLEMENTATION.md](./IMPLEMENTATION.md).
