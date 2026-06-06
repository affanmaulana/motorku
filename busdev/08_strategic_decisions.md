# Strategic Decisions: Addressing Feedback & Blind Spots

This document outlines the strategic decisions made to resolve the critical blind spots and gaps identified in the initial MVP planning.

## 1. Odometer Input Dependency
**Challenge:** Users forgetting to input manual updates.
**Decision:** Implement a **Time-Based Estimation Engine**. If a user hasn't updated their odometer in 30 days, the app estimates their current mileage based on a national average (e.g., 20 km/day) or their historical usage. When they open the app, it prompts: *"We estimate your bike is at 15,400 km. Is this correct?"* This removes friction and gamifies the update process.

## 2. LocalStorage Migration Path
**Challenge:** No transition design from local to cloud storage.
**Decision:** Implement a **Versioned Schema** for localStorage immediately (e.g., `{"version": "1.0", "data": ...}`). In Phase 2, when cloud sync is introduced, the app will detect version 1.0 local data, offer a "Sync to Cloud" prompt, and seamlessly migrate the payload to the cloud backend (e.g., Firebase), marking the local data as synced.

## 3. Expert-Validation & Maintenance
**Challenge:** Unverifiable logic and scaling issues.
**Decision:** Introduce a **Crowdsourced Validation Loop**. Users and mechanics can flag recommendations ("Too early" / "Too late"). We will also add a strict **Legal Disclaimer** stating the app is a guide, not a substitute for professional inspection.

## 4. Go-To-Market Reality
**Challenge:** Zero-budget growth without built-in viral hooks.
**Decision:** Add **In-App Sharing Incentives**. E.g., "Share Motorku on WhatsApp to unlock the Service PDF Export feature." Provide free, downloadable QR code templates so enthusiastic community members can print and stick them at their local workshops themselves.

## 5. Competing with OEM Apps (Honda/Yamaha)
**Challenge:** OEM apps have hardware access and official backing.
**Decision:** Pivot the value proposition from simply "multi-brand" to **"Independent & Cost-Saving."** OEM apps exist to drive users to expensive official dealerships. Motorku's unique value is empowering riders to use cheaper, reliable third-party parts and local independent mechanics safely.

## 6. Sustainable Monetization
**Challenge:** Rp 15k one-time fee cannot sustain cloud costs.
**Decision:** Shift from a cheap one-time fee to a **Low-Cost Annual Subscription** (e.g., Rp 20,000/year) for cloud-sync and multi-vehicle features. Alternatively, rely heavily on the **Affiliate Marketing** revenue model to subsidize free cloud usage, keeping server infrastructure near-zero cost via Edge/Serverless deployments.

## 7. User Input Error Handling
**Challenge:** No undo or cross-validation for history.
**Decision:** Build an **Edit History** feature. Enforce strict validation: new odometer entries cannot be lower than the previous entry unless the user explicitly flags an "Odometer Reset/Replacement."

## 8. PWA Offline Strategy
**Challenge:** Vague caching strategy risking stale rules.
**Decision:** Use a **Stale-While-Revalidate** Service Worker strategy for the JSON rules. The app will immediately load the cached rules for instant offline access, while silently fetching the latest JSON in the background and applying it on the next launch.

## 9. Scalability of the JSON Engine
**Challenge:** A single JSON file will become a monolith.
**Decision:** Transition from a single `serviceData.json` to **Modular JSON Files** (e.g., `honda_matic.json`, `yamaha_sport.json`). In Phase 2, move the rule management to a **Headless CMS** (like Sanity) so non-developers can update intervals safely without touching the codebase.

## 10. Accuracy Metrics
**Challenge:** No measurement of recommendation accuracy.
**Decision:** Add a **Thumbs Up / Thumbs Down** feedback button on every service recommendation. Track the **Recommendation Accuracy Score** as a core KPI to iteratively improve the rule engine without needing manual expert review for every single case.
