# Development Roadmap

## Phase 1: MVP & Core Utility (Current)
*Focus: Delivering immediate value with zero friction.*
- **Core Features:** Odometer input, Modular JSON-based rule engine, service checklists ("Konfirmasi Service").
- **Tech Setup:** React SPA, Tailwind CSS, LocalStorage persistence with a defined Versioned Schema (v1.0).
- **Input Validation:** Strict rules preventing new odometer inputs from being lower than historical entries, complete with an Edit History feature.
- **Milestone:** Functional web app deployed and usable as a PWA on mobile devices.

## Phase 2: Retention & Cloud Sync
*Focus: Preventing data loss and improving user return rates.*
- **Features:** 
  - Time-Based Estimation Engine (estimates mileage if user is inactive for 30 days).
  - Multi-vehicle support.
  - Seamless "Sync to Cloud" migration from local v1.0 data.
  - Transition rule engine management to a Headless CMS (e.g., Sanity) for non-developer updates.
- **Milestone:** Users safely transition from local to cloud without data loss, and rule management scales.

## Phase 3: Ecosystem & Recommendations
*Focus: Guiding users on *where* and *what* to buy.*
- **Features:**
  - Spare parts catalog with estimated pricing and affiliate links.
  - Curated independent workshop recommendations.
  - "Thumbs Up / Thumbs Down" feedback loop on service recommendations.
- **Milestone:** First revenue generated via affiliate clicks and demonstrable accuracy metrics.

## Phase 4: Workshop API Integration (Epic Phase)
*Focus: Closing the loop between digital tracking and physical service.*
- **Features:**
  - Direct booking system with partner independent workshops.
  - Digital stamp/verification from mechanics upon service completion.
- **Milestone:** Motorku becomes an integrated booking and history platform.
