# System Interface // Ayodeji B

> **Status**: ONLINE  
> **Version**: 1.0.0 (Stable)  
> **Theme**: Cyberpunk / High-Performance Infrastructure

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)

A high-performance, immersive portfolio designed to reflect the identity of a **Systems Engineer**. This project eschews traditional portfolio layouts for a "System Interface" aesthetic—featuring command palettes, terminal logs, and hardware telemetry visualizations.

## ⚡ Key Modules

- **Command Palette**: A fully functional, keyboard-driven interface (`Cmd+K`) to navigate the system. Features memoized filtering and real-time search.
- **Hardware Manifest**: A Bento Grid layout showcasing live infrastructure specs vs. compact visualizations.
- **System Journal**: A simulated live activity feed showing Docker builds, server logs, and network handshakes.
- **Glitch Effects**: Powered by `react-powerglitch` for that unstable, cyberpunk visual signature.
- **Reduced Motion**: Automatically disables heavy animations in `development` mode to preserve developer sanity.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Variables
- **Animation**: Framer Motion, React PowerGlitch
- **Icons**: Tabler Icons
- **Fonts**: Geist Sans & Geist Mono
- **Forms**: React Hook Form (Custom implementation) + Resend API

## 🚀 Initialization

To boot this system locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/deji-dd/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Environment Configuration**:
   Create a `.env.local` file for the Contact form (email transmission):

   ```env
   RESEND_API_KEY=re_123456789
   ```

4. **Execute Start Sequence**:

   ```bash
   pnpm dev
   ```

   Access the interface at `http://localhost:3000`.

## 📂 Project Structure

```
├── app/               # Next.js App Router
│   ├── api/           # Serverless functions (Email)
│   ├── globals.css    # Global styles & Tailwind directives
│   └── layout.tsx     # Root layout & Metadata
├── components/        # React Components
│   ├── ui/            # Reusable UI primitives (Bento, Inputs)
│   └── ...            # Feature components (ActivityFeed, Hero)
└── public/            # Static assets
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

_Transmission End. Signal Lost._
