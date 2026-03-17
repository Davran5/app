import { Helmet } from 'react-helmet-async';
import {
  type ProductStructuredDataInput,
  useProductJsonLd,
} from '../lib/structuredData';
import { getCspNonce } from '../lib/runtimeConfig';

export default function ProductStructuredData(props: ProductStructuredDataInput) {
  const jsonLd = useProductJsonLd(props);
  const cspNonce = getCspNonce();

  if (!jsonLd) {
    return null;
  }

  return (
    <Helmet prioritizeSeoTags>
      <script
        type="application/ld+json"
        nonce={cspNonce || undefined}
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </Helmet>
  );
}
