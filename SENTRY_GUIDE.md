# Sentry Setup Guide for Busybiz

This guide provides a quick, on-point workflow to set up Sentry for error reporting and user feedback loops.

## 1. Create Account & Project
1. Go to [sentry.io](https://sentry.io/) and sign up.
2. Click **Create Project**.
3. Select your platform (e.g., React, Next.js, or Browser JavaScript).
4. Give your project a name (e.g., `busybiz-web`) and create it.
5. Note down your **DSN (Data Source Name)** from the setup page.

## 2. Install Sentry SDK
Run the following in your terminal to install the Sentry SDK. (Adjust based on your exact framework, e.g., `@sentry/react` or `@sentry/nextjs`):
```bash
npm install @sentry/browser @sentry/tracing
# OR if using React/Next.js:
# npm install @sentry/react
# npx @sentry/wizard@latest -i nextjs
```

## 3. Initialize Sentry
In your app's entry file (e.g., `index.ts`, `main.tsx`, or `_app.tsx`):
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN_HERE",
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions (reduce in production)
  // Session Replay (Optional but recommended)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0, 
});
```

## 4. Test Error Reporting
Trigger a test error somewhere in your UI to ensure Sentry catches it:
```typescript
<button onClick={() => { throw new Error("Sentry Test Error!"); }}>
  Break the world
</button>
```
*Check your Sentry dashboard to see if the issue appears.*

## 5. Enable User Feedback Loops
Sentry offers a built-in feedback widget that users can fill out when they encounter an error or simply to provide general feedback.

To enable the Crash-Report feedback dialog when an error occurs:
```typescript
try {
  // your code that might throw
} catch (error) {
  Sentry.captureException(error);
  Sentry.showReportDialog();
}
```
*(Alternatively, you can use the newer Sentry User Feedback widget via `@sentry/browser`'s Feedback integration).*
