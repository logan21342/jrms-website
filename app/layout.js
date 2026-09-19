import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata = {
  title: 'JRMS - Moves & Junk Removal Cape Town From R399',
  description: "Cape Town's trusted moves and junk removal platform. Book a bakkie or truck from R399.",
  keywords: ['Cape Town movers', 'junk removal Cape Town', 'bakkie hire Strandfontein']
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><Header />{children}<Footer /><WhatsAppFloat /></body></html>;
}
