import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Montserrat } from 'next/font/google'
import Header from '@/components/sections/Header/Header';

const font = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100","200", "300","400", "500", "600", "700", "800", "900"]
})

export const metadata = {
  title: "Esmeralda",
  description: "Esmeralda theme - University",
}
const headerData = {
  logo: {
    text: "Esmeralda",
    src: "",
  },
  nav: [
    {
      title: "ABOUT",
      url: "/demos/education/about"
    },
    {
      title: "FACILITIES",
      url: "/demos/education/facilities"
    },
    {
      title: "NEWS",
      url: "/demos/education/news"
    },
    {
      title: "ADMISSIONS",
      url: "/demos/education/admissions"
    },
  ],
  // button: {
  //   text: "Get started for free",
  //   url: "/register"
  // }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header data={headerData} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}