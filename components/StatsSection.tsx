'use client'

import { useEffect, useState } from 'react'
import { Users, TrendingUp, Clock, Award } from 'lucide-react'

export default function StatsSection() {
  const [mounted, setMounted] = useState(false)
  const [traders, setTraders] = useState(0)
  const [cryptos, setCryptos] = useState(0)
  const [uptime, setUptime] = useState(0)
  const [accuracy, setAccuracy] = useState(0)

  useEffect(() => {
    setMounted(true)
    
    // Animate numbers
    const animateValue = (setter: any, end: number, duration: number) => {
      let start = 0
      const increment = end / (duration / 10)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setter(end)
          clearInterval(timer)
        } else {
          setter(Math.floor(start))
        }
      }, 10)
    }

    animateValue(setTraders, 3500, 2000)
    animateValue(setCryptos, 160, 1500)
    animateValue(setUptime, 99.9, 1800)
    animateValue(setAccuracy, 87, 2200)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center group cursor-pointer">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-4 group-hover:bg-green-500/20 transition-colors">
              <Users className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-4xl font-bold neon-text mb-2">
              {traders.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-400">Traders de Élite</div>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-2xl mb-4 group-hover:bg-cyan-500/20 transition-colors">
              <TrendingUp className="w-8 h-8 text-cyan-500" />
            </div>
            <div className="text-4xl font-bold text-cyan-500 mb-2">
              {cryptos}
            </div>
            <div className="text-sm text-gray-400">Criptos en Tiempo Real</div>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-2xl mb-4 group-hover:bg-purple-500/20 transition-colors">
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
            <div className="text-4xl font-bold text-purple-500 mb-2">
              {uptime.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Uptime Garantizado</div>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-2xl mb-4 group-hover:bg-yellow-500/20 transition-colors">
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="text-4xl font-bold text-yellow-500 mb-2">
              {accuracy}%
            </div>
            <div className="text-sm text-gray-400">Precisión de Señales</div>
          </div>
        </div>
      </div>
    </section>
  )
}
