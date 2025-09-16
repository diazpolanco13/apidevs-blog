import Link from 'next/link'
import { 
  Shield, 
  Star, 
  Users, 
  TrendingUp, 
  Mail, 
  MessageCircle,
  Github,
  Twitter,
  Youtube
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0f1419] to-black border-t border-gray-800">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="block mb-4">
              <img 
                src="/logos/logo-horizontal-blanco.png" 
                alt="APIDevs" 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Blog oficial de la plataforma líder en indicadores de trading con IA. Únete a más de 3,500 traders profesionales.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/diazpolanco13" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Blog Home
                </Link>
              </li>
              <li>
                <Link href="https://apidevs-react.vercel.app" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Plataforma Principal
                </Link>
              </li>
              <li>
                <Link href="https://apidevs-react.vercel.app/pricing" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#indicators" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Indicadores
                </Link>
              </li>
              <li>
                <Link href="#community" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Comunidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías del Blog */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categorías</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#technical" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Technical Analysis
                </Link>
              </li>
              <li>
                <Link href="#strategies" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Strategies & Tips
                </Link>
              </li>
              <li>
                <Link href="#ai" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  AI & Technology
                </Link>
              </li>
              <li>
                <Link href="#indicators" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Indicadores
                </Link>
              </li>
              <li>
                <Link href="#updates" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Product Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto y Stats */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-400 text-sm">
                <Mail className="w-4 h-4 mr-2 text-green-400" />
                info@apidevs.io
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <MessageCircle className="w-4 h-4 mr-2 text-green-400" />
                Telegram 24/7
              </li>
            </ul>
            
            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-900/50 rounded-lg p-2 text-center">
                <div className="text-green-400 font-bold text-sm">3,500+</div>
                <div className="text-gray-500 text-xs">Traders</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2 text-center">
                <div className="text-green-400 font-bold text-sm">160</div>
                <div className="text-gray-500 text-xs">Criptos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges de confianza */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-black/50 border border-gray-800 rounded-full">
              <Shield className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-sm text-gray-300">100% Riesgo Cero</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-black/50 border border-gray-800 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm text-gray-300">3,500+ Traders</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-black/50 border border-gray-800 rounded-full">
              <Users className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-sm text-gray-300">Cancelación Inmediata</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-black/50 border border-gray-800 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-sm text-gray-300">18 Indicadores VIP</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} APIDevs, Inc. Todos los derechos reservados.
            </div>
            <div className="text-gray-400 text-sm">
              Diseñado con 💚 y mucha cafeína
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
