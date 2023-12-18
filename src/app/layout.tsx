import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import AuthProvider from './context/AuthProvider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Roc8 Systems',
  description: 'Data Visualization with authentications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        'min-h-screen font-sans antialiased grainy',
        inter.className
      )}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
          <MaxWidthWrapper>
            <Navbar />
            {children}
          </MaxWidthWrapper>
          <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
