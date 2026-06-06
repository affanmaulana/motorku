# Risks & Assumptions

## 1. User Behavior Risks
- **Risk:** Users forget to manually input their odometer readings.
  - **Mitigation:** Implement a **Time-Based Estimation Engine**. If inactive for 30 days, the app estimates the mileage and prompts the user to simply confirm it, heavily reducing input friction.

## 2. Technical & Data Risks
- **Risk:** LocalStorage data loss (cache clearing) and messy migration to the cloud.
  - **Mitigation:** Implement a **Versioned Schema** immediately in Phase 1. When cloud sync launches, a built-in migration tool detects local data and securely moves it to the cloud payload.
- **Risk:** Unverifiable logic and scaling issues in the JSON rules.
  - **Mitigation:** Introduce a **Crowdsourced Validation Loop** where users upvote/downvote recommendations. Implement a clear **Legal Disclaimer** clarifying the app is a guide, not an absolute mechanical substitute. Transition rules to modular files by Phase 2.

## 3. Market & Competition Risks
- **Risk:** OEM Apps (Honda/Yamaha) read odometer data directly via Bluetooth and dominate the space.
  - **Mitigation:** Motorku's distinct positioning is **Independence**. OEM apps push users toward expensive official parts and dealers. Motorku is the app for the smart, cost-conscious rider looking to use trusted independent garages and third-party parts safely. OEM apps cannot offer this unbiased flexibility.
