# SEO, GEO & AEO Implementation Plan — BusyBiz.dk

## 📌 Executive Summary
This implementation plan outlines the full technical and content strategy to optimize **BusyBiz** (`busybiz.dk`) for traditional **SEO** (Search Engine Optimization), **AEO** (Answer Engine Optimization), and **GEO** (Generative Engine Optimization / AI Search Engines like ChatGPT, Perplexity, and Google AI Overviews).

### Key Goals:
1. **Multi-Page Architecture:** Expand from a single-page smooth scroll layout to indexed dedicated landing pages (`/hjemmesider`, `/seo`, `/marketing`, `/priser`, `/faq`).
2. **10 AEO/GEO Optimized Danish FAQs:** Implement high-intent Danish Q&A content structured for direct answer extraction by AI models.
3. **Structured Data (JSON-LD Graph):** Inject `FAQPage`, `Service`, `LocalBusiness`, `Organization`, and `BreadcrumbList` schemas.
4. **Sitemap & Gatekeeping Overhaul:** Replace anchor hashes in `sitemap.xml` with clean canonical URLs and update `robots.txt` with explicit AI bot directives (`GPTBot`, `PerplexityBot`, `ClaudeBot`).

---

## 🎯 10 Danish FAQs (AEO & GEO Optimized)

Each FAQ is crafted with a **Direct Answer Block** (1–2 concise sentences ideal for LLM context windows and search engine snippets), followed by an expanded explanation.

| # | Question (Spørgsmål) | Direct Answer (Direct Answer Block for LLM/AEO) |
|---|---|---|
| **1** | **Hvorfor har min lokale virksomhed brug for en professionel hjemmeside?** | En professionel hjemmeside fungerer som dit digitale udstillingsvindue døgnet rundt, der opbygger troværdighed, skaffer nye kunder og adskiller dig fra lokale konkurrenter. Uden en mobiloptimeret og hurtig hjemmeside mister du kunder til konkurrenter med bedre online synlighed. |
| **2** | **Hvor hurtigt kan min virksomhed se resultater af SEO-optimering?** | Lokal SEO og teknisk optimering viser typisk de første målbare resultater på Google inden for 4 til 12 uger. Hvor hurtigt det går afhænger af konkurrencen i din branche og din virksomheds placering i Danmark. |
| **3** | **Hvad koster en ny hjemmeside eller SEO-optimering hos BusyBiz?** | Hos BusyBiz tilbyder vi gennemskuelige løsninger skræddersyet til mindre og mellemstore danske virksomheder med faste priser uden skjulte gebyrer. Vores pakker dækker alt fra hurtig oprettelse af hjemmeside til komplet lokal SEO og automatisering. |
| **4** | **Hvordan hjælper automatisering min virksomhed med at spare tid?** | Automatisering frakobler manuelle opgaver som besvarelse af hyppige spørgsmål, booking af aftaler og opfølgning på tilbud. Det sparer dig for 5-10 timers administrativt arbejde om ugen, så du kan fokusere på dit håndværk eller dit arbejde. |
| **5** | **Kan BusyBiz hjælpe min eksisterende hjemmeside med at få flere kunder?** | Ja, vi udfører en grundig teknisk SEO-analyse og design-optimering af din nuværende hjemmeside for at forbedre din placering på Google og øge konverteringsraten af besøgende til betalende kunder. |
| **6** | **Hvad er forskellen på Google SEO og Google Ads (PPC)?** | Google SEO skaber permanent, organisk synlighed på søgeresultaterne uden at betale pr. klik, mens Google Ads giver øjeblikkelige betalte placeringer, der stopper i det øjeblik budgettet opbruges. En kombination giver ofte de bedste og mest bæredygtige resultater. |
| **7** | **Hvorfor er lokal SEO særlig vigtig for håndværkere, frisører og klinikker?** | Kunder søger efter lokale fagfolk i nærområdet (f.eks. "tømrer i Aarhus" eller "frisør i Odense"). Lokal SEO sikrer, at din virksomhed dominerer kortvisningen (Google Maps) og de øverste søgeresultater i dit lokalområde. |
| **8** | **Hvordan sikrer BusyBiz, at min virksomhed anbefales i ChatGPT og Perplexity (GEO)?** | Vi opbygger din hjemmeside med strukturerede JSON-LD data, klare FAQ-blokke og autoritativt dansk indhold. AI-søgemaskiner bruger netop disse strukturerede kilder til at generere direkte svar og anbefale lokale serviceudbydere. |
| **9** | **Er der langvarig binding på aftaler hos BusyBiz?** | Nej, hos BusyBiz tror vi på gennemskuelige aftaler og tilfredse kunder frem for lange bindinger. Du ejer altid din hjemmeside, dit domæne og dine data 100%. |
| **10** | **Hvordan kommer jeg i gang, og hvor lang tid tager det at bygge en ny hjemmeside?** | Du kontakter os via vores kontaktformular eller på tlf. +45 81 26 07 11 til en uforpligtende snak. En ny professionel hjemmeside klar til lancering tager typisk mellem 1 og 3 uger fra første møde. |

