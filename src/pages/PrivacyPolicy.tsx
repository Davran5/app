import LegalDocumentPage from '../components/LegalDocumentPage';
import { useLanguage } from '../contexts/LanguageContext';
import { PRIVACY_POLICY_CONTENT } from '../lib/legalContent';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return <LegalDocumentPage language={language} content={PRIVACY_POLICY_CONTENT} />;
}
