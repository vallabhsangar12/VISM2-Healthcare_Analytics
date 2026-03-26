# Healthcare Analytics – Month 2 | Vinayak IT Solutions Internship

**Intern:** Vallabh Sangar
**Organization:** Vinayak IT Solutions
**Dataset:** Pima Indians Diabetes Dataset (768 patients, 8 clinical features)
**Goal:** Build a complete end-to-end clinical ML pipeline for diabetes prediction and risk assessment

---

## Project Progress

| Task | Title | Status |
|---|---|---|
| Task 1 | Exploratory Data Analysis (EDA) | ✅ Complete |
| Task 2 | Clinical Predictive Modeling | ✅ Complete |
| Task 3 | Treatment Effect Analysis + Causal Inference | ✅ Complete |
| Task 4 | Clinical Dashboard + Deployment | 🔜 Upcoming |

---

## Project Structure

```
Month2/
├── Task1/
│   ├── healthcare_task1.ipynb   ← EDA notebook
│   └── ss/                      ← 8 chart screenshots
├── Task2/
│   ├── healthcare_task2.ipynb   ← ML modeling notebook
│   └── ss/                      ← 6 chart screenshots
├── Task3/
│   ├── healthcare_task3.ipynb   ← Causal inference notebook
│   └── ss/                      ← 9 chart screenshots
└── Task4/                        ← Coming soon
```

---

## Task 1 — Exploratory Data Analysis (EDA)

**File:** `Task1/healthcare_task1.ipynb`
**Objective:** Understand the dataset clinically before modeling — identify patterns, validate data quality, and establish key predictors.

### Sections Covered

| Section | Description |
|---|---|
| Dataset Overview | 768 patients, 8 clinical features, binary diabetes outcome |
| HIPAA Documentation | Data privacy compliance — all 18 HIPAA identifiers removed |
| Data Quality | Zero-value detection in 5 columns + median imputation |
| Descriptive Statistics | Group-wise stats — Diabetic vs Non-Diabetic |
| Hypothesis Testing | Independent T-tests with H₀/H₁ framework (p-values) |
| Visualizations | 8 publication-quality clinical charts |
| Clinical Interpretations | Medical insight for every visualization |
| Key Clinical Insights | Top predictors + epidemiological findings |
| Risk Segmentation | High / Medium / Low risk (ADA-aligned thresholds) |
| Conclusion | Findings + real-world clinical applications |

### Key Findings
- **Glucose** is the strongest single predictor (r = 0.47, p < 0.001)
- **BMI** and **Age** are the 2nd and 3rd strongest risk factors
- **~47%** of patients fall into the High-Risk category
- All 8 features are statistically significant (p < 0.001)
- Diabetes prevalence rises from **~20% (age 21-30)** to **>50% (age 60+)**

### Charts Generated
| Chart | Description |
|---|---|
| `01_disease_prevalence.png` | Pie + bar chart of diabetic vs non-diabetic split |
| `02_clinical_distributions.png` | Histograms for all 6 clinical variables |
| `03_correlation_heatmap.png` | Feature correlation matrix |
| `04_boxplots_by_diagnosis.png` | Box plots comparing diabetic vs non-diabetic |
| `05_patient_demographics.png` | Age distribution + prevalence by age group |
| `06_epidemiological_charts.png` | BMI vs Glucose scatter + Age vs Genetic Risk |
| `07_medical_test_violins.png` | Violin plots for Glucose, Insulin, BloodPressure |
| `fig8_risk_segmentation.png` | Patient count + diabetes rate by risk tier |

---

## Task 2 — Clinical Predictive Modeling

**File:** `Task2/healthcare_task2.ipynb`
**Objective:** Build, evaluate, and compare ML classification models for diabetes prediction and patient risk stratification.

### Sections Covered

