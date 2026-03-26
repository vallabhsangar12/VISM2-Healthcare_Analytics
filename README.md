# Healthcare Analytics – Month 2 | Vinayak IT Solutions Internship

A full healthcare data science project built on the **Pima Indians Diabetes Dataset**.
Each task progressively builds toward a complete clinical ML pipeline.

---

## Project Structure

```
Month2/
├── Task1/    ← Exploratory Data Analysis (EDA)
├── Task2/    ← Feature Engineering + ML Models  (upcoming)
├── Task3/    ← Model Evaluation + Optimization  (upcoming)
└── Task4/    ← Clinical Dashboard / Deployment  (upcoming)
```

---

## Task 1 — Exploratory Data Analysis (EDA)

**File:** `Task1/healthcare_task1.ipynb`

### What's covered:
| Section | Description |
|---|---|
| Dataset Overview | 768 patients, 8 clinical features, binary outcome |
| HIPAA Documentation | Data privacy compliance documentation |
| Data Quality | Zero-value detection + median imputation |
| Descriptive Statistics | Group-wise stats (Diabetic vs Non-Diabetic) |
| Hypothesis Testing | Independent T-tests with H₀/H₁ framework |
| Visualizations | 8 publication-quality clinical charts |
| Clinical Interpretations | Medical insights for every visualization |
| Key Clinical Insights | Top predictors + epidemiological findings |
| Risk Segmentation | High / Medium / Low risk stratification (ADA-aligned) |
| Conclusion | Findings + real-world clinical applications |

### Key Findings:
- **Glucose** is the strongest predictor (r = 0.47, p < 0.001)
- **BMI + Age** are the 2nd and 3rd strongest risk factors
- **~47%** of patients fall into the High-Risk category
- All 8 features are statistically significant (p < 0.001)

---

## Dataset
**Pima Indians Diabetes Dataset** — National Institute of Diabetes & Digestive Diseases (NIDDK)
768 female patients | 8 physiological features | Binary diabetes outcome

---

## Tech Stack
`Python` · `Pandas` · `NumPy` · `Matplotlib` · `Seaborn` · `SciPy` · `Jupyter Notebook`
