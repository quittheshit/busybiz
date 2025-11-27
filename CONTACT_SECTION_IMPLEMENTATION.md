# Contact Section with Chatbot Integration

## Summary
Removed the non-functioning floating Voiceflow widget and replaced it with a professional contact section at the bottom of the page that includes a dedicated chatbot button.

## What Was Changed

### 1. Removed Old Voiceflow CSS
- Deleted all the complex CSS rules for the floating widget that wasn't working on mobile
- Removed `voiceflowScrollHandler.ts` and its imports from `main.tsx`

### 2. Added New Contact Section
**Location**: Between the Services section and Footer in `App.tsx`

**Features**:
- Two-column layout (info side + form side)
- Contact information cards with email, phone, and response time
- Prominent chatbot CTA box with "Start Chat" button
- Professional contact form with name, email, subject, and message fields
- Success/error message display
- Fully responsive design

### 3. Chatbot Integration

**The Voiceflow embed code is already in `/index.html` (lines 16-31)**:
```html
<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '69280470415f7f18f623a97e' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>
```

**How it works**:
1. The script loads automatically when the page loads
2. The chatbot widget initializes in the background
3. When users click the "Start Chat" button in the contact section, it opens the Voiceflow chat interface
4. The button uses `window.voiceflow.chat.open()` to trigger the chat

### 4. Design Features

**Contact Info Side**:
- Headline and description
- Three contact detail cards (email, phone, response time)
- Gradient chatbot CTA box with button
- Icons for visual appeal

**Contact Form Side**:
- White card with shadow
- Standard form fields
- Inline success/error messages
- Submit button with loading state
- Uses existing Supabase edge function for sending emails

**Responsive Design**:
- Desktop: Two-column grid layout
- Tablet (≤968px): Single column, stacked layout
- Mobile (≤640px): Optimized spacing and font sizes

### 5. Styling

All styles added to `src/index.css` starting at line 1228:
- `.contact-section` - Main container
- `.contact-container` - Grid layout
- `.contact-info-side` - Left column
- `.contact-form-side` - Right column (form)
- `.chatbot-cta` - Chatbot call-to-action box
- `.chatbot-button` - Opens the Voiceflow chat
- Form element styles with focus states
- Responsive media queries

### 6. TypeScript Types

Added Window interface types in `src/vite-env.d.ts` for Voiceflow:
```typescript
interface Window {
  voiceflow?: {
    chat: {
      load: (config: any) => void;
      open: () => void;
      close: () => void;
    };
  };
}
```

## User Experience

1. **Desktop Users**: See a beautiful two-column contact section with the chatbot option prominently displayed on the left
2. **Mobile Users**: See a stacked layout that's easy to scroll through, with the chatbot button easily accessible
3. **Chatbot Users**: Click the "Start Chat" button to instantly open the Voiceflow chatbot for immediate assistance
4. **Form Users**: Can fill out the traditional contact form to send an email

## Benefits

1. **Works on All Devices**: No more mobile display issues
2. **Clear Call-to-Action**: Users can easily find and access the chatbot
3. **Professional Appearance**: Matches the site's design language
4. **Multiple Contact Options**: Users can choose between chatbot, form, or direct contact
5. **Better UX**: No floating elements that might interfere with browsing

## Testing

Test the following:
1. Desktop view: Two-column layout displays correctly
2. Mobile view: Single column, stacked layout
3. "Start Chat" button: Opens the Voiceflow chatbot
4. Contact form: Submits successfully and shows confirmation
5. All links (email, phone) work correctly
6. Form validation works (required fields)