---

## 🛠️ Step-by-Step Execution Plan

### **Phase 1: Multi-Page Routing Architecture**
- [ ] **Route Configuration (`src/App.tsx`):**
  - Implement dynamic route mapping for:
    - `/` — Forside (Home with all highlights & hero)
    - `/hjemmesider` — Hjemmesider & Webdesign
    - `/seo` — SEO & Lokal Søgemaskineoptimering (includes `RankSearchSection`)
    - `/marketing` — Digital Marketing & Automatisering
    - `/priser` — Priser & Pakker (`PricingSection`)
    - `/faq` — Ofte Stillede Spørgsmål (Dedicated FAQ Page)
- [ ] **Reusable Page Components (`src/pages/`):**
  - Create `HjemmesiderPage.tsx`
  - Create `SeoPage.tsx`
  - Create `MarketingPage.tsx`
  - Create `PricingPage.tsx`
  - Create `FaqPage.tsx`
- [ ] **Navigation & Dynamic Scroll Handling:**
  - Update `Header` & `Footer` to navigate seamlessly between routes while preserving smooth scrolling when clicking internal anchors on `/`.
- [ ] **Dynamic Meta Header Manager:**
  - Set unique document titles, meta descriptions, canonical URLs, and OpenGraph tags per route.

---

### **Phase 2: Content & On-Page UI Construction**
- [ ] **Create `FaqSection.tsx` & `FaqPage.tsx`:**
  - Build an interactive accordion component with search/filter capabilities and accessible `<details>`/`<summary>` or React accessible UI.
  - Embed the 10 AEO/GEO optimized Danish FAQs with direct answer styling.
- [ ] **Enhance Landing Page Copy:**
  - Build rich, tangible content for each service page featuring single `<h1>` hierarchy, benefit bullet points, customer conversion drivers, and clear call-to-action (CTA) buttons linking to the contact modal or form.

---

### **Phase 3: In-Code JSON-LD Structured Data Graph**
- [ ] **`FAQPage` JSON-LD Injection:**
  - Dynamically inject `@type: FAQPage` schema containing all 10 FAQ question/answer pairs into `FaqPage.tsx` and `index.html`.
- [ ] **`Service` Schema Array:**
  - Expand `LocalBusiness` schema to include detailed `Service` items for Webdesign, SEO, and Marketing with `areaServed: "Danmark"`.
- [ ] **`BreadcrumbList` & `Organization` Schemas:**
  - Add schema markup for breadcrumbs across subpages for search engine site-links.

---

### **Phase 4: Mapping & Gatekeeping (`sitemap.xml` & `robots.txt`)**
- [ ] **Update `public/sitemap.xml`:**
  - Remove hash URLs (`/#seo`, `/#hjemmesider`, etc.).
  - Add clean, canonical URLs:
    - `https://busybiz.dk/` (priority 1.0)
    - `https://busybiz.dk/hjemmesider` (priority 0.9)
    - `https://busybiz.dk/seo` (priority 0.9)
    - `https://busybiz.dk/marketing` (priority 0.9)
    - `https://busybiz.dk/priser` (priority 0.8)
    - `https://busybiz.dk/faq` (priority 0.8)
- [ ] **Update `public/robots.txt`:**
  - Add explicit permissions for AI Web Crawlers (`GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`).
  - Maintain security blocks on `/admin`, `/api`, `/.env`.

---

### **Phase 5: Verification & Quality Assurance**
- [ ] Test all routes and dynamic metadata updates.
- [ ] Run `npm run typecheck` and `npm run build` to guarantee clean build.
- [ ] Verify JSON-LD schemas using structured data validation rules.

---

## 📅 Status Tracking

| Phase | Milestone | Status |
|---|---|---|
| **Phase 1** | Multi-Page Routing Architecture | ⏳ Pending Approval |
| **Phase 2** | Content & On-Page FAQ Implementation | ⏳ Pending |
| **Phase 3** | In-Code JSON-LD Structured Data | ⏳ Pending |
| **Phase 4** | Sitemap & Robots.txt Overhaul | ⏳ Pending |
| **Phase 5** | QA, Verification & Build Check | ⏳ Pending |
