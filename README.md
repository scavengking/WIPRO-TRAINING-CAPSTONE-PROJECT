# WIPRO-TRAINING-CAPSTONE-PROJECT
# 🎭 Wipro Capstone Project 

![Playwright](https://img.shields.io/badge/Playwright-v1.4x+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Node.js-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Jenkins](https://img.shields.io/badge/CI%2FCD-Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![Allure](https://img.shields.io/badge/Reports-Allure-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Progress-blue?style=for-the-badge)



---

## 📌 Project Overview

This is a production-grade test automation framework built as part of the **Wipro Capstone Project** for Enterprise Quality Engineering. It combines advanced Playwright browser automation with **Generative AI tooling** (GitHub Copilot + MCP) to deliver a scalable, maintainable, and intelligent QA ecosystem.

| Detail | Info |
|--------|------|
| 🌐 **Target Site** | [Practice Software Testing](https://practicesoftwaretesting.com) |
| 🔌 **API** | [Swagger REST API](https://api.practicesoftwaretesting.com/api/documentation) — Free |
| 🧪 **Framework** | Playwright v1.4x+ |
| 💻 **Language** | JavaScript (Node.js) |
| 🏗️ **Pattern** | Page Object Model (POM) |
| 📊 **Reports** | Allure Report + Playwright HTML |
| 🤖 **AI Tools** | GitHub Copilot + Model Context Protocol (MCP) |
| ⚙️ **CI/CD** | Jenkins |
| 📦 **Total Tests** | 120+ (8 Services × 15 Cases) |

---

## 🏛️ Project Structure

```
project/
├── project1-pom/                  # Enterprise POM Test Suite
│   ├── pages/                     # Page Object classes
│   │   ├── LoginPage.js
│   │   ├── ProductPage.js
│   │   ├── CartPage.js
│   │   └── ...
│   ├── tests/                     # Test specs per service
│   │   ├── auth.spec.js
│   │   ├── product.spec.js
│   │   ├── cart.spec.js
│   │   └── ...
│   ├── fixtures/                  # Custom Playwright fixtures
│   ├── data/                      # JSON test data files
│   ├── utils/                     # Helper & utility functions
│   ├── playwright.config.js
│   └── package.json
│
├── project2-svg/                  # SVG Graphics Engine
│   ├── tests/
│   ├── playwright.config.js
│   └── package.json
│
├── .env                           # Environment variables (gitignored)
├── .env.example                   # Sample env file
├── .gitignore
└── README.md
```

---

## 🧩 Services & Test Coverage

| # | Service | Test Cases | Coverage |
|---|---------|-----------|----------|
| 1 | 🔐 Authentication | 15 | Login, logout, register, session, password reset, token expiry |
| 2 | 🛍️ Product Catalog | 15 | Search, filter, sort, product detail, pagination, out-of-stock |
| 3 | 🛒 Cart | 15 | Add/remove, quantity update, price calc, coupon, persistence |
| 4 | 👤 User Profile | 15 | Update info, password change, order history, validations |
| 5 | 📦 Address & Shipping | 15 | Add/edit/delete address, shipping methods, default address |
| 6 | 💳 Payment & Checkout | 15 | Full checkout flow, order confirmation, invalid card handling |
| 7 | 🎧 Customer Support | 15 | Contact form, field validation, FAQ, category dropdown |
| 8 | 🔌 API (Internal) | 15 | REST endpoints, schema validation, auth, error codes |
| | **Total** | **120+** | |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- Java (for Allure Reports)

### Installation

```bash
# Clone the repository
git clone https://github.com/scavengking/WIPRO-TRAINING-CAPSTONE-PROJECT
cd project/project1-pom

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Environment Setup

```bash
# Copy the example env file
cp .env.example .env

# Fill in your values
BASE_URL=https://practicesoftwaretesting.com
API_URL=https://api.practicesoftwaretesting.com

```

---

## ▶️ Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# Run in parallel
npm run test:parallel

# Run in debug mode
npm run test:debug

# Run specific service
npx playwright test tests/auth.spec.js

# Run with Allure report generation
npm run test:report
```

---

## 📊 Reports

### Allure Report
```bash
# Generate and open Allure report
npx allure generate allure-results --clean
npx allure open
```

### Playwright HTML Report
```bash
npx playwright show-report
```

---

## 🏗️ Implementation Milestones

| Milestone | Title | Key Deliverables |
|-----------|-------|-----------------|
| M1 | Environment Setup | Workspace, playwright.config.js, package.json scripts |
| M2 | DOM & Locators | getByRole(), form automation, soft assertions, JSON data |
| M3 | Advanced UI | Shadow DOM, iframes, drag-drop, file upload, multi-tab |
| M4 | Reporting | Allure + HTML reports, screenshots, trace viewer, visual regression |
| M5 | API & Mocking | Request context, page.route() mocking, edge-case simulation |
| M6 | AI & MCP | GitHub Copilot, MCP host config, AI-driven test generation |

---

## 🤖 AI & MCP Integration

- **GitHub Copilot** — Used inside VS Code to accelerate Page Object generation, locator refactoring, and test boilerplate creation
- **Model Context Protocol (MCP)** — MCP host configured to expose DOM state and Playwright runtime to an LLM engine for autonomous test generation
- All prompt files and MCP configuration are documented in the `/ai-prompts` folder

---

## ⚙️ CI/CD Pipeline

Jenkins is configured for both local and headless execution:

```
Pipeline → Install Dependencies → Run Tests → Generate Allure Report → Archive Results
```

- Retry logic enabled for flakiness mitigation (`retries: 2` in CI)
- Multi-browser execution: Chromium, Firefox, WebKit
- Allure report auto-generated and archived after each pipeline run

---

## ✅ Capstone Checklist

- [x] Data-driven via external JSON and `.env` — zero hardcoded credentials
- [x] Every test executes independently — parallel-safe
- [x] Locators use `getByRole()` or `data-testid` — no brittle XPaths
- [x] Allure Report with historical trends configured
- [x] Trace viewer traces collected on test failure
- [x] MCP configuration documented with prompt files
- [x] Jenkins pipeline runs in headless mode
- [x] Visual regression with dynamic field masking
- [x] API mocking with edge-case status codes

---

## 👨‍💻 Author

**Krishna**


---

