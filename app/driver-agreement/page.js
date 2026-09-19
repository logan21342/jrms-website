import LegalPage from '@/components/LegalPage';

export default function DriverAgreement() { return <LegalPage eyebrow="Join the network" title="Driver agreement" updated="Last updated: September 2026" intro="JRMS gives independent local drivers a steady stream of moving, delivery and removal work." sections={[
  ['1. Independent contractor', 'You are an independent contractor, not an employee of JRMS. You choose whether to accept jobs offered through the platform.'],
  ['2. Vehicle and licence', 'You must hold a valid driving licence and operate a roadworthy bakkie or truck suitable for the job.'],
  ['3. Helpers and safe work', 'You must bring your own helper when heavy items require one and follow safe loading and handling practices.'],
  ['4. Responsibility', 'You are responsible for damage, injury and delays caused by your actions or vehicle while working on a job.'],
  ['5. Proof and payouts', 'Upload photo proof when a job is complete. Driver payout is 85% of the confirmed job price; JRMS keeps 15% as the platform fee.'],
  ['6. Complaints', 'Two substantiated client complaints may result in removal from the platform.']
]} />; }
