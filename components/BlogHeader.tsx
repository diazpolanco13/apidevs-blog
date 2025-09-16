'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function BlogHeader() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0f1419]/95 backdrop-blur-lg border-b border-gray-800">
      <nav className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/logos/logo-horizontal-blanco.png" 
                alt="APIDevs Blog" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-light text-gray-400 border-l border-gray-700 pl-3 ml-3">BLOG</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-green-400 transition-colors font-medium"
            >
              Recent
            </Link>
            <Link 
              href="#technical" 
              className="text-gray-300 hover:text-green-400 transition-colors font-medium"
            >
              Technical Analysis
            </Link>
            <Link 
              href="#strategies" 
              className="text-gray-300 hover:text-green-400 transition-colors font-medium"
            >
              Strategies & Tips
            </Link>
            <Link 
              href="#ai" 
              className="text-gray-300 hover:text-green-400 transition-colors font-medium"
            >
              AI & Technology
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-400 hover:text-green-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* CTA Button */}
            <Link 
              href="https://apidevs-react.vercel.app"
              target="_blank"
              className="hidden md:inline-flex px-5 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all transform hover:scale-105"
            >
              Go to Platform →
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-green-400 transition-colors"
              >
                Recent
              </Link>
              <Link 
                href="#technical" 
                className="text-gray-300 hover:text-green-400 transition-colors"
              >
                Technical Analysis
              </Link>
              <Link 
                href="#strategies" 
                className="text-gray-300 hover:text-green-400 transition-colors"
              >
                Strategies & Tips
              </Link>
              <Link 
                href="#ai" 
                className="text-gray-300 hover:text-green-400 transition-colors"
              >
                AI & Technology
              </Link>
              <Link 
                href="https://apidevs-react.vercel.app"
                target="_blank"
                className="inline-flex px-5 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all text-center justify-center"
              >
                Go to Platform →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}