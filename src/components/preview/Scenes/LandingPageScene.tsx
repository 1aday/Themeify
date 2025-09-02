'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible } from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowRight, 
  Check, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  Mail,
  Phone,
  MapPin,
  Twitter,
  Github,
  Linkedin,
  Heart,
  Sparkles,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';

export function LandingPageScene() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built for speed with optimized performance and instant loading times.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee.'
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Deploy anywhere with our worldwide infrastructure network.'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '150+', label: 'Countries' },
    { number: '24/7', label: 'Support' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp',
      content: 'This platform has transformed how we work. The interface is intuitive and the results speak for themselves.',
      avatar: 'SJ',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CTO, StartupXYZ',
      content: 'Incredible performance and reliability. Our team productivity has increased by 40% since switching.',
      avatar: 'MC',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager, InnovateLab',
      content: 'The best investment we\'ve made. The features are exactly what we needed to scale our business.',
      avatar: 'ER',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'How does the pricing work?',
      answer: 'We offer flexible pricing plans starting from $9/month for individuals, with enterprise options available. All plans include a 14-day free trial.'
    },
    {
      question: 'Can I integrate with my existing tools?',
      answer: 'Yes! We support 100+ integrations including Slack, GitHub, Figma, and many more. Our API makes custom integrations simple.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer 24/7 support via chat, email, and phone. Enterprise customers get dedicated account managers and priority support.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and regular security audits to protect your data.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge 
            variant="secondary" 
            className="mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            New: AI-Powered Features
          </Badge>
          
          <h1 
            className="text-5xl md:text-6xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Build the Future of
            <span className="text-primary"> Digital Experiences</span>
          </h1>
          
          <p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            The all-in-one platform that helps teams create, collaborate, and scale 
            amazing products with confidence and speed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Watch Demo
            </Button>
          </div>
          
          <p 
            className="text-sm text-muted-foreground"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold text-primary mb-2"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-muted-foreground"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Everything you need to succeed
            </h2>
            <p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Powerful features designed to help you build, launch, and grow your products faster than ever.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center theme-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle 
                      className="text-xl"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription 
                      className="text-base"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Loved by teams worldwide
            </h2>
            <p 
              className="text-xl text-muted-foreground"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              See what our customers are saying about their experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="theme-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/avatars/${testimonial.avatar.toLowerCase()}.jpg`} />
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle 
                        className="text-lg"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription 
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {testimonial.role}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p 
                    className="text-muted-foreground italic"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Simple, transparent pricing
            </h2>
            <p 
              className="text-xl text-muted-foreground"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Choose the plan that's right for your team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Starter Plan */}
            <Card className="theme-shadow">
              <CardHeader>
                <CardTitle 
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Starter
                </CardTitle>
                <CardDescription 
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Perfect for individuals and small teams
                </CardDescription>
                <div 
                  className="text-3xl font-bold"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  $9<span className="text-lg text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span 
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Up to 5 projects
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span 
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Basic analytics
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span 
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Email support
                    </span>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-primary theme-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle 
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Pro
                  </CardTitle>
                  <Badge 
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Popular
                  </Badge>
                </div>
                <CardDescription 
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Best for growing businesses
                </CardDescription>
                <div 
                  className="text-3xl font-bold"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  $29<span className="text-lg text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span 
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Unlimited projects
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span 
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Advanced analytics
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span 
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Priority support
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span 
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Custom integrations
                    </span>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Frequently asked questions
            </h2>
            <p 
              className="text-xl text-muted-foreground"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Everything you need to know about our platform.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible key={index} title={faq.question} className="theme-shadow">
                <p 
                  className="text-muted-foreground"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {faq.answer}
                </p>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Get in touch
            </h2>
            <p 
              className="text-xl text-muted-foreground"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Have questions? We'd love to hear from you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="theme-shadow">
              <CardHeader>
                <CardTitle 
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Send us a message
                </CardTitle>
                <CardDescription 
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Fill out the form and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label 
                      htmlFor="firstName"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      First name
                    </Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label 
                      htmlFor="lastName"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Last name
                    </Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label 
                    htmlFor="email"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <Label 
                    htmlFor="message"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Message
                  </Label>
                  <Textarea id="message" placeholder="Tell us about your project..." />
                </div>
                <Button 
                  className="w-full"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="theme-shadow">
                <CardHeader>
                  <CardTitle 
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span 
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      hello@company.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span 
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span 
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      123 Business St, City, State 12345
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="theme-shadow">
                <CardHeader>
                  <CardTitle 
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Follow us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Ready to get started?
          </h2>
          <p 
            className="text-xl opacity-90 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Join thousands of teams who are already building the future with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 
                className="font-semibold"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Product
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 
                className="font-semibold"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Company
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 
                className="font-semibold"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Resources
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 
                className="font-semibold"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Legal
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p 
              className="text-sm text-muted-foreground"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              © 2024 Company Name. All rights reserved.
            </p>
            <p 
              className="text-sm text-muted-foreground flex items-center mt-4 md:mt-0"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Made with <Heart className="h-4 w-4 mx-1 text-destructive" /> by our team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
