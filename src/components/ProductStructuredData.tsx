import { Helmet } from 'react-helmet-async';
import {
  type ProductStructuredDataInput,
  useProductJsonLd,
} from '../lib/structuredData';

export default function ProductStructuredData(props: ProductStructuredDataInput) {
  const jsonLd = useProductJsonLd(props);

  if (!jsonLd) {
    return null;
  }

  return (
    <Helmet prioritizeSeoTags>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </Helmet>
  );
}