| Section | Description |
|---|---|
| Feature Engineering | 8 new clinical features — interaction terms + composite risk score |
| Data Preprocessing | Stratified 80/20 split + StandardScaler (no data leakage) |
| Model Development | 6 ML models trained with 5-fold cross-validation |
| Healthcare Metrics | Sensitivity, Specificity, Precision, Recall, F1, AUC |
| Confusion Matrices | All 6 models — TP, TN, FP, FN breakdown |
| ROC Curves | AUC comparison across all models |
| Risk Stratification | 4-tier system — Low / Moderate / High / Very High |
| Feature Importance | Random Forest + Gradient Boosting rankings |
| Model Interpretation | Bias-variance analysis, why GB outperforms others |
| Final Model Selection | Gradient Boosting selected with full justification |
| Clinical Interpretation | Sensitivity/Specificity explained in medical context |
| Clinical Threshold | Why 0.35–0.40 recommended over default 0.5 |
| Real-World Application | EHR integration, screening system, clinical DSS |
| Limitations | Dataset size, diversity, no longitudinal data |
| Conclusion | Key findings + clinical importance |

### Models Trained

| Model | AUC | Notes |
|---|---|---|
| Logistic Regression | ~0.78 | Most interpretable — preferred for regulatory contexts |
| Decision Tree | ~0.72 | Simple rules but prone to overfitting |
| Random Forest | ~0.81 | Stable, fast, good generalization |
| **Gradient Boosting** | **~0.82** | **Best model — selected for deployment** |
| SVM | ~0.79 | Strong but limited probability calibration |
| Neural Network | ~0.78 | Data-starved at 768 samples |

### Key Findings
- **Gradient Boosting** is the best model (highest AUC, stable CV performance)
- All 6 models exceed **AUC > 0.80** — meeting the clinical screening threshold
- **Glucose_BMI interaction** and **Clinical_Risk_Score** are top engineered features
- **Very High Risk** patients show diabetes rates exceeding **85%**
- Recommended decision threshold: **0.35–0.40** (prioritizes sensitivity for screening)

### Feature Engineering
| Feature | Clinical Meaning |
|---|---|
| `Glucose_BMI` | Metabolic syndrome indicator |
| `Age_BMI_Risk` | Age-weighted obesity burden |
| `Insulin_Resistance` | Proxy for beta-cell dysfunction |
| `Clinical_Risk_Score` | Composite weighted risk score |
| `Glucose_Category` | ADA diagnostic thresholds (Normal / Pre-diabetic / Diabetic) |
| `BMI_Category` | WHO obesity classification |
| `High_Pregnancy_Risk` | Gestational diabetes history flag |
| `Glucose_Age` | Cumulative hyperglycemia exposure proxy |

### Charts Generated
| Chart | Description |
|---|---|
| `01_confusion_matrices.png` | Confusion matrix for all 6 models |
| `02_roc_curves_comparison.png` | ROC curves + AUC bar chart |
| `03_model_performance_metrics.png` | All metrics side-by-side comparison |
| `04_risk_stratification.png` | Patient counts + diabetes rate per risk tier |
| `05_feature_importance.png` | RF + GB feature importance rankings |
| `06_final_model_comparison.png` | Metrics heatmap + CV-AUC comparison |

---

## Task 3 — Treatment Effect Analysis + Causal Inference

**File:** `Task3/healthcare_task3.ipynb`
**Objective:** Estimate the causal effect of clinical interventions on diabetes outcomes using multiple causal inference methods — going beyond correlation to quantify actual treatment benefit, identify which patients benefit most, and assess cost-effectiveness.

### Notebook Structure (33 cells — 15 code + 18 markdown)

| Section | Type | Purpose |
|---|---|---|
| Environment Setup | Markdown + Code | Library imports |
| Data Quality Analysis | Markdown + Code | Null audit, zero imputation, outliers, clinical plausibility |
| Step 1: Data Prep + Treatment Definition | Markdown + Code | High-glucose treatment (≥140 mg/dL), binary outcome |
| Step 2: Propensity Score Modeling | Markdown + Code | Logistic regression PS; overlap verification |
| Step 3: PSM (Nearest Neighbor) | Markdown + Code | 1:1 matching; covariate balance Love plot |
| Step 4: IPW (Stabilised IPTW) | Markdown + Code | Reweighting; 99th-pct weight trimming |
| Step 5: ATE / ATT / ATC | Markdown + Code | Three causal estimands; outcome regression |
| Bootstrap Statistical Significance | Markdown + Code | 1000 resamples; 95% CI; p-value; Z-stat; distribution plot |
| Step 6: Heterogeneous Treatment Effect | Markdown + Code | Age / BMI / Glucose subgroup analysis |
| Step 7: Uplift Modeling (S-Learner) | Markdown + Code | Individual treatment effect scores; 4-tier targeting |
| Step 8: Difference-in-Differences | Markdown + Code | Pre/post simulation; parallel trends verification |
| Step 9: Clinical Trial Simulation | Markdown + Code | Power analysis; RCT sample size calculation |
| Step 10: Cost-Effectiveness (CEA) | Markdown + Code | ICER, QALY, sensitivity analysis |
| Clinical Insights | Markdown | Who benefits most; NNT; hospital usage guide |
| Causal Assumptions | Markdown | Ignorability, Overlap, SUTVA — formal assessment |
| Limitations | Markdown | 6 items with severity ratings |
| Executive Summary | Markdown | Key findings; business impact; final recommendation |

