import type { Metadata } from 'next';
import localFont from 'next/font/local';
import clsx from 'clsx';
import '@/styles/globals.css';

const gilroy = localFont({
  src: [
    {
      path: './fonts/Gilroy-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'ticTacToe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(gilroy.className, 'antialiased')}>{children}</body>
    </html>
  );
}
