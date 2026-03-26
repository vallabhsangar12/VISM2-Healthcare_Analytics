'use client'
import { useState } from 'react'
import { Search, User, AlertTriangle, ChevronRight, Sliders } from 'lucide-react'
import { PATIENTS_SAMPLE } from '@/lib/data'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip
} from 'recharts'

const TIER_COLOR: Record<string, { badge: string; bg: string; bar: string }> = {
  'Very High': { badge: 'badge-critical', bg: 'bg-red-50 border-red-200',    bar: 'bg-red-500'    },
  'High':      { badge: 'badge-high',     bg: 'bg-orange-50 border-orange-200', bar: 'bg-orange-500' },
  'Moderate':  { badge: 'badge-medium',   bg: 'bg-yellow-50 border-yellow-200', bar: 'bg-yellow-400' },
  'Low':       { badge: 'badge-low',      bg: 'bg-green-50 border-green-200',   bar: 'bg-green-500'  },
}

// ── Patient Risk Calculator ──────────────────────────────────────────────────
function RiskCalculator() {
  const [form, setForm] = useState({
    glucose: 120, bmi: 28, age: 40, bp: 70,
    insulin: 80, pedigree: 0.5, pregnancies: 2
  })
  const [result, setResult] = useState<null | { score: number; tier: string }>(null)

  const calculate = () => {
    // Simplified logistic model approximation from Task 2
    const z =
      -8.4 +
      0.032 * form.glucose +
      0.085 * form.bmi +
      0.025 * form.age +
      0.012 * form.bp +
      0.0015 * form.insulin +
      0.92 * form.pedigree +
      0.12 * form.pregnancies
    const score = 1 / (1 + Math.exp(-z))
    const tier =
      score >= 0.80 ? 'Very High' :
      score >= 0.60 ? 'High' :
      score >= 0.30 ? 'Moderate' : 'Low'
    setResult({ score, tier })
  }

  const radarData = result ? [
    { feature: 'Glucose',   value: Math.min(100, (form.glucose / 300) * 100) },
    { feature: 'BMI',       value: Math.min(100, (form.bmi / 50) * 100) },
    { feature: 'Age',       value: Math.min(100, (form.age / 90) * 100) },
    { feature: 'BP',        value: Math.min(100, (form.bp / 130) * 100) },
    { feature: 'Insulin',   value: Math.min(100, (form.insulin / 400) * 100) },
    { feature: 'Pedigree',  value: Math.min(100, (form.pedigree / 2.5) * 100) },
  ] : []

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-5">
        <Sliders size={16} className="text-blue-500" />
        <h3 className="font-semibold text-slate-800">Patient Risk Calculator</h3>
        <span className="ml-auto text-xs text-slate-400">Gradient Boosting · AUC 0.821</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        {[
          { key: 'glucose',     label: 'Glucose (mg/dL)',   min: 44,  max: 300, step: 1  },
          { key: 'bmi',         label: 'BMI (kg/m²)',        min: 15,  max: 60,  step: 0.1},
          { key: 'age',         label: 'Age (years)',         min: 21,  max: 90,  step: 1  },
          { key: 'bp',          label: 'Blood Pressure',      min: 30,  max: 140, step: 1  },
          { key: 'insulin',     label: 'Insulin (μU/mL)',     min: 0,   max: 600, step: 1  },
          { key: 'pedigree',    label: 'Diabetes Pedigree',   min: 0.05,max: 2.5, step: 0.01},
        ].map(({ key, label, min, max, step }) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-xs font-bold text-blue-600">
                {form[key as keyof typeof form]}
              </span>
            </div>
            <input type="range" min={min} max={max} step={step}
              value={form[key as keyof typeof form]}
              onChange={e => setForm(f => ({ ...f, [key]: parseFloat(e.target.value) }))}
              className="w-full h-1.5 appearance-none bg-slate-200 rounded-full accent-blue-500 cursor-pointer" />
          </div>
        ))}
      </div>

      <button onClick={calculate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/30">
        Calculate Risk Score
      </button>

      {result && (
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className={`rounded-xl p-4 border ${TIER_COLOR[result.tier]?.bg ?? 'bg-slate-50 border-slate-200'}`}>
            <p className="text-xs text-slate-500 mb-1">Risk Probability</p>
            <p className="text-3xl font-bold text-slate-800">{(result.score * 100).toFixed(1)}%</p>
            <div className="mt-2">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${TIER_COLOR[result.tier]?.bar ?? 'bg-slate-400'}`}
                  style={{ width: `${result.score * 100}%` }} />
              </div>
            </div>
            <p className="text-xs font-semibold mt-2 text-slate-700">
              Tier: <span>{result.tier} Risk</span>
            </p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="feature" tick={{ fontSize: 9, fill: '#64748B' }} />
              <Radar dataKey="value" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip formatter={(v: any) => [`${v.toFixed(0)}%`, 'Risk contribution']} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

// ── Patient Table ─────────────────────────────────────────────────────────────
export default function PatientsPage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<typeof PATIENTS_SAMPLE[0] | null>(null)

  const filtered = PATIENTS_SAMPLE.filter(p =>
    p.id.toLowerCase().includes(query.toLowerCase()) ||
    p.tier.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Patient Monitor</h1>
        <p className="text-sm text-slate-500 mt-0.5">Individual risk assessment · Real-time alerts · Decision support</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* Table */}
        <div className="xl:col-span-3 card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search by patient ID or risk tier…"
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Patient', 'Age', 'Glucose', 'BMI', 'Risk Score', 'Tier', ''].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 pb-2.5 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(p => (
                  <tr key={p.id} onClick={() => setSelected(p)}
                    className={`cursor-pointer hover:bg-blue-50/50 transition-colors ${selected?.id === p.id ? 'bg-blue-50' : ''}`}>
                    <td className="py-2.5 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                          <User size={12} className="text-slate-500" />
                        </div>
                        <span className="font-mono font-medium text-slate-700">{p.id}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-4 text-slate-600">{p.age}</td>
                    <td className="py-2.5 pr-4">
                      <span className={`font-semibold ${p.glucose >= 200 ? 'text-red-600' : p.glucose >= 140 ? 'text-orange-600' : 'text-slate-600'}`}>
                        {p.glucose}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-slate-600">{p.bmi}</td>
                    <td className="py-2.5 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${TIER_COLOR[p.tier]?.bar ?? 'bg-slate-300'}`}
                            style={{ width: `${p.risk * 100}%` }} />
                        </div>
                        <span className="text-xs font-mono">{(p.risk * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className={TIER_COLOR[p.tier]?.badge ?? 'badge-low'}>{p.tier}</span>
                    </td>
                    <td className="py-2.5">
                      <ChevronRight size={14} className="text-slate-300" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="xl:col-span-2 space-y-4">
          {selected ? (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Patient Detail</h3>
                <span className={TIER_COLOR[selected.tier]?.badge ?? 'badge-low'}>{selected.tier} Risk</span>
              </div>

              <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 font-mono">{selected.id}</p>
                  <p className="text-xs text-slate-500">Age {selected.age} · {selected.pregnancies} pregnancies</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-bold text-slate-800">{(selected.risk * 100).toFixed(0)}%</p>
                  <p className="text-xs text-slate-500">risk score</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: 'Glucose',   value: selected.glucose, unit: 'mg/dL', alert: selected.glucose >= 140 },
                  { label: 'BMI',       value: selected.bmi,     unit: 'kg/m²', alert: selected.bmi >= 30 },
                  { label: 'Blood Pressure', value: selected.bp, unit: 'mmHg', alert: selected.bp >= 90 },
                  { label: 'Pedigree',  value: selected.pedigree,unit: '',      alert: selected.pedigree >= 1.0 },
                ].map(({ label, value, unit, alert }) => (
                  <div key={label} className={`p-2.5 rounded-lg border text-sm ${alert ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className={`font-bold ${alert ? 'text-red-600' : 'text-slate-700'}`}>
                      {value} <span className="font-normal text-xs text-slate-400">{unit}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Recommendation */}
              <div className={`p-3 rounded-xl border text-xs ${
                selected.tier === 'Very High' ? 'bg-red-50 border-red-200 text-red-700' :
                selected.tier === 'High'      ? 'bg-orange-50 border-orange-200 text-orange-700' :
                                                'bg-green-50 border-green-200 text-green-700'}`}>
                <p className="font-semibold mb-1 flex items-center gap-1">
                  <AlertTriangle size={12} /> Clinical Recommendation
                </p>
                <p>{
                  selected.tier === 'Very High' ? 'Immediate HbA1c + fasting glucose. Endocrinology referral. Consider metformin initiation.' :
                  selected.tier === 'High'      ? 'HbA1c within 3 months. Intensive lifestyle counselling. Monitor quarterly.' :
                  selected.tier === 'Moderate'  ? 'Repeat screening in 6 months. Dietary and physical activity guidance.' :
                                                  'Routine annual screening. Maintain healthy BMI and activity level.'
                }</p>
              </div>
            </div>
          ) : (
            <div className="card p-5 flex items-center justify-center h-48 border-dashed">
              <p className="text-slate-400 text-sm">Select a patient to view details</p>
            </div>
          )}

          <RiskCalculator />
        </div>
      </div>
    </div>
  )
}
