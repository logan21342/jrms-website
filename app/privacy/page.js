import LegalPage from '@/components/LegalPage';

export default function Privacy() { return <LegalPage eyebrow="POPIA compliant" title="Privacy policy" updated="Last updated: September 2026" intro="We keep your information focused on one purpose: arranging a reliable move or removal job." sections={[
  ['What we collect', 'We collect your name, phone number, address or area, job details and photos so we can provide a quote and arrange service.'],
  ['How we store it', 'Booking information is stored securely in Supabase and retained only as needed to provide the service and support our records.'],
  ['Who sees it', 'We share relevant details only with the assigned independent driver for your job. We never sell your data.'],
  ['Your choices', 'You can request access to or deletion of your information at any time by WhatsApping JRMS on 078 886 8252.'],
  ['Cookies and POPIA', 'We use basic cookies for site analytics only. Our handling of personal information is intended to comply with South Africa\'s Protection of Personal Information Act (POPIA).']
]} />; }
