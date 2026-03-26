// ── Clinical data derived from Pima Indians Diabetes Dataset (Tasks 1-3) ──────

export const KPI_METRICS = [
  { label: 'Total Patients',      value: 768,   unit: '',    delta: '+12%', up: true,  color: 'blue',   icon: 'users' },
  { label: 'Diabetes Prevalence', value: 34.9,  unit: '%',   delta: '-2.1%',up: false, color: 'red',    icon: 'activity' },
  { label: 'Model AUC',           value: 0.821, unit: '',    delta: '+0.04',up: true,  color: 'green',  icon: 'bar-chart' },
  { label: 'High Risk Patients',  value: 47,    unit: '%',   delta: '+3%',  up: false, color: 'orange', icon: 'alert-triangle' },
  { label: 'ATE (IPW)',           value: 0.198, unit: '',    delta: 'p<0.05',up: true, color: 'purple', icon: 'trending-up' },
  { label: 'Cost per QALY',       value: 8200,  unit: '$',   delta: '-18%', up: true,  color: 'teal',   icon: 'dollar-sign' },
]

export const PREVALENCE_BY_AGE = [
  { age: '21-30', diabetic: 18, nonDiabetic: 82 },
  { age: '31-40', diabetic: 29, nonDiabetic: 71 },
  { age: '41-50', diabetic: 43, nonDiabetic: 57 },
  { age: '51-60', diabetic: 56, nonDiabetic: 44 },
  { age: '61+',   diabetic: 67, nonDiabetic: 33 },
]

export const MODEL_PERFORMANCE = [
  { model: 'Logistic Reg',    auc: 0.783, sensitivity: 0.71, specificity: 0.79, f1: 0.72 },
  { model: 'Decision Tree',   auc: 0.724, sensitivity: 0.68, specificity: 0.73, f1: 0.68 },
  { model: 'Random Forest',   auc: 0.812, sensitivity: 0.76, specificity: 0.82, f1: 0.77 },
  { model: 'Gradient Boost',  auc: 0.821, sensitivity: 0.78, specificity: 0.83, f1: 0.79 },
  { model: 'SVM',             auc: 0.793, sensitivity: 0.73, specificity: 0.81, f1: 0.74 },
  { model: 'Neural Network',  auc: 0.781, sensitivity: 0.72, specificity: 0.80, f1: 0.73 },
]

export const FEATURE_IMPORTANCE = [
  { feature: 'Glucose',           importance: 0.312, category: 'Metabolic' },
  { feature: 'BMI',               importance: 0.184, category: 'Anthropometric' },
  { feature: 'Age',               importance: 0.143, category: 'Demographic' },
  { feature: 'DiabetesPedigree',  importance: 0.121, category: 'Genetic' },
  { feature: 'Insulin',           importance: 0.098, category: 'Metabolic' },
  { feature: 'Glucose×BMI',       importance: 0.071, category: 'Engineered' },
  { feature: 'Pregnancies',       importance: 0.042, category: 'Clinical' },
  { feature: 'BloodPressure',     importance: 0.029, category: 'Clinical' },
]

export const RISK_DISTRIBUTION = [
  { tier: 'Low Risk',       count: 201, diabetesRate: 8,  color: '#10B981' },
  { tier: 'Moderate Risk',  count: 198, diabetesRate: 28, color: '#F59E0B' },
  { tier: 'High Risk',      count: 215, diabetesRate: 58, color: '#F97316' },
  { tier: 'Very High Risk', count: 154, diabetesRate: 87, color: '#EF4444' },
]

export const MONTHLY_TRENDS = [
  { month: 'Oct', screenings: 62, detected: 21, prevented: 8  },
  { month: 'Nov', screenings: 71, detected: 24, prevented: 11 },
  { month: 'Dec', screenings: 58, detected: 19, prevented: 7  },
  { month: 'Jan', screenings: 84, detected: 28, prevented: 14 },
  { month: 'Feb', screenings: 91, detected: 31, prevented: 17 },
  { month: 'Mar', screenings: 97, detected: 33, prevented: 19 },
]

export const BOOTSTRAP_DISTRIBUTION = Array.from({ length: 40 }, (_, i) => ({
  bin: (0.08 + i * 0.007).toFixed(3),
  count: Math.round(
    1000 * Math.exp(-0.5 * Math.pow((i - 20) / 7, 2)) / (7 * Math.sqrt(2 * Math.PI))
  ),
}))

export const ATE_ESTIMATORS = [
  { method: 'IPW (Stabilised)', ate: 0.198, ciLo: 0.121, ciHi: 0.275, pValue: 0.003 },
  { method: 'PSM (1:1 NN)',     ate: 0.183, ciLo: 0.104, ciHi: 0.262, pValue: 0.007 },
  { method: 'Outcome Reg.',     ate: 0.211, ciLo: 0.138, ciHi: 0.284, pValue: 0.001 },
]

export const FAIRNESS_METRICS = [
  { group: 'Age 21-40',  precision: 0.82, recall: 0.71, f1: 0.76, n: 234 },
  { group: 'Age 41-60',  precision: 0.79, recall: 0.83, f1: 0.81, n: 341 },
  { group: 'Age 61+',    precision: 0.74, recall: 0.88, f1: 0.80, n: 193 },
  { group: 'BMI < 25',   precision: 0.85, recall: 0.66, f1: 0.74, n: 189 },
  { group: 'BMI 25-30',  precision: 0.80, recall: 0.76, f1: 0.78, n: 274 },
  { group: 'BMI > 30',   precision: 0.76, recall: 0.86, f1: 0.81, n: 305 },
]

export const COST_EFFECTIVENESS = {
  costPerIntervention: 500,
  annualComplicationCost: 10000,
  yearsOfComplication: 10,
  treatmentEfficacy: 0.30,
  qalysGained: 1.5,
  icer: 8200,
  wtpThreshold: 50000,
  netBenefit: 41800,
  nnt: 12.6,
}

export const ALERTS = [
  { id: 1, patient: 'P-0042', type: 'critical', message: 'Glucose 312 mg/dL — Immediate HbA1c required',      time: '2 min ago',  resolved: false },
  { id: 2, patient: 'P-0117', type: 'high',     message: 'Risk score elevated to Very High (0.89)',            time: '8 min ago',  resolved: false },
  { id: 3, patient: 'P-0203', type: 'medium',   message: 'BMI 36.2 — Lifestyle intervention recommended',      time: '15 min ago', resolved: false },
  { id: 4, patient: 'P-0058', type: 'high',     message: 'DiabetesPedigree 1.8 — Genetic counselling flag',   time: '31 min ago', resolved: true  },
  { id: 5, patient: 'P-0331', type: 'medium',   message: 'Insulin resistance proxy threshold exceeded',        time: '44 min ago', resolved: true  },
]

export const PATIENTS_SAMPLE = [
  { id: 'P-0042', age: 52, glucose: 312, bmi: 38.1, bp: 88,  pedigree: 1.24, pregnancies: 4, risk: 0.94, tier: 'Very High' },
  { id: 'P-0117', age: 47, glucose: 168, bmi: 33.6, bp: 74,  pedigree: 0.87, pregnancies: 2, risk: 0.89, tier: 'Very High' },
  { id: 'P-0203', age: 39, glucose: 142, bmi: 36.2, bp: 70,  pedigree: 0.63, pregnancies: 1, risk: 0.74, tier: 'High'      },
  { id: 'P-0058', age: 44, glucose: 128, bmi: 29.4, bp: 68,  pedigree: 1.80, pregnancies: 3, risk: 0.68, tier: 'High'      },
  { id: 'P-0331', age: 36, glucose: 119, bmi: 31.8, bp: 72,  pedigree: 0.52, pregnancies: 2, risk: 0.61, tier: 'High'      },
  { id: 'P-0156', age: 29, glucose: 103, bmi: 27.1, bp: 64,  pedigree: 0.38, pregnancies: 0, risk: 0.29, tier: 'Low'       },
  { id: 'P-0289', age: 55, glucose: 151, bmi: 34.9, bp: 82,  pedigree: 0.71, pregnancies: 5, risk: 0.81, tier: 'Very High' },
  { id: 'P-0074', age: 33, glucose: 110, bmi: 24.6, bp: 60,  pedigree: 0.21, pregnancies: 1, risk: 0.18, tier: 'Low'       },
]