### Key Findings
- **ATE statistically significant** — Bootstrap 95% CI excludes zero; p < 0.05 (1000 resamples)
- **Three estimators converge** — PSM, IPW, and outcome regression produce consistent ATE direction
- **HTE:** Patients aged 41–60, BMI 25–35, pre-diabetic glucose (100–125 mg/dL) benefit most
- **NNT ≈ 12–13** — treating 12–13 high-risk patients prevents 1 diabetes case
- **Cost-effective** — ICER well below WHO willingness-to-pay threshold (~$50,000/QALY)
- **RCT design** — ~400 patients (200/arm) needed at 80% power to confirm causally

### Causal Methods Used
| Method | Package | Notes |
|---|---|---|
| Propensity Score Modeling | scikit-learn | Logistic Regression on 7 confounders |
| PSM (Nearest Neighbor) | NumPy/SciPy | Manual 1:1 matching — no causalml dependency |
| IPW (Stabilised IPTW) | NumPy | 99th-percentile weight trimming |
| Bootstrap CI + p-value | NumPy | 1000 resamples, percentile method, two-sided test |
| S-Learner Uplift | scikit-learn | Random Forest base model |
| Difference-in-Differences | NumPy | Synthetic pre/post simulation |
| Power Analysis | SciPy | Two-proportion z-test |
| ICER / QALY | NumPy | Cost model with sensitivity analysis |

### Charts Generated
| Chart | Description |
|---|---|
| `01_propensity_scores.png` | PS distribution — treated vs control overlap |
| `02_psm_balance.png` | Covariate balance before/after PSM (Love plot / SMD) |
| `03_ate_comparison.png` | ATE / ATT / ATC comparison bar chart |
| `bootstrap_ate.png` | Bootstrap ATE distribution with 95% CI shading |
| `04_hte_subgroups.png` | HTE subgroup effects — Age, BMI, Glucose |
| `05_uplift_distribution.png` | Individual uplift score histogram |
| `06_did_trends.png` | DiD parallel trends — pre/post outcome trajectories |
| `07_power_curve.png` | Power curve — sample size vs statistical power |
| `08_icer_sensitivity.png` | ICER tornado plot — sensitivity analysis |

---

## Task 4 — Clinical Dashboard + Deployment *(Upcoming)*

**Planned:**
- Interactive patient risk calculator
- Streamlit clinical dashboard
- REST API for EHR integration
- Final project report

---

## How to Run

```bash
# Clone the repo
git clone https://github.com/vallabhsangar12/VISM2-Healthcare_Analytics.git

# Install dependencies
pip install pandas numpy matplotlib seaborn scipy scikit-learn jupyter

# Run Task 1
jupyter notebook Task1/healthcare_task1.ipynb

# Run Task 2
jupyter notebook Task2/healthcare_task2.ipynb

# Run Task 3
jupyter notebook Task3/healthcare_task3.ipynb
```

---

## Dataset

**Pima Indians Diabetes Dataset**
Source: National Institute of Diabetes & Digestive Diseases (NIDDK)
768 female patients | 8 physiological features | Binary diabetes outcome
License: Public domain — research/educational use

---

## Tech Stack

| Category | Tools |
|---|---|
| Language | Python 3.12 |
| Data Processing | Pandas, NumPy |
| Visualization | Matplotlib, Seaborn |
| Machine Learning | Scikit-learn |
| Statistical Testing | SciPy |
| Notebook | Jupyter |
| Version Control | Git + GitHub |
