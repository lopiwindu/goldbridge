# GoldBridge - African Mineral Tokenization Platform

GoldBridge is a blockchain-based platform for tokenizing verified African mineral assets as Real-World Asset (RWA) tokens on the Base blockchain.

## Features

- 🪙 **Real-World Asset Tokenization**: Convert verified gold, platinum, and copper batches into tradeable NFT tokens
- 🔐 **Blockchain Security**: Built on Base (Ethereum L2) for secure and transparent transactions
- 👥 **Dual Dashboard**: Separate interfaces for investors and miners
- 📊 **Portfolio Management**: Track investments and monitor market performance
- ✅ **Verification System**: Multi-step verification process for mineral batches
- 🌍 **African Focus**: Supporting African mining operations and investors

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Blockchain**: Hedera Hashgraph (HBAR)
- **Wallet**: HashPack (Hedera wallet)
- **UI**: Tailwind CSS, Radix UI, shadcn/ui
- **Farcaster Integration**: Miniapp SDK
- **State Management**: TanStack Query
- **Charts**: Recharts

## 🚧 Development Mode

**Important:** HashPack wallet extension **tidak bisa digunakan di localhost** karena security restrictions.

### Development (Test Account Mode)

- ✅ Uses simulated test accounts (`0.0.xxxxxx`)
- ✅ Perfect untuk testing UI/UX
- ✅ No real wallet needed
- ❌ Cannot sign real transactions

### Production (Real Wallet)

- ✅ Deploy ke HTTPS domain (e.g., Vercel)
- ✅ HashPack extension akan bekerja
- ✅ Real wallet connections
- ✅ Sign real transactions

📖 **Read:** [HASHPACK_DEVELOPMENT.md](./HASHPACK_DEVELOPMENT.md) untuk detail lengkap.

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm
- HashPack wallet (for production only)
  - Download: https://www.hashpack.app/
  - Works on Chrome, Brave, Edge

**Note:** HashPack extension not needed for local development (uses test accounts).

### Installation

1. Clone the repository:

```bash
git clone https://github.com/lopiwindu/goldbridge.git
cd goldbridge
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

Create a `.env.local` file in the root directory and add your OnchainKit API key:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-api-key-here
NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID=goldbridge-rwa-platform
```

You can get your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/).

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
goldbridge/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── config/            # Configuration files
│   │   ├── dashboard/         # Investor dashboard
│   │   ├── miner/            # Miner dashboard
│   │   ├── types/            # TypeScript types
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── providers.tsx     # App providers
│   ├── components/           # React components
│   │   ├── ui/              # UI components (shadcn)
│   │   ├── FarcasterWrapper.tsx
│   │   └── navigation.tsx
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── public/                  # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Configuration

### OnchainKit Setup

The app uses OnchainKit for blockchain interactions. Update the configuration in `src/app/config/onchainkit.ts`:

```typescript
export const ONCHAINKIT_PROJECT_ID = "goldbridge-rwa-platform";
export const ONCHAINKIT_API_KEY =
  process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || "";
```

### Wallet Configuration

The app is configured to use Coinbase Smart Wallet. The configuration is in `src/app/providers.tsx`.

## Features

### For Investors

- Browse available tokenized mineral batches
- Purchase RWA tokens backed by physical minerals
- Track portfolio performance
- View transaction history
- Monitor market trends

### For Miners

- Register mining operations
- Upload mineral batch information
- Submit for verification
- Track tokenization progress
- Monitor revenue from token sales

## Smart Wallet Integration

GoldBridge uses Coinbase Smart Wallet for seamless onboarding:

- No seed phrases required
- Email-based authentication
- Gas sponsorship (where available)
- Built-in security features

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID`: Project identifier

## Deployment

The app can be deployed to Vercel, Netlify, or any platform that supports Next.js:

```bash
npm run build
```

For Vercel:

```bash
vercel
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- Built with [OnchainKit](https://onchainkit.xyz/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Deployed on [Base](https://base.org/)
- Farcaster integration via [Miniapp SDK](https://docs.farcaster.xyz/)
