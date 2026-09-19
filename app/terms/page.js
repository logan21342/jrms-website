import LegalPage from '@/components/LegalPage';

export default function Terms() { return <LegalPage eyebrow="The fine print" title="Terms & conditions" updated="Last updated: September 2026" intro="These terms keep the booking relationship clear for clients, drivers and JRMS." sections={[
  ['1. What JRMS does', 'JRMS is a booking platform connecting clients with independent drivers. JRMS does not perform moving or removal work itself.'],
  ['2. Quotes', 'Quotes advertised from R399 are estimates. The final price is confirmed after photos, access details and collection and delivery areas have been reviewed.'],
  ['3. Client information and access', 'Clients must provide correct information about the job, items, addresses and access. Please ensure the driver can safely access the collection and delivery points.'],
  ['4. Restricted items', 'We do not carry hazardous waste, chemicals, medical waste or asbestos. Drivers may refuse unsafe or undisclosed items.'],
  ['5. Payments and fees', 'The price is split as 85% to the independent driver and 15% platform fee to JRMS. You may pay the driver directly or through an agreed platform payment method.'],
  ['6. Responsibility', 'The driver is responsible for their work. JRMS is not liable for damage, injury or delays arising from an independent driver job.'],
  ['7. Cancellations', 'Cancellation is free up to 12 hours before the confirmed booking. A R150 cancellation fee applies after that window.']
]} />; }
