"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Headphones,
} from "lucide-react";

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string | string[];
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function ContactPage() {
  const contactInfo: ContactInfo[] = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "03243218965",
      description: "Mon–Sat, 9AM–6PM",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["mabdullahqureshi583@gmail.com", "abdullah2127x@gmail.com"],
      description: "We'll respond within 24 hours",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      details: "Karachi, Pakistan",
      description: "Serving customers worldwide",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Website",
      details: "https://abdullah2127x.vercel.app/",
      description: "Visit our personal website",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3–7 business days within Pakistan.",
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy on all unused items.",
    },
    {
      question: "Do you offer wholesale pricing?",
      answer: "Yes! Contact us for bulk order discounts and wholesale rates.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-primary to-accent text-center">
        <div className="max-w-6xl mx-auto">
          <MessageSquare className="w-16 h-16 text-foreground mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help! Reach out and let's connect.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-accent-foreground mb-4">{info.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {info.title}
                </h3>
                {Array.isArray(info.details) ? (
                  <div className="space-y-1 mb-2">
                    {info.details.map((detail, i) => (
                      <p
                        key={i}
                        className="text-foreground font-medium text-sm break-all"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-foreground font-medium mb-2">
                    {info.details}
                  </p>
                )}
                <p className="text-muted-foreground text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Support & FAQs Section */}
      <section className="py-20 px-6 bg-secondary/40">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          {/* Quick Support */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Headphones className="w-8 h-8 text-accent-foreground" />
              <h2 className="text-3xl font-bold text-foreground">
                Quick Support
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Need immediate assistance? Our customer support team is ready to
              help you with any questions about products, orders, or shipping.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent-foreground mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Call us</p>
                  <p className="text-muted-foreground">03243218965</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent-foreground mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Email us</p>
                  <p className="text-muted-foreground text-sm break-all">
                    mabdullahqureshi583@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-semibold text-foreground mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Visit Our Location
          </h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-accent-foreground mx-auto mb-4" />
              <p className="text-xl font-semibold text-foreground mb-2">
                Karachi, Pakistan
              </p>
              <p className="text-muted-foreground">
                Serving fitness enthusiasts nationwide
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
