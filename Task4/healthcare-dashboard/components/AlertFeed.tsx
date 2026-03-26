'use client'
import { useState } from 'react'
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Bell } from 'lucide-react'
import { ALERTS } from '@/lib/data'

const TYPE_CONFIG = {
  critical: { icon: AlertTriangle, bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700',    dot: 'bg-red-500',    badge: 'badge-critical' },
  high:     { icon: AlertCircle,   bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', dot: 'bg-orange-500', badge: 'badge-high'     },
  medium:   { icon: Info,          bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', dot: 'bg-yellow-400', badge: 'badge-medium'   },
}

export default function AlertFeed() {
  const [alerts, setAlerts] = useState(ALERTS)

  const resolve = (id: number) =>
    setAlerts(a => a.map(x => x.id === id ? { ...x, resolved: true } : x))

  const active = alerts.filter(a => !a.resolved)
  const resolved = alerts.filter(a => a.resolved)

  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-slate-600" />
          <h3 className="font-semibold text-slate-800">Clinical Alerts</h3>
        </div>
        <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {active.length}
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {active.map(alert => {
          const cfg = TYPE_CONFIG[alert.type as keyof typeof TYPE_CONFIG]
          const Icon = cfg.icon
          return (
            <div key={alert.id} className={`p-3 rounded-lg border ${cfg.bg} ${cfg.border} flex items-start gap-3`}>
              <Icon size={15} className={`${cfg.text} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-slate-700">{alert.patient}</span>
                  <span className={cfg.badge}>{alert.type}</span>
                </div>
                <p className={`text-xs ${cfg.text} leading-relaxed`}>{alert.message}</p>
                <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
              </div>
              <button onClick={() => resolve(alert.id)}
                className="text-xs text-slate-400 hover:text-green-600 transition-colors flex-shrink-0">
                ✓
              </button>
            </div>
          )
        })}

        {resolved.length > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium mb-2 flex items-center gap-1">
              <CheckCircle2 size={11} className="text-green-500" /> Resolved
            </p>
            {resolved.map(alert => (
              <div key={alert.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 mb-1.5 opacity-60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">{alert.patient}</span>
                  <span className="text-xs text-slate-400">{alert.message.slice(0, 40)}…</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
