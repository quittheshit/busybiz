import { FAQ_DATA } from '../pages/FaqPage';

export const getGlobalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://busybiz.dk/#organization',
  'name': 'BusyBiz',
  'legalName': 'BusyBiz',
  'url': 'https://busybiz.dk',
  'logo': {
    '@type': 'ImageObject',
    'url': 'https://busybiz.dk/favicon-512x512.png',
    'width': 512,
    'height': 512
  },
  'image': {
    '@type': 'ImageObject',
    'url': 'https://busybiz.dk/favicon-512x512.png',
    'width': 512,
    'height': 512
  },
  'description': 'Professionel hjemmeside design, SEO optimering og marketing automatisering til lokale firmaer i Danmark',
  'telephone': '+45-81-26-07-11',
  'email': 'miklhagstroem@gmail.com',
  'address': {
    '@type': 'PostalAddress',
    'addressCountry': 'DK',
    'addressRegion': 'Danmark'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'addressCountry': 'DK'
  },
  'areaServed': {
    '@type': 'Country',
    'name': 'Danmark'
  },
  'priceRange': '$$',
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '17:00'
    }
  ],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'BusyBiz Ydelser til Lokale Virksomheder',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Hjemmeside Design & Webudvikling',
          'description': 'Mobiloptimerede og lynhurtige hjemmesider til danske virksomheder.',
          'serviceType': 'Web Design'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Lokal SEO & Google Optimering',
          'description': 'Top-placeringer på Google og Google Maps i dit lokalområde.',
          'serviceType': 'Search Engine Optimization'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Digital Marketing & Automatisering',
          'description': 'Automatiseret kundeservice, SMS-opfølgning og leadgenerering.',
          'serviceType': 'Digital Marketing'
        }
      }
    ]
  }
});

export const getFaqPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': FAQ_DATA.map(faq => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': `${faq.directAnswer} ${faq.fullAnswer}`
    }
  }))
});

export const getBreadcrumbSchema = (pageName: string, canonicalPath: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Forside',
      'item': 'https://busybiz.dk/'
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': pageName,
      'item': `https://busybiz.dk${canonicalPath}`
    }
  ]
});

export const getServiceSchema = (serviceName: string, description: string, canonicalPath: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': serviceName,
  'description': description,
  'provider': {
    '@type': 'LocalBusiness',
    'name': 'BusyBiz',
    'url': 'https://busybiz.dk'
  },
  'areaServed': {
    '@type': 'Country',
    'name': 'Danmark'
  },
  'url': `https://busybiz.dk${canonicalPath}`
});
