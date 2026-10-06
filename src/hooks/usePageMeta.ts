import { useEffect } from 'react';

interface MetaOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
}

export function usePageMeta({ title, description, canonicalPath = '', keywords }: MetaOptions) {
  useEffect(() => {
    // Update Title
    const fullTitle = `${title} | BusyBiz`;
    document.title = fullTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

    // Update Canonical URL
    const canonicalUrl = `https://busybiz.dk${canonicalPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }

    // Update Keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Scroll to top on page route change unless there's a hash
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [title, description, canonicalPath, keywords]);
}
