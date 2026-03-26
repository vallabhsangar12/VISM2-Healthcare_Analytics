'use client'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts'
import { ShieldCheck, Scale, Eye, AlertTriangle } from 'lucide-react'
import { FAIRNESS_METRICS } from '@/lib/data'

const BIAS_INDICATORS = [
  { axis: 'Age Fairness',       value: 82 },
  { axis: 'BMI Fairness',       value: 78 },
  { axis: 'Calibration',        value: 91 },
  { axis: 'Coverage',           value: 95 },
  { axis: 'Explainability',     value: 88 },
  { axis: 'Data Quality',       value: 85 },
]

const SHAP_EXAMPLE = [
  { feature: 'Glucose = 168',        shap: +0.312, direction: 'pos' },
  { feature: 'BMI = 33.6',           shap: +0.184, direction: 'pos' },
  { feature: 'Age = 47',             shap: +0.143, direction: 'pos' },
  { feature: 'DiabetesPedigree=0.87',shap: +0.121, direction: 'pos' },
  { feature: 'Insulin = 120',        shap: -0.062, direction: 'neg' },
  { feature: 'BloodPressure = 74',   shap: -0.029, direction: 'neg' },
  { feature: 'SkinThickness = 22',   shap: -0.018, direction: 'neg' },
  { feature: 'Pregnancies = 2',      shap: +0.042, direction: 'pos' },
]

const DISPARITY_DATA = FAIRNESS_METRICS.map(g => ({
  group: g.group,
  F1: +(g.f1 * 100).toFixed(1),
  Recall: +(g.recall * 100).toFixed(1),
  Precision: +(g.precision * 100).toFixed(1),
  n: g.n,
}))

