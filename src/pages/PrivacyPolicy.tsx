import LegalDocumentPage from '../components/LegalDocumentPage';
import { useLanguage } from '../contexts/LanguageContext';
import { getPrivacyPolicyContent } from '../lib/legalContent';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return <LegalDocumentPage language={language} content={getPrivacyPolicyContent(language)} />;
}
