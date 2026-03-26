'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, TrendingUp, ShieldCheck,
  Rocket, AlertTriangle, Activity, Heart
} from 'lucide-react'

const NAV = [
  { href: '/',            label: 'Overview',         icon: LayoutDashboard },
  { href: '/patients',    label: 'Patient Monitor',  icon: Users           },
  { href: '/insights',    label: 'Model Insights',   icon: TrendingUp      },
  { href: '/ethics',      label: 'Ethics & Fairness',icon: ShieldCheck     },
  { href: '/deployment',  label: 'Deployment',       icon: Rocket          },
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <aside className="w-60 flex-shrink-0 bg-[#0F172A] flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Heart size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">OneSelf HealthAI</p>
            <p className="text-slate-400 text-xs">Healthcare Analytics</p>
          </div>
        </div>
      </div>

      {/* Live indicator */}
      <div className="px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs text-green-400 font-medium">Live — 768 patients</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = path === href
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/8'}`}>
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Alert badge */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-lg px-3 py-2">
          <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-red-400 font-semibold">3 Active Alerts</p>
            <p className="text-xs text-slate-500">2 critical, 1 high</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/10">
        <p className="text-xs text-slate-700">Month 2 · Task 4</p>
      </div>
    </aside>
  )
}
