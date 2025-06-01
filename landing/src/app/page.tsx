'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { 
  Menu, 
  Check, 
  ChevronRight, 
  Globe, 
  Headphones, 
  BookOpen, 
  Users, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

// 헤더 컴포넌트
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: '홈', href: '#' },
    { label: '프로그램', href: '#programs' },
    { label: '수업 방식', href: '#services' },
    { label: '수강생 후기', href: '#testimonials' },
    { label: '자주 묻는 질문', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold text-primary">영어마스터</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button size="sm" variant="default" className="hidden md:flex">
            무료 체험 신청
          </Button>

          {/* 모바일 메뉴 */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button size="sm" className="mt-4">
                  무료 체험 신청
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// 히어로 섹션
function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              <span className="text-primary">효과적인 영어 학습</span>으로<br />
              글로벌 인재로 성장하세요
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              1:1 맞춤형 영어 교육과 체계적인 커리큘럼으로 영어 실력을 빠르게 향상시켜 드립니다.
              현지 원어민과 함께하는 생생한 영어 학습을 경험해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" className="w-full sm:w-auto">
                무료 레벨 테스트 받기
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                프로그램 소개 <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-primary/80 flex items-center justify-center border-2 border-background">
                      <Check className="h-4 w-4 text-background" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold">1000+</span> 수강생
                </p>
              </div>
              <Separator orientation="vertical" className="h-8 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/80 flex items-center justify-center">
                  <Check className="h-4 w-4 text-background" />
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold">95%</span> 만족도
                </p>
              </div>
              <Separator orientation="vertical" className="h-8 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/80 flex items-center justify-center">
                  <Check className="h-4 w-4 text-background" />
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold">20+</span> 전문 강사진
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl opacity-50" />
              <Image
                src="https://picsum.photos/seed/english/800/800"
                alt="영어 수업 장면"
                className="relative z-10 rounded-2xl object-cover"
                width={500}
                height={500}
                priority
              />
              <div className="absolute -bottom-6 -right-6 bg-background border shadow-lg p-4 rounded-lg z-20">
                <p className="text-sm font-medium">평균 TOEIC 점수 향상</p>
                <p className="text-2xl font-bold text-primary">+120점</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 서비스 섹션
function ServicesSection() {
  const services = [
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "원어민 화상 수업",
      description: "미국, 영국, 호주 출신 원어민 강사와 1:1 실시간 화상 수업으로 언제 어디서나 편리하게 영어를 배울 수 있습니다.",
      image: "https://picsum.photos/seed/service1/600/400"
    },
    {
      icon: <Headphones className="h-10 w-10 text-primary" />,
      title: "AI 발음 교정",
      description: "최신 AI 기술을 활용한 발음 분석 시스템으로 정확한 영어 발음을 익히고 교정받을 수 있습니다.",
      image: "https://picsum.photos/seed/service2/600/400"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "맞춤형 커리큘럼",
      description: "학습자의 레벨과 목표에 맞춘 개인별 맞춤형 학습 계획으로 효율적인 영어 실력 향상을 경험하세요.",
      image: "https://picsum.photos/seed/service3/600/400"
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "그룹 스터디",
      description: "비슷한 레벨의 학습자들과 함께하는 그룹 스터디로 영어 회화 실력을 더욱 향상시킬 수 있습니다.",
      image: "https://picsum.photos/seed/service4/600/400"
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            특별한 <span className="text-primary">학습 경험</span>을 제공합니다
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            영어마스터만의 차별화된 4가지 학습 방식으로 효과적인 영어 실력 향상을 경험하세요
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-md">
              <CardHeader className="p-6">
                <div className="mb-3">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="object-cover"
                    fill
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// 수강생 후기 섹션
function TestimonialsSection() {
  const testimonials = [
    {
      name: "김지연",
      role: "TOEIC 900점 달성",
      content: "3개월 만에 토익 점수가 200점 이상 향상되었습니다. 맞춤형 학습 방식과 열정적인 강사님 덕분에 빠르게 실력이 늘었어요!",
      avatar: "https://picsum.photos/seed/avatar1/100/100"
    },
    {
      name: "박준서",
      role: "비즈니스 영어 수강생",
      content: "업무에 필요한 비즈니스 영어를 배울 수 있어 좋았습니다. 이메일 작성법부터 회의 영어까지 실무에 바로 적용할 수 있어요.",
      avatar: "https://picsum.photos/seed/avatar2/100/100"
    },
    {
      name: "이민지",
      role: "해외 유학 준비생",
      content: "유학 준비를 위해 수강했는데, 원어민 강사님과의 수업으로 실제 해외 생활에 필요한 영어를 배울 수 있었습니다.",
      avatar: "https://picsum.photos/seed/avatar3/100/100"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="text-primary">수강생</span>들의 생생한 후기
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            영어마스터와 함께 영어 실력을 향상시킨 수강생들의 실제 후기를 확인하세요
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="flex-1 text-muted-foreground">{testimonial.content}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ 섹션
function FaqSection() {
  const faqs = [
    {
      question: "수업은 어떤 방식으로 진행되나요?",
      answer: "수업은 1:1 화상 수업, 그룹 수업, 자율 학습 등 다양한 방식으로 진행됩니다. 학습자의 레벨과 목표에 맞는 최적의 수업 방식을 제안해 드립니다."
    },
    {
      question: "수강 기간은 어떻게 되나요?",
      answer: "기본 수강 기간은 3개월이며, 1개월, 6개월, 1년 등 다양한 기간으로 선택이 가능합니다. 학습 목표와 상황에 맞게 선택하실 수 있습니다."
    },
    {
      question: "수업 일정은 어떻게 조정할 수 있나요?",
      answer: "수업 일정은 수강생의 스케줄에 맞게 유연하게 조정 가능합니다. 예약 시스템을 통해 원하는 시간에 수업을 예약하고 변경할 수 있습니다."
    },
    {
      question: "무료 체험 수업은 어떻게 신청하나요?",
      answer: "홈페이지 상단의 '무료 체험 신청' 버튼을 통해 간단한 정보를 입력하시면 담당자가 연락드려 일정을 조율해 드립니다."
    },
    {
      question: "수강료 환불 정책은 어떻게 되나요?",
      answer: "수강 시작 후 7일 이내에는 전액 환불이 가능하며, 이후에는 남은 기간에 대해 일할 계산하여 환불해 드립니다. 자세한 사항은 고객센터로 문의해 주세요."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            자주 묻는 <span className="text-primary">질문</span>
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            영어마스터에 대해 가장 많이 문의하시는 질문들을 모았습니다
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardHeader className="p-6">
                <CardTitle className="text-xl">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA 섹션
function CtaSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              지금 바로 영어 실력을 높여보세요
            </h2>
            <p className="text-primary-foreground/80 md:text-xl">
              첫 수업은 무료로 체험하실 수 있습니다. 지금 바로 신청하세요.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              프로그램 살펴보기
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
              무료 체험 신청하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// 푸터 컴포넌트
function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-primary">영어마스터</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              효과적인 영어 학습 솔루션을 제공하여<br />
              글로벌 인재 양성에 기여합니다.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">프로그램</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">1:1 화상 영어</Link></li>
              <li><Link href="#" className="hover:text-foreground">비즈니스 영어</Link></li>
              <li><Link href="#" className="hover:text-foreground">시험 대비 과정</Link></li>
              <li><Link href="#" className="hover:text-foreground">어린이 영어</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">회사 정보</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">회사 소개</Link></li>
              <li><Link href="#" className="hover:text-foreground">강사 소개</Link></li>
              <li><Link href="#" className="hover:text-foreground">채용 정보</Link></li>
              <li><Link href="#" className="hover:text-foreground">제휴 문의</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">연락처</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>서울특별시 강남구 테헤란로 123</li>
              <li>이메일: info@englishmaster.kr</li>
              <li>전화번호: 02-123-4567</li>
              <li>운영시간: 평일 9:00 - 18:00</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} 영어마스터. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">이용약관</Link>
            <Link href="#" className="hover:text-foreground">개인정보처리방침</Link>
            <Link href="#" className="hover:text-foreground">사이트맵</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
