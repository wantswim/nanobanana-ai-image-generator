"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does Nano Banana compare to Flux Context?",
      answer:
        "Nano Banana delivers superior character editing and scene preservation with faster processing times. Our advanced model is specifically optimized for consistent results across diverse image types.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "We support PNG, JPG, GIF, and WebP formats. Maximum file size is 50MB. Images are processed at their original resolution for best quality.",
    },
    {
      question: "How long does image generation take?",
      answer:
        "Most images are generated within 5-30 seconds depending on complexity. Batch processing of multiple images is also available for faster workflows.",
    },
    {
      question: "Can I use generated images commercially?",
      answer:
        "Yes! All images generated with Nano Banana can be used for commercial purposes. You retain full rights to your creations.",
    },
    {
      question: "Is there an API available?",
      answer:
        "Yes, we offer a comprehensive REST API for developers. Check our documentation for integration examples and rate limits.",
    },
    {
      question: "What are the pricing options?",
      answer:
        "We offer flexible pricing from free tier to enterprise plans. Visit our pricing page for detailed information and to choose the best plan for your needs.",
    },
  ]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-balance">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-background border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition"
              >
                <span className="font-semibold text-left">{faq.question}</span>
                <ChevronDown size={20} className={`transition-transform ${openIndex === idx ? "rotate-180" : ""}`} />
              </button>

              {openIndex === idx && (
                <div className="px-6 py-4 border-t border-border bg-background/50">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
