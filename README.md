# STASHER // ENTERPRISE_V2.1
### Institutional-Grade Cold Custody Visualization Platform

[![Architecture: Clean](https://img.shields.io/badge/Architecture-Clean-00f2fe?style=for-the-badge&logo=architecture)](https://en.wikipedia.org/wiki/Multitier_architecture)
[![Tech: React](https://img.shields.io/badge/Tech-React-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Design: Cyber--Secure](https://img.shields.io/badge/Design-Cyber--Secure-7000ff?style=for-the-badge)](https://stasher.io)

---

## 🔘 OVERVIEW

Stasher-Enterprise is a high-performance, institutional-grade landing page designed to showcase the next generation of hardware-isolated multi-chain custody. The platform is built with a **Cyber-Secure** design language, emphasizing air-gap isolation, quorum compliance, and enterprise scalability.

## 🏛️ ARCHITECTURAL CORE (CLEAN/DDD)

The project implements a rigorous **Clean Architecture** pattern, ensuring absolute separation of concerns and decoupling from the UI framework to support long-term institutional scalability.

### 1. Domain Layer (`src/domain/`)
The "Heart" of the system. Contains pure business logic and models.
- **`models/`**: TypeScript interfaces defining the `SiteContent` and `InstitutionalMetric` structures.
- **`constants.ts`**: Immutable system configuration and deployment metadata.

### 2. Infrastructure Layer (`src/infrastructure/`)
Handles data persistence and external integrations.
- **`repositories/ContentRepository.ts`**: A unified access point for all site data, currently serving localized institutional English copy with a roadmap for API-driven dynamic updates.

### 3. Application Layer (`src/application/`)
Orchestrates low-level logic and global system behaviors.
- **`hooks/`**: Includes `useCursorGlow` for interactive lighting and `useTextScramble` for technical heading animations.

### 4. Presentation Layer (`src/presentation/`)
The high-density HUD UI, modularized into feature-based packages.
- **Feature Modules**: Organized under `features/stasher`, encapsulating all logic, styles, and sub-components for the product showcase.
- **Composition Root**: Final assembly occurs in `App.tsx`, where dependencies from the Infrastructure layer are injected into the Presentation features, ensuring zero direct dependency on data sources.

## 📡 PREMIUM VISUAL SYSTEMS

The platform utilizes a customized **High-Density HUD System** to provide an immersive technical experience:

- **HUD Overlays**: Fixed corner status bars mimicking real-time system metrics (Uptime, Core Load, Geospatial Tracking).
- **Technical Radar**: Animated orbital rings and data-stream background interactions signifying the "Perimeter Defense."
- **Institutional Decoders**: `useTextScramble` animations on major headings to emphasize cryptographic processing.
- **3D Interactive Graphics**: Feature cards with hardware-accelerated 3D tilt and glare effects.

## 🛠️ TECHNICAL SPECIFICATIONS

- **Build Tool**: Vite (Next-gen frontend tooling)
- **Typing**: Strict TypeScript with `verbatimModuleSyntax: true`
- **Styling**: Modern Vanilla CSS (No large frameworks, maximum performance)
- **HMR**: Fast Hot Module Replacement for rapid development

## ⚙️ DEVELOPMENT & DEPLOYMENT

```bash
# Clone the vault
git clone https://github.com/stasher/stasher-enterprise.git

# Initialize environment
npm install

# Deploy local HUD instance
npm run dev

# Compile for production release
npm run build
```

---
> [!IMPORTANT]
> This platform is optimized for institutional review. All technical "secrets" (TGKF, etc.) are abstracted behind high-level value propositions (Hardened MPC, Air-Gap, etc.) to maintain professional confidentiality.

---
*© 2026 STASHER_ENTERPRISE // CONFIDENTIAL // END_OF_TRANSMISSION*
