'use client'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import KpiCard from '@/components/KpiCard'
import AlertFeed from '@/components/AlertFeed'
import {
  KPI_METRICS, PREVALENCE_BY_AGE, MODEL_PERFORMANCE,
  RISK_DISTRIBUTION, MONTHLY_TRENDS
} from '@/lib/data'

const TIER_COLORS = ['#10B981', '#F59E0B', '#F97316', '#EF4444']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xl text-sm">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="text-xs">
          {p.name}: <strong>{p.value}{p.name.includes('Rate') || p.name.includes('Diabetic') ? '%' : ''}</strong>
        </p>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clinical Analytics Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">Pima Indians Diabetes Dataset · 768 patients · Real-time risk intelligence</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-slate-600 font-medium">Live Dashboard</span>
          <span className="text-slate-400 text-xs ml-1">Updated just now</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {KPI_METRICS.map((m, i) => (
          <KpiCard key={m.label} {...m} delay={i * 80} />
        ))}
      </div>

      {/* Row 1 — Monthly Trends + Risk Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Monthly Screening Trends */}
        <div className="xl:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Monthly Screening Activity</h3>
              <p className="text-xs text-slate-500">Screenings · Detections · Preventions (last 6 months)</p>
            </div>
            <span className="badge-low">+30% YoY</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_TRENDS} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gScreenings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0EA5E9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDetected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gPrevented" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10B981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="screenings" stroke="#0EA5E9" strokeWidth={2} fill="url(#gScreenings)" name="Screenings" />
              <Area type="monotone" dataKey="detected"   stroke="#EF4444" strokeWidth={2} fill="url(#gDetected)"   name="Detected"   />
              <Area type="monotone" dataKey="prevented"  stroke="#10B981" strokeWidth={2} fill="url(#gPrevented)"  name="Prevented"  />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution Pie */}
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Risk Tier Distribution</h3>
          <p className="text-xs text-slate-500 mb-3">ADA-aligned thresholds · 768 patients</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={RISK_DISTRIBUTION} cx="50%" cy="50%"
                innerRadius={50} outerRadius={80}
                dataKey="count" paddingAngle={3}>
                {RISK_DISTRIBUTION.map((_, i) => (
                  <Cell key={i} fill={TIER_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any, n: any, p: any) =>
                [`${v} patients (${p.payload.diabetesRate}% DM rate)`, p.payload.tier]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1">
            {RISK_DISTRIBUTION.map((t, i) => (
              <div key={t.tier} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: TIER_COLORS[i] }} />
                  <span className="text-slate-600">{t.tier}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">{t.count}pts</span>
                  <span className="font-semibold" style={{ color: TIER_COLORS[i] }}>{t.diabetesRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 — Model Performance + Prevalence by Age + Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Model Performance */}
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Model Performance (AUC)</h3>
          <p className="text-xs text-slate-500 mb-4">6-model comparison · 5-fold CV</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MODEL_PERFORMANCE} layout="vertical"
              margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" domain={[0.65, 0.85]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <YAxis dataKey="model" type="category" tick={{ fontSize: 10, fill: '#64748B' }} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="auc" name="AUC" radius={[0, 4, 4, 0]}>
                {MODEL_PERFORMANCE.map((m, i) => (
                  <Cell key={i} fill={m.model === 'Gradient Boost' ? '#0EA5E9' : '#CBD5E1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-center text-slate-400 mt-2">
            Gradient Boosting selected · AUC 0.821 · Best sensitivity
          </p>
        </div>

        {/* Prevalence by Age */}
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Diabetes Prevalence by Age</h3>
          <p className="text-xs text-slate-500 mb-4">Stacked % · Diabetic vs Non-Diabetic</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={PREVALENCE_BY_AGE} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="age" tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="diabetic"    name="Diabetic"     stackId="a" fill="#EF4444" radius={[0, 0, 0, 0]} />
              <Bar dataKey="nonDiabetic" name="Non-Diabetic" stackId="a" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-center text-slate-400 mt-2">
            Prevalence rises 20% → 67% across age groups
          </p>
        </div>

        {/* Alerts */}
        <AlertFeed />
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-xs text-slate-400">
        <p>OneSelf HealthAI · Month 2 Healthcare Analytics · Pima Indians Diabetes Dataset (NIDDK)</p>
        <p>Models: GB · RF · LR · DT · SVM · MLP · Causal: PSM · IPW · Bootstrap</p>
      </div>
    </div>
  )
}
