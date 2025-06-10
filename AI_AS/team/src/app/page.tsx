'use client';
// Temporary comment to force Vercel rebuild

import Header from '@/features/landing/components/Header'
import Hero from '@/features/landing/components/Hero'
import Testimonials from '@/features/landing/components/Testimonials'
import Footer from '@/features/landing/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Testimonials />
      <Footer />
    </>
  )
}
