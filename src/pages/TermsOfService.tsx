import LegalDocumentPage from '../components/LegalDocumentPage';
import { useLanguage } from '../contexts/LanguageContext';
import { getTermsOfServiceContent } from '../lib/legalContent';

export default function TermsOfService() {
  const { language } = useLanguage();

  return <LegalDocumentPage language={language} content={getTermsOfServiceContent(language)} />;
}
