'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TrendingUp, Activity, BarChart3, Zap } from 'lucide-react'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentPrice, setCurrentPrice] = useState(96356.65)
  const [priceChange, setPriceChange] = useState(2.34)

  useEffect(() => {
    setMounted(true)
    // Simulate price updates
    const interval = setInterval(() => {
      setCurrentPrice(prev => prev + (Math.random() - 0.5) * 100)
      setPriceChange(Math.random() * 5 - 2.5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Floating Trading Chart */}
        <div className="absolute -top-10 -right-10 w-64 h-40 glass-card rounded-xl p-4 float hidden lg:block">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">BTC/USDT</span>
            <span className={`text-xs font-bold ${priceChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-white">
            ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <svg className="w-full h-16 mt-2" viewBox="0 0 100 40">
            <polyline
              points="0,35 10,30 20,32 30,28 40,20 50,25 60,15 70,18 80,10 90,12 100,8"
              fill="none"
              stroke="#00ff88"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              points="0,35 10,30 20,32 30,28 40,20 50,25 60,15 70,18 80,10 90,12 100,8 100,40 0,40"
              fill="url(#gradient)"
            />
          </svg>
        </div>

        {/* Main Title with EPIC animation */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="block text-white">APIDevs Trading</span>
          <span className="block neon-text mt-2">Blog</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
          Análisis técnico avanzado, estrategias de trading con IA, y guías exclusivas 
          sobre nuestros indicadores premium para TradingView
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            href="https://apidevs-react.vercel.app/pricing"
            className="group relative px-8 py-4 overflow-hidden rounded-xl font-bold text-black"
          >
            <div className="absolute inset-0 gradient-animate" />
            <span className="relative flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Ver Indicadores Premium
            </span>
          </Link>
          
          <button className="px-8 py-4 glass-card rounded-xl font-bold text-white hover:border-green-500/50 transition-all group">
            <span className="flex items-center justify-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Explorar Estrategias
            </span>
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer group">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-green-500/30 transition-colors">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Análisis en Tiempo Real</h3>
            <p className="text-sm text-gray-400">Señales actualizadas cada 60 segundos</p>
          </div>

          <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer group">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-500/30 transition-colors">
              <BarChart3 className="w-6 h-6 text-cyan-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">160+ Criptos</h3>
            <p className="text-sm text-gray-400">Cobertura completa del mercado</p>
          </div>

          <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer group">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-purple-500/30 transition-colors">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">IA Avanzada</h3>
            <p className="text-sm text-gray-400">Machine Learning predictivo</p>
          </div>
        </div>
      </div>
    </section>
  )
}
