'use client';

import Header from '@/features/landing/components/Header'
import Hero from '@/features/landing/components/Hero'
import Features from '@/features/landing/components/Features'
import Testimonials from '@/features/landing/components/Testimonials'
import Footer from '@/features/landing/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </>
  )
}
