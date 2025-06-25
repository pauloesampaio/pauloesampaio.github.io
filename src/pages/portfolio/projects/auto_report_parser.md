---
layout: /src/layouts/ProjectLayout.astro
title: "LLM based medical report parser"
pubDate: 2025-04-05
description: "Use LLM to extract structured output from free text reports"
languages: []
image:
  url: "/src/content/staticData/pictures/medgemma.png"
  alt: "Project thumbnail"
github_repo: https://github.com/pauloesampaio/auto_report_parser
---

The goal of this project is to extract structured data from free-text medical reports using Large Language Models (LLMs). The business scenario is a common one:

- Many healthcare institutions and companies hold years of valuable information in unstructured formats — PDFs, DOCs, scanned reports.
- Manually extracting insights from this archive would require hundreds of hours of highly skilled, expensive labor.
- LLMs — especially domain-specific ones like Google MedGemma — offer a scalable, automated solution. However, achieving accurate results requires careful prompt engineering and robust post-processing logic.

In this project, we work specifically with pathology reports and extract a structured CSV containing the following fields:

- Tissue type
- Tumor presence
- Tumor type
- Malignancy

For the core model, we use MedGemma 3 — a 27B-parameter LLM fine-tuned for medical tasks. Due to its size, inference is run on a GPU to ensure acceptable performance and throughput.

To respect privacy regulations, real patient data cannot be shared. However, the GitHub repository includes a small open-access pathology dataset for testing purposes.

### 🧩 Features

- 📄 Converts unstructured reports into a structured, database-ready CSV
- 🧠 Uses Google MedGemma for medical-grade natural language understanding
- 🎯 Task-specific prompt engineering to ensure consistent, parseable output
- 🧪 Roleplay-style instructions to boost consistency and reduce hallucination

### 💡 Technologies Used

- Google MedGemma 3 (via Hugging Face Transformers)
- Python – Core backend, parsing, and orchestration
- Streamlit – UI layer for demo, testing, and result export
- Pandas – CSV formatting and output handling

## 🌐 Resources

👉 [Github repository](https://github.com/pauloesampaio/auto_report_parser)
