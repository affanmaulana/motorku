# Project Overview: Motorku (Motorcare)

## 1. Concept & Vision
Motorku is a smart, accessible motorcycle maintenance guide application tailored specifically for operational conditions in Indonesia, such as tropical climates and heavy traffic (stop-and-go). It acts as a digital service dictionary, translating complex technical requirements into simple, actionable maintenance steps for laypeople.

## 2. Target Audience
- **Primary:** Everyday motorcycle owners in Indonesia (Honda, Yamaha, Suzuki users) who lack deep technical knowledge.
- **Secondary:** Families or individuals managing maintenance schedules for multiple household vehicles.

## 3. Core Value Proposition
- **Independent & Cost-Saving:** Unlike OEM apps (Honda/Yamaha) that drive users to expensive official dealerships, Motorku empowers riders to confidently use cheaper, reliable third-party parts and local independent mechanics.
- **Expert-Validated Logic:** Service intervals are based on deep technical data, tailored to real-world Indonesian riding conditions.
- **Simplicity & Engagement:** High usability through conversational Indonesian language, augmented by a "Time-Based Estimation Engine" that proactively estimates mileage to reduce the burden of manual input.
- **Frictionless Experience:** No login required initially, instantaneous load times, and persistent data via local storage.

## 4. Technical Architecture
- **Frontend:** React 19 + Vite (Single Page Application).
- **Styling:** Tailwind CSS for a premium, responsive design with Light/Dark mode support.
- **Routing:** React Router v6.
- **Data Persistence:** Native `localStorage` using a strict Versioned Schema (e.g., v1.0) to allow seamless future migration to the cloud.
- **Data Source:** Modular JSON database files (e.g., `honda_matic.json`, `yamaha_sport.json`) for scalable interval rules.
- **Offline Capability (PWA):** Implements a "Stale-While-Revalidate" Service Worker strategy, ensuring instant offline access to rules while silently updating them in the background.