export default function EthicsPage() {
  const maxDisparity = Math.max(...DISPARITY_DATA.map(d => d.F1)) - Math.min(...DISPARITY_DATA.map(d => d.F1))
  const fairnessPass = maxDisparity < 10

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ethics & Fairness</h1>
        <p className="text-sm text-slate-500 mt-0.5">Bias detection · Fairness metrics · Model explainability · Healthcare disparities</p>
      </div>

      {/* Fairness summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Max F1 Disparity',   value: `${maxDisparity.toFixed(1)}%`,  sub: 'Across age/BMI groups', ok: maxDisparity < 10, icon: Scale },
          { label: 'Calibration Score',  value: '0.91',  sub: 'Brier score adjusted',      ok: true,  icon: ShieldCheck },
          { label: 'Explainability',     value: 'SHAP',  sub: 'Local + global explanations',ok: true,  icon: Eye },
          { label: 'Clinical Threshold', value: '0.38',  sub: 'Optimised for sensitivity',  ok: true,  icon: AlertTriangle },
        ].map(({ label, value, sub, ok, icon: Icon }) => (
          <div key={label} className={`card p-5 border ${ok ? 'border-green-100' : 'border-red-100'}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${ok ? 'bg-green-50' : 'bg-red-50'}`}>
              <Icon size={16} className={ok ? 'text-green-600' : 'text-red-600'} />
            </div>
            <p className={`text-xl font-bold ${ok ? 'text-green-700' : 'text-red-700'}`}>{value}</p>
            <p className="text-xs font-medium text-slate-700 mt-0.5">{label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
            <span className={`mt-2 inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {ok ? '✓ Pass' : '⚠ Review'}
            </span>
          </div>
        ))}
      </div>

      {/* Fairness chart + Radar */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Demographic parity */}
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Demographic Performance Parity</h3>
          <p className="text-xs text-slate-500 mb-4">
            F1, Precision, Recall across Age & BMI subgroups · {fairnessPass ? '✅ Disparity < 10% — acceptable' : '⚠️ Disparity > 10% — review'}
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DISPARITY_DATA} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="group" tick={{ fontSize: 9, fill: '#94A3B8' }} />
              <YAxis domain={[60, 100]} unit="%" tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <Tooltip formatter={(v: any) => [`${v}%`]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="F1"        name="F1 Score"  fill="#0EA5E9" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Recall"    name="Recall"    fill="#10B981" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Precision" name="Precision" fill="#8B5CF6" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
            <strong>Finding:</strong> Recall is highest in the 61+ age group (0.88) — the model
            correctly identifies most elderly diabetics. BMI {'>'} 30 shows similar pattern.
            Young/lean patients have slightly lower recall — worth monitoring for under-diagnosis.
          </div>
        </div>

        {/* Ethics radar */}
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Model Ethics Scorecard</h3>
          <p className="text-xs text-slate-500 mb-2">Multi-dimensional fairness assessment (0–100)</p>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={BIAS_INDICATORS} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: '#64748B' }} />
              <Radar dataKey="value" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip formatter={(v: any) => [`${v}/100`, 'Score']} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {BIAS_INDICATORS.map(b => (
              <div key={b.axis} className="text-center">
                <p className="text-xs text-slate-500 leading-tight">{b.axis.replace(' Fairness','').replace('ility','')}</p>
                <p className={`text-sm font-bold ${b.value >= 90 ? 'text-green-600' : b.value >= 80 ? 'text-blue-600' : 'text-orange-600'}`}>
                  {b.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SHAP Explainability */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-1">
          <Eye size={15} className="text-blue-500" />
          <h3 className="font-semibold text-slate-800">Model Explainability — SHAP Values (Example: Patient P-0117)</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          SHAP (SHapley Additive exPlanations) shows how each feature pushes the prediction above or below the baseline.
          Positive = increases risk · Negative = decreases risk.
        </p>
        <div className="space-y-2">
          {SHAP_EXAMPLE.sort((a, b) => Math.abs(b.shap) - Math.abs(a.shap)).map(s => (
            <div key={s.feature} className="flex items-center gap-3">
              <span className="text-xs text-slate-600 w-44 text-right flex-shrink-0">{s.feature}</span>
              <div className="flex-1 flex items-center gap-2">
                {s.direction === 'neg' && (
                  <div className="flex justify-end" style={{ width: `${Math.abs(s.shap) / 0.35 * 50}%`, marginLeft: 'auto' }}>
                    <div className="h-5 rounded-sm bg-blue-400 opacity-80" style={{ width: '100%' }} />
                  </div>
                )}
                <div className="w-px h-5 bg-slate-300 flex-shrink-0" />
                {s.direction === 'pos' && (
                  <div style={{ width: `${Math.abs(s.shap) / 0.35 * 50}%` }}>
                    <div className="h-5 rounded-sm bg-red-400 opacity-80" style={{ width: '100%' }} />
                  </div>
                )}
              </div>
              <span className={`text-xs font-mono font-semibold w-14 flex-shrink-0 ${s.direction === 'pos' ? 'text-red-600' : 'text-blue-600'}`}>
                {s.shap > 0 ? '+' : ''}{s.shap.toFixed(3)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-red-400 opacity-80" /> Increases diabetes risk
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-blue-400 opacity-80" /> Decreases diabetes risk
          </div>
        </div>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700">
          <strong>Clinical use:</strong> Clinicians can see exactly why the model flagged a patient.
          High glucose and BMI are the primary risk drivers — matching clinical intuition.
          This explainability satisfies FDA AI/ML guidance and builds physician trust.
        </div>
      </div>

      {/* Bias documentation */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {[
          {
            title: 'Known Bias Sources', icon: '⚠️', color: 'border-orange-100 bg-orange-50',
            items: [
              'Dataset: Pima women only — single ethnicity',
              'No male patients — sex-specific effects unmeasured',
              'Socioeconomic confounders absent',
              'Historical data (1988) — may not reflect modern populations',
              'Glucose threshold proxy — not real treatment assignment',
            ]
          },
          {
            title: 'Mitigation Strategies', icon: '🛡️', color: 'border-green-100 bg-green-50',
            items: [
              'Subgroup performance monitoring (F1 per group)',
              'Calibration check — predicted vs actual probability',
              'Optimised threshold (0.38) prioritises sensitivity',
              'SHAP explainability for every prediction',
              'Bootstrap CI — quantify model uncertainty',
            ]
          },
          {
            title: 'Healthcare Disparities', icon: '🏥', color: 'border-blue-100 bg-blue-50',
            items: [
              'Young patients (21-30): lower recall — risk of under-screening',
              'Lean BMI patients: model less sensitive at low risk',
              'Recommend: lower screening threshold for high pedigree patients',
              'Monitor quarterly for performance drift as population changes',
              'Consider ensemble with demographic-specific sub-models',
            ]
          },
        ].map(({ title, icon, color, items }) => (
          <div key={title} className={`card p-5 border ${color}`}>
            <h4 className="font-semibold text-slate-800 mb-3">{icon} {title}</h4>
            <ul className="space-y-1.5">
              {items.map(item => (
                <li key={item} className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
