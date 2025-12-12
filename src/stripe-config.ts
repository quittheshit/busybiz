export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  price?: number;
  currency?: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SdN0o22WWIq95RMeiPWG3CJ',
    name: 'Brugerdefineret',
    description: 'Prisen fastsættes individuelt ud fra opgavens omfang, behov og mål. Kontakt os for en kort dialog og et konkret tilbud, der matcher din virksomhed og dit projekt.',
    mode: 'payment'
  },
  {
    priceId: 'price_1SdMy222WWIq95RMiCN3TYcQ',
    name: 'Lokal SEO – Første side / Top 3 på Google',
    description: 'Bliv fundet af lokale kunder, når de søger på Google – for uden lokal SEO bliver din virksomhed ofte overset. Vi får din virksomhed synlig på første side af Google, og blandt top 3, ved relevante lokale søgninger. Arbejdet omfatter on-page SEO på din hjemmeside, optimering af din Google Virksomhedsprofil samt opbygning af lokale citations (andre sider der godkender dit firma). Formålet er bedre placeringer på Google og Google Maps og flere relevante henvendelser fra kunder i dit lokalområde.',
    price: 2999,
    currency: 'DKK',
    mode: 'payment'
  },
  {
    priceId: 'price_1SdMh722WWIq95RMSqAR9ABz',
    name: 'Ny Hjemmeside',
    description: 'Få en professionel og moderne hjemmeside, der præsenterer din virksomhed klart og troværdigt. Designet til at fungere perfekt på mobil, tablet og computer, og nem at udvide senere. Inkluderet: Skræddersyet Moderne Design, Mobilvenlig og Hurtig Indlæsning, Grundlæggende SEO Opsætning med Tekster, Billeder og Kontaktoplysninger. En ideel løsning til virksomheder, der vil se professionelle ud online, uden at betale for mere end nødvendigt.',
    price: 3999,
    currency: 'DKK',
    mode: 'payment'
  }
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}