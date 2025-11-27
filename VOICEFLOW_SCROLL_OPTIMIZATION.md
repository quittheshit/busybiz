# Voiceflow Mobile Scroll Animation Optimization

## Overview
This implementation disables Voiceflow chatbot animations specifically during mobile scrolling to improve performance and user experience.

## Implementation Details

### 1. CSS Modifications (`src/index.css`)
Added CSS rules that disable animations when the `.mobile-scrolling` class is applied:

```css
#voiceflow-chat.mobile-scrolling * {
  animation: none !important;
  transition: none !important;
}

#voiceflow-chat.mobile-scrolling iframe *,
#voiceflow-chat.mobile-scrolling .vfrc-widget *,
#voiceflow-chat.mobile-scrolling .vfrc-chat * {
  animation-play-state: paused !important;
  transition-duration: 0ms !important;
  will-change: auto !important;
}

#voiceflow-chat.mobile-scrolling button[data-testid="launcher"] {
  transition: none !important;
  transform: none !important;
}
```

### 2. JavaScript Handler (`src/voiceflowScrollHandler.ts`)
Created a TypeScript module that:

- **Detects mobile devices**: Only triggers on phones (≤768px width) with mobile user agents
- **Monitors scroll events**: Listens for scroll, touchstart, touchend, and touchmove
- **Toggles animation state**: Adds/removes `.mobile-scrolling` class
- **Debounces re-enabling**: Waits 150ms after scrolling stops before re-enabling animations
- **Uses passive listeners**: Improves scroll performance

### 3. Integration (`src/main.tsx`)
The scroll handler is initialized when the app loads and automatically waits for the Voiceflow widget to be available.

## Features

### Mobile Detection
- User agent detection for mobile devices
- Screen width check (≤768px = phone)
- Tablets and desktops are unaffected

### Performance Optimizations
- Passive event listeners for better scroll performance
- Debounced animation re-enabling (150ms delay)
- Minimal DOM queries with caching
- No performance impact on desktop devices

### Animation Control
Disabled during scroll:
- Message bubble animations
- Typing indicators
- Fade-in/fade-out effects
- Slide transitions
- CSS transforms and transitions
- Launcher button hover effects

### Accessibility
- Maintains full chatbot functionality
- Respects user's reduced-motion preferences (existing CSS)
- No impact on keyboard navigation or screen readers

## Browser Compatibility
- Works with all modern browsers
- Gracefully degrades if JavaScript is disabled
- Compatible with iOS Safari, Chrome Mobile, Firefox Mobile

## Testing
To test the implementation:

1. Open the site on a mobile device (or use browser DevTools mobile emulation)
2. Open the Voiceflow chat widget
3. Scroll the page - animations should pause
4. Stop scrolling - animations should resume after 150ms

## Performance Considerations
- Zero overhead on desktop devices
- Minimal JavaScript execution during scroll
- Uses efficient CSS class toggling
- No layout recalculations or reflows

## Future Enhancements
If needed, you can adjust:
- The debounce delay (currently 150ms)
- The mobile breakpoint (currently 768px)
- Which specific animations to disable
- Add tablet detection if needed
