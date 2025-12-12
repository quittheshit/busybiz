export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  price_per_unit?: number;
  currency_symbol: string;
  checkoutUrl: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_TaXm2PawSXhMmc',
    name: 'Ny Hjemmeside',
    description: 'Få en professionel og moderne hjemmeside, der præsenterer din virksomhed klart og troværdigt. Designet til at fungere perfekt på mobil, tablet og computer, og nem at udvide senere. Inkluderet: Skræddersyet Moderne Design, Mobilvenlig og Hurtig Indlæsning, Grundlæggende SEO Opsætning med Tekster, Billeder og Kontaktoplysninger. En ideel løsning til virksomheder, der vil se professionelle ud online, uden at betale for mere end nødvendigt.',
    price_per_unit: 3999.00,
    currency_symbol: 'kr',
    checkoutUrl: 'https://buy.stripe.com/14AaEP43Z2Mx1J2gIcgA800'
  },
  {
    id: 'prod_TaY4maI2H9O4om',
    name: 'Lokal SEO – Første side / Top 3 på Google',
    description: 'Bliv fundet af lokale kunder, når de søger på Google – for uden lokal SEO bliver din virksomhed ofte overset. Vi får din virksomhed synlig på første side af Google, og blandt top 3, ved relevante lokale søgninger. Arbejdet omfatter on-page SEO på din hjemmeside, optimering af din Google Virksomhedsprofil samt opbygning af lokale citations (andre sider der godkender dit firma). Formålet er bedre placeringer på Google og Google Maps og flere relevante henvendelser fra kunder i dit lokalområde.',
    price_per_unit: 2999.00,
    currency_symbol: 'kr',
    checkoutUrl: 'https://buy.stripe.com/6oU4grgQL9aVgDW77CgA802'
  },
  {
    id: 'prod_TaY7yhzKC1nLmD',
    name: 'Brugerdefineret',
    description: 'Prisen fastsættes individuelt ud fra opgavens omfang, behov og mål. Kontakt os for en kort dialog og et konkret tilbud, der matcher din virksomhed og dit projekt.',
    currency_symbol: 'kr',
    checkoutUrl: 'https://buy.stripe.com/8x2aEPasn9aV73majOgA801'
  }
];