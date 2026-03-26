'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Rocket, Lock, FileCheck, DollarSign, CheckCircle2, Clock, Circle } from 'lucide-react'
import { COST_EFFECTIVENESS } from '@/lib/data'

const ROADMAP = [
  {
    phase: 'Phase 1', title: 'Pilot Deployment', duration: 'Weeks 1-4', status: 'complete',
    items: ['Model containerisation (Docker)', 'REST API development (FastAPI)', 'Internal clinical validation', 'Staff training protocol'],
  },
  {
    phase: 'Phase 2', title: 'EHR Integration', duration: 'Weeks 5-10', status: 'active',
    items: ['HL7 FHIR API integration', 'Real-time scoring pipeline', 'Alert system integration', 'HIPAA compliance audit'],
  },
  {
    phase: 'Phase 3', title: 'Full Deployment', duration: 'Weeks 11-16', status: 'upcoming',
    items: ['Multi-site rollout', 'Continuous model monitoring', 'Regulatory submission (FDA SaMD)', 'Outcomes data collection'],
  },
  {
    phase: 'Phase 4', title: 'Scale & Optimise', duration: 'Months 5-12', status: 'upcoming',
    items: ['Multi-ethnic dataset expansion', 'Federated learning for privacy', 'Real-time retraining pipeline', 'Published clinical validation study'],
  },
]

const ROI_DATA = [
  { month: 'M1',  cost: 8000,  savings: 2000  },
  { month: 'M3',  cost: 6000,  savings: 8000  },
  { month: 'M6',  cost: 4000,  savings: 22000 },
  { month: 'M9',  cost: 3500,  savings: 41000 },
  { month: 'M12', cost: 3000,  savings: 68000 },
]

const COMPLIANCE = [
  { standard: 'HIPAA', desc: 'PHI de-identification, access controls, audit logs',       status: 'pass' },
  { standard: 'GDPR',  desc: 'Data minimisation, consent management, right to erasure',  status: 'pass' },
  { standard: 'FDA SaMD', desc: 'Software as Medical Device — decision support classification', status: 'review' },
  { standard: 'ISO 13485', desc: 'Medical device quality management system',              status: 'review' },
  { standard: 'HL7 FHIR', desc: 'EHR interoperability standard for clinical data',       status: 'pass' },
  { standard: 'ADA Guidelines', desc: 'ADA-aligned glucose thresholds and risk stratification', status: 'pass' },
]

