"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Rocket, Target, Zap, BarChart2, Mail } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="px-4 lg:px-8 h-14 flex items-center border-b">
        <div className="flex w-full max-w-7xl mx-auto justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-purple-600" />
            <span className="font-bold text-xl">RocketSDR</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-purple-600">Features</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-purple-600">Pricing</Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-purple-600">Testimonials</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 lg:px-8 py-20 md:py-28 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Your AI-Powered Sales Development
            <span className="text-purple-600"> Co-Pilot</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Automate your outreach, engage prospects with personalized conversations, and close more deals with AI-powered intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Watch Demo
            </Button>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Backed by</span>
              <Image
                src="/yc-logo.png"
                alt="Y Combinator"
                width={20}
                height={20}
                className="dark:invert"
              />
              <span className="font-semibold">Y Combinator</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Trusted by 1000+ companies worldwide
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose RocketSDR?</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to supercharge your sales development process
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Personalization",
                description: "Generate highly personalized outreach messages that resonate with your prospects.",
                icon: Bot
              },
              {
                title: "Smart Lead Targeting",
                description: "Identify and prioritize your most promising leads with AI-driven insights.",
                icon: Target
              },
              {
                title: "Automated Campaigns",
                description: "Set up and manage multi-touch campaigns that run on autopilot.",
                icon: Zap
              },
              {
                title: "Advanced Analytics",
                description: "Track performance and optimize your outreach with detailed analytics.",
                icon: BarChart2
              },
              {
                title: "Multi-Channel Outreach",
                description: "Engage prospects across email, LinkedIn, and other channels.",
                icon: Mail
              },
              {
                title: "CRM Integration",
                description: "Seamlessly sync with your existing CRM and sales tools.",
                icon: Rocket
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 border rounded-lg">
                <feature.icon className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 lg:px-8 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that's right for your business
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$99",
                description: "Perfect for small teams getting started",
                features: [
                  "Up to 1,000 leads",
                  "Basic AI personalization",
                  "Email campaigns",
                  "Basic analytics",
                  "Email support"
                ]
              },
              {
                name: "Professional",
                price: "$199",
                description: "For growing teams that need more power",
                features: [
                  "Up to 5,000 leads",
                  "Advanced AI personalization",
                  "Multi-channel campaigns",
                  "Advanced analytics",
                  "Priority support",
                  "CRM integration"
                ]
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large teams with custom needs",
                features: [
                  "Unlimited leads",
                  "Custom AI models",
                  "Advanced integrations",
                  "Custom analytics",
                  "Dedicated support",
                  "API access"
                ]
              }
            ].map((plan, index) => (
              <div key={index} className={`p-8 border rounded-lg ${
                index === 1 ? "border-purple-600 ring-1 ring-purple-600" : ""
              }`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-2">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-lg font-normal">/month</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <Button className="w-full mb-6" variant={index === 1 ? "default" : "outline"}>
                  Get Started
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className="h-4 w-4 text-green-500 mr-3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-4 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "RocketSDR has transformed our sales development process. The AI personalization is incredible!",
                author: "Sarah Johnson",
                role: "VP of Sales, TechCorp"
              },
              {
                quote: "We've seen a 3x increase in response rates since switching to RocketSDR. The ROI is amazing.",
                author: "Michael Chen",
                role: "SDR Manager, GrowthCo"
              },
              {
                quote: "The automation capabilities have saved our team countless hours. It's like having an extra SDR!",
                author: "Emily Rodriguez",
                role: "Sales Director, ScaleUp Inc"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 border rounded-lg">
                <p className="text-lg mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 lg:px-8 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about RocketSDR
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-background rounded-lg border px-6">
              <AccordionTrigger className="text-left">
                What is RocketSDR and how does it work?
              </AccordionTrigger>
              <AccordionContent>
                RocketSDR is an AI-powered sales development platform that helps teams automate and personalize their outreach. 
                It uses advanced AI to generate personalized messages, identify promising leads, and manage multi-channel campaigns, 
                all while integrating seamlessly with your existing tools.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-background rounded-lg border px-6">
              <AccordionTrigger className="text-left">
                How does the AI personalization work?
              </AccordionTrigger>
              <AccordionContent>
                Our AI analyzes your prospect's profile, company information, and online presence to generate highly personalized 
                messages that resonate with their specific needs and interests. The AI continuously learns from response rates 
                and engagement data to improve its personalization over time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-background rounded-lg border px-6">
              <AccordionTrigger className="text-left">
                Can I integrate RocketSDR with my existing CRM?
              </AccordionTrigger>
              <AccordionContent>
                Yes! RocketSDR integrates with all major CRM platforms including Salesforce, HubSpot, and Pipedrive. 
                Our API and native integrations ensure smooth data synchronization and workflow automation between your 
                existing tools and RocketSDR.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-background rounded-lg border px-6">
              <AccordionTrigger className="text-left">
                What kind of support do you offer?
              </AccordionTrigger>
              <AccordionContent>
                We offer different levels of support based on your plan. All customers get access to our comprehensive 
                documentation and email support. Professional and Enterprise plans include priority support with faster 
                response times, and Enterprise customers get a dedicated customer success manager.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-background rounded-lg border px-6">
              <AccordionTrigger className="text-left">
                Is there a free trial available?
              </AccordionTrigger>
              <AccordionContent>
                Yes! We offer a 14-day free trial on all our plans. During the trial, you'll have access to all features 
                of your chosen plan, allowing you to fully experience how RocketSDR can transform your sales development process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 lg:px-8 py-20 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Sales?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Start your free trial today. No credit card required.
          </p>
          <Button size="lg" variant="secondary" className="text-purple-600">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 lg:px-8 py-12 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">RocketSDR</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RocketSDR. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
