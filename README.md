# thirdweb AI Mini App

A beautiful, simple AI chat mini app built with Next.js and thirdweb AI. This mini app provides an amazing chat interface powered by thirdweb's AI service, designed to run as a Base Mini App.

## ✨ Features

- 🤖 **AI Chat Interface** - Powered by thirdweb AI
- 🎨 **Beautiful UI** - Clean, modern design with smooth animations
- 📱 **Mini App Ready** - Built for Base Mini App ecosystem
- ⚡ **Fast & Responsive** - Optimized for mobile and desktop
- 🔒 **Secure** - Built with OnchainKit for secure wallet integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- A thirdweb API key
- Base Mini App environment (optional for development)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd thirdweb-ai-mini-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your thirdweb API key to `.env.local`:
```env
THIRDWEB_API_KEY=your_thirdweb_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🔧 Configuration

### Environment Variables

- `THIRDWEB_API_KEY` - Your thirdweb API key (required)
- `NEXT_PUBLIC_URL` - Your app's URL (for production)

### Mini App Configuration

The app is configured in `minikit.config.ts` for Base Mini App deployment. You can customize:

- App name and description
- Icons and splash screens
- Categories and tags
- Webhook URLs

## 🏗️ Tech Stack

- **Framework**: Next.js 15
- **UI Library**: Mantine
- **Icons**: Tabler Icons
- **Blockchain**: OnchainKit, Wagmi, Viem
- **AI Service**: thirdweb AI
- **Styling**: Custom CSS with animations

## 📱 Mini App Features

- **Wallet Integration**: Seamless wallet connection via OnchainKit
- **AI Chat**: Real-time AI conversations powered by thirdweb
- **Responsive Design**: Works perfectly on mobile and desktop
- **Smooth Animations**: Beautiful transitions and effects
- **Error Handling**: Robust error handling and user feedback

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy as Base Mini App

1. Configure your mini app settings in `minikit.config.ts`
2. Deploy to your preferred hosting platform
3. Submit to Base Mini App directory

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [thirdweb](https://thirdweb.com) for the amazing AI service
- [OnchainKit](https://docs.base.org/onchainkit) for blockchain integration
- [Mantine](https://mantine.dev) for the beautiful UI components
- [Base](https://base.org) for the Mini App platform

---

Built with ❤️ for the Base ecosystem