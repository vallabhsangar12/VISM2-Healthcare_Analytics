'use client'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ErrorBar, ReferenceLine, Legend
} from 'recharts'
import { FEATURE_IMPORTANCE, ATE_ESTIMATORS, BOOTSTRAP_DISTRIBUTION, MODEL_PERFORMANCE } from '@/lib/data'
import { TrendingUp, GitBranch, Zap } from 'lucide-react'

const FEATURE_COLORS: Record<string, string> = {
  Metabolic: '#0EA5E9', Anthropometric: '#8B5CF6', Demographic: '#F59E0B',
  Genetic: '#10B981', Engineered: '#EF4444', Clinical: '#94A3B8',
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-xl text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{typeof p.value === 'number' ? p.value.toFixed(4) : p.value}</strong>
        </p>
      ))}
    </div>
  )
}

export default function InsightsPage() {
  const ateData = ATE_ESTIMATORS.map(a => ({
    ...a,
    ciRange: [a.ciLo, a.ciHi],
    error: [[a.ate - a.ciLo], [a.ciHi - a.ate]],
  }))

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Model Insights</h1>
        <p className="text-sm text-slate-500 mt-0.5">Feature importance · Causal ATE · Bootstrap validation · Model comparison</p>
      </div>

      {/* ATE Comparison + Bootstrap */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* ATE Estimators */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={15} className="text-blue-500" />
            <h3 className="font-semibold text-slate-800">ATE Estimator Comparison</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">IPW · PSM · Outcome Regression — with 95% CI</p>

          <div className="space-y-4">
            {ATE_ESTIMATORS.map(a => (
              <div key={a.method} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">{a.method}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                    ${a.pValue < 0.01 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    p = {a.pValue}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${(a.ate / 0.3) * 100}%` }} />
                    </div>
                    {/* CI range indicator */}
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>CI: [{a.ciLo.toFixed(3)}, {a.ciHi.toFixed(3)}]</span>
                      <span className="font-bold text-blue-600">ATE: {a.ate.toFixed(3)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">
                  {a.ciLo > 0
                    ? '✅ CI excludes zero — statistically significant at α = 0.05'
                    : '⚠️ CI includes zero — effect not significant'}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700">
            <strong>Interpretation:</strong> All three estimators converge on ATE ≈ 0.19–0.21.
            High-glucose patients have ~20pp higher diabetes probability after full confounder adjustment.
          </div>
        </div>

        {/* Bootstrap Distribution */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={15} className="text-purple-500" />
            <h3 className="font-semibold text-slate-800">Bootstrap ATE Distribution</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">1,000 resamples · Empirical 95% CI · p-value</p>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={BOOTSTRAP_DISTRIBUTION.slice(2, 38)}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="bin" tick={{ fontSize: 9, fill: '#94A3B8' }}
                interval={4} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x="0.198" stroke="#EF4444" strokeWidth={2}
                label={{ value: 'ATE', fill: '#EF4444', fontSize: 10, position: 'top' }} />
              <ReferenceLine x="0.121" stroke="#F97316" strokeWidth={1.5} strokeDasharray="4 2"
                label={{ value: 'CI Lo', fill: '#F97316', fontSize: 9, position: 'top' }} />
              <ReferenceLine x="0.275" stroke="#F97316" strokeWidth={1.5} strokeDasharray="4 2"
                label={{ value: 'CI Hi', fill: '#F97316', fontSize: 9, position: 'top' }} />
              <Bar dataKey="count" name="Frequency" fill="#8B5CF6" opacity={0.7} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: 'ATE',        value: '0.198',          color: 'text-red-600'    },
              { label: '95% CI',     value: '[0.121, 0.275]', color: 'text-orange-600' },
              { label: 'p-value',    value: '0.003',          color: 'text-green-600'  },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-slate-50 rounded-lg p-2.5 text-center border border-slate-100">
                <p className="text-xs text-slate-500">{label}</p>
                <p className={`text-sm font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Importance + Model Comparison */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Feature Importance */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-1">
            <GitBranch size={15} className="text-green-500" />
            <h3 className="font-semibold text-slate-800">Feature Importance (Gradient Boosting)</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">Relative contribution to diabetes risk prediction</p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={FEATURE_IMPORTANCE} layout="vertical"
              margin={{ top: 0, right: 40, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" domain={[0, 0.35]} tickFormatter={v => v.toFixed(2)}
                tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <YAxis dataKey="feature" type="category" tick={{ fontSize: 11, fill: '#64748B' }} width={110} />
              <Tooltip formatter={(v: any) => [(v * 100).toFixed(1) + '%', 'Importance']} />
              <Bar dataKey="importance" name="Importance" radius={[0, 4, 4, 0]}>
                {FEATURE_IMPORTANCE.map((f, i) => (
                  <Cell key={i} fill={FEATURE_COLORS[f.category] ?? '#94A3B8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 mt-3">
            {Object.entries(FEATURE_COLORS).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-1 text-xs text-slate-500">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Model Comparison Table */}
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Full Model Comparison</h3>
          <p className="text-xs text-slate-500 mb-4">5-fold cross-validation · Healthcare metrics</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Model', 'AUC', 'Sensitivity', 'Specificity', 'F1'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 pb-2.5 pr-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MODEL_PERFORMANCE.map(m => (
                  <tr key={m.model}
                    className={`${m.model === 'Gradient Boost' ? 'bg-blue-50' : ''}`}>
                    <td className="py-2.5 pr-3 font-medium text-slate-700">
                      {m.model === 'Gradient Boost' && <span className="text-blue-500 mr-1">★</span>}
                      {m.model}
                    </td>
                    {[m.auc, m.sensitivity, m.specificity, m.f1].map((v, i) => (
                      <td key={i} className="py-2.5 pr-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${m.model === 'Gradient Boost' ? 'bg-blue-500' : 'bg-slate-400'}`}
                              style={{ width: `${v * 100}%` }} />
                          </div>
                          <span className={m.model === 'Gradient Boost' ? 'font-bold text-blue-700' : 'text-slate-600'}>
                            {v.toFixed(3)}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700">
            <strong>★ Selected:</strong> Gradient Boosting — highest AUC (0.821), best sensitivity (0.78).
            In healthcare, sensitivity is prioritised to minimise false negatives (missed diagnoses).
          </div>
        </div>
      </div>
    </div>
  )
}
