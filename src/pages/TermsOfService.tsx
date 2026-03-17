import LegalDocumentPage from '../components/LegalDocumentPage';
import { useLanguage } from '../contexts/LanguageContext';
import { TERMS_OF_SERVICE_CONTENT } from '../lib/legalContent';

export default function TermsOfService() {
  const { language } = useLanguage();

  return <LegalDocumentPage language={language} content={TERMS_OF_SERVICE_CONTENT} />;
}
