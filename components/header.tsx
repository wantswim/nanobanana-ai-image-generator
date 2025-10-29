"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍌</span>
          <span className="text-xl font-bold text-primary">Nano Banana</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-foreground hover:text-primary transition">
            Features
          </Link>
          <Link href="#showcase" className="text-foreground hover:text-primary transition">
            Showcase
          </Link>
          <Link href="#faq" className="text-foreground hover:text-primary transition">
            FAQ
          </Link>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:opacity-90 transition">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <Link href="#features" className="text-foreground hover:text-primary transition">
                Features
              </Link>
              <Link href="#showcase" className="text-foreground hover:text-primary transition">
                Showcase
              </Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition">
                FAQ
              </Link>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:opacity-90 transition w-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
