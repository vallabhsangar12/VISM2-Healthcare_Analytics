'use client'
import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Users, Activity, BarChart2, AlertTriangle, DollarSign } from 'lucide-react'

const ICONS: Record<string, React.ElementType> = {
  users: Users, activity: Activity, 'bar-chart': BarChart2,
  'alert-triangle': AlertTriangle, 'trending-up': TrendingUp, 'dollar-sign': DollarSign,
}

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-100',   icon: 'text-blue-500'   },
  red:    { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-100',    icon: 'text-red-500'    },
  green:  { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-100',  icon: 'text-green-500'  },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100', icon: 'text-orange-500' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100', icon: 'text-purple-500' },
  teal:   { bg: 'bg-teal-50',   text: 'text-teal-700',   border: 'border-teal-100',   icon: 'text-teal-500'   },
}

interface Props {
  label: string; value: number; unit: string; delta: string;
  up: boolean; color: string; icon: string; delay?: number
}

export default function KpiCard({ label, value, unit, delta, up, color, icon, delay = 0 }: Props) {
  const [displayed, setDisplayed] = useState(0)
  const c = COLOR_MAP[color] ?? COLOR_MAP.blue
  const Icon = ICONS[icon] ?? Activity

  useEffect(() => {
    const timer = setTimeout(() => {
      const steps = 40
      let step = 0
      const interval = setInterval(() => {
        step++
        setDisplayed(value * (step / steps))
        if (step >= steps) clearInterval(interval)
      }, 20)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  const formatted =
    unit === '$'  ? `$${Math.round(displayed).toLocaleString()}` :
    value < 1     ? displayed.toFixed(3) :
    value < 100   ? displayed.toFixed(1) + (unit || '') :
                    Math.round(displayed).toLocaleString() + (unit || '')

  return (
    <div className={`card p-5 border ${c.border}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon size={18} className={c.icon} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
          ${up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {delta}
        </span>
      </div>
      <p className={`text-2xl font-bold ${c.text} tabular-nums`}>{formatted}</p>
      <p className="text-xs text-slate-500 mt-1 font-medium">{label}</p>
    </div>
  )
}