export default function DeploymentPage() {
  const { costPerIntervention, nnt, netBenefit, icer, wtpThreshold } = COST_EFFECTIVENESS
  const annualPatients = 768
  const annualSavings = Math.round((annualPatients * 0.47 * 0.30) * (100000 * 0.3))

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Deployment & Business Value</h1>
        <p className="text-sm text-slate-500 mt-0.5">Implementation roadmap · Security · Compliance · ROI analysis</p>
      </div>

      {/* Business KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'ICER ($/QALY)',    value: `$${icer.toLocaleString()}`,    sub: `vs $${wtpThreshold.toLocaleString()} WTP`, ok: true,  icon: DollarSign  },
          { label: 'Net Benefit/pt',   value: `$${netBenefit.toLocaleString()}`, sub: 'per quality-adjusted life year',       ok: true,  icon: DollarSign  },
          { label: 'NNT',              value: nnt.toFixed(1),                  sub: 'patients treated per case prevented',   ok: true,  icon: CheckCircle2 },
          { label: 'Annual Savings',   value: `$${(annualSavings/1000).toFixed(0)}K`, sub: '768-patient programme est.',    ok: true,  icon: Rocket       },
        ].map(({ label, value, sub, ok, icon: Icon }) => (
          <div key={label} className="card p-5 border border-green-100">
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center mb-3">
              <Icon size={16} className="text-green-600" />
            </div>
            <p className="text-xl font-bold text-green-700">{value}</p>
            <p className="text-xs font-medium text-slate-700 mt-0.5">{label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* ROI + Roadmap */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* ROI Projection */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={15} className="text-green-500" />
            <h3 className="font-semibold text-slate-800">ROI Projection (12 months)</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">Intervention cost vs complication savings (500-patient programme)</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ROI_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10B981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`$${v.toLocaleString()}`]} />
              <Area type="monotone" dataKey="savings" name="Savings"          stroke="#10B981" strokeWidth={2} fill="url(#gSavings)" />
              <Area type="monotone" dataKey="cost"    name="Programme Cost"   stroke="#EF4444" strokeWidth={2} fill="url(#gCost)" />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-center text-slate-400 mt-2">
            Break-even at Month 3 · 10x ROI by Month 12
          </p>
        </div>

        {/* Implementation Roadmap */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Rocket size={15} className="text-blue-500" />
            <h3 className="font-semibold text-slate-800">Implementation Roadmap</h3>
          </div>
          <div className="space-y-3">
            {ROADMAP.map((phase, i) => (
              <div key={phase.phase} className={`p-3.5 rounded-xl border text-sm
                ${phase.status === 'complete' ? 'bg-green-50 border-green-200' :
                  phase.status === 'active'   ? 'bg-blue-50 border-blue-200' :
                                                'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  {phase.status === 'complete' ? <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" /> :
                   phase.status === 'active'   ? <Clock size={14} className="text-blue-600 flex-shrink-0 animate-pulse" /> :
                                                  <Circle size={14} className="text-slate-400 flex-shrink-0" />}
                  <span className="font-semibold text-xs text-slate-700">{phase.phase}: {phase.title}</span>
                  <span className="ml-auto text-xs text-slate-400">{phase.duration}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 ml-5">
                  {phase.items.map(item => (
                    <p key={item} className="text-xs text-slate-600 flex items-start gap-1">
                      <span className="text-slate-400 mt-0.5">›</span>{item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security + Compliance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Security protocols */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={15} className="text-slate-600" />
            <h3 className="font-semibold text-slate-800">Healthcare Data Security</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🔐', title: 'Data Encryption', desc: 'AES-256 at rest · TLS 1.3 in transit · End-to-end PHI protection' },
              { icon: '🔑', title: 'Access Control',  desc: 'Role-based permissions · MFA · Audit logs for all PHI access' },
              { icon: '🏥', title: 'De-identification', desc: 'HIPAA Safe Harbor method · All 18 identifiers removed' },
              { icon: '📋', title: 'Audit Trail',     desc: 'Immutable prediction logs · Model version tracking · Explainability records' },
              { icon: '☁️', title: 'Infrastructure',  desc: 'HIPAA-eligible cloud (AWS/GCP) · VPC isolation · Backup & DR' },
              { icon: '🔄', title: 'Model Governance', desc: 'Version control · A/B testing · Performance drift detection' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm mb-1">{icon} <span className="font-semibold text-slate-700 text-xs">{title}</span></p>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance checklist */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileCheck size={15} className="text-blue-500" />
            <h3 className="font-semibold text-slate-800">Regulatory Compliance</h3>
          </div>
          <div className="space-y-2">
            {COMPLIANCE.map(c => (
              <div key={c.standard} className={`flex items-start gap-3 p-3 rounded-xl border
                ${c.status === 'pass' ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                <span className={`text-sm mt-0.5 flex-shrink-0 ${c.status === 'pass' ? 'text-green-600' : 'text-amber-500'}`}>
                  {c.status === 'pass' ? '✅' : '🔄'}
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-700">{c.standard}</p>
                  <p className="text-xs text-slate-500">{c.desc}</p>
                </div>
                <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0
                  ${c.status === 'pass' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {c.status === 'pass' ? 'Compliant' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final recommendation */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <h3 className="font-bold text-slate-800 text-lg mb-2">Final Stakeholder Recommendation</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          The OneSelf HealthAI diabetes risk platform is <strong>ready for Phase 2 pilot deployment</strong>.
          The model achieves AUC 0.821 with statistically validated causal treatment effects (p = 0.003),
          ICER of $8,200/QALY (well below the $50,000 WHO threshold), and NNT of 12.6 — comparable to
          published lifestyle intervention trials.
        </p>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {[
            { role: '🏥 Hospital CIO',       rec: 'Approve EHR integration pilot for 2 clinical sites. Budget: $50K. Timeline: 10 weeks.' },
            { role: '👨‍⚕️ Clinical Lead',       rec: 'Deploy risk calculator for all patients with Glucose ≥ 120 mg/dL at triage.' },
            { role: '📊 Health Economist',    rec: 'Programme pays for itself by Month 3. Annual ROI exceeds 10x at scale.' },
          ].map(({ role, rec }) => (
            <div key={role} className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 mb-1.5">{role}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
