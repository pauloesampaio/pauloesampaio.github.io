---
layout: /src/layouts/ProjectLayout.astro
title: "Medical image segmentation"
pubDate: 2025-04-05
description: "Custom UNet and CNN for medical image segmentation and classification"
languages: []
image:
  url: "/images/projects/pola.png"
  alt: "Project thumbnail"
---

As part of my PhD in Biomedical Engineering, I’m developing a novel AI-driven system to assist in the detection of pancreatic cancer from ex-vivo biopsy samples. This system supports surgeons during pancreatic resection by ensuring clean surgical margins, helping reduce recurrence and improve patient outcomes.

The system combines state-of-the-art deep learning models with advanced optical imaging techniques — bringing together tools like Meta’s Segment Anything, UNet, and GradCAM to form a robust and explainable pipeline. It’s a practical example of how modern AI can be applied to solve critical challenges in biomedical imaging.

A paper detailing part of this work — including our UNet-based segmentation pipeline, CNN classification with post-processing, and tissue isolation using SAM — has been accepted for presentation at the SPIE Optics + Photonics 2025 conference. The publication and companion poster will be shared here once released in August.

🧩 Features

- 🌈 Input from multi-spectral Mueller Matrix polarimetry
- 🧠 UNet for pixel-wise tissue segmentation
- 🔬 CNN-based tissue classifier with domain-specific post-processing
- ✂️ Segment Anything Model (SAM) for tissue isolation and background removal
- 💡 GradCAM visualizations for explainability and pathologist trust
- 🧪 Integration with physical biopsy imaging workflow

💡 Technologies Used

- PyTorch Lightning – Model training and experimentation
- UNet / ResNet-based CNN – Core deep learning architectures
- GradCAM – Model explainability for classification outputs
- Meta Segment Anything (SAM) – Pre-segmentation for background removal and tissue isolation
- OpenCV / scikit-image – Polarimetric image preprocessing
- NumPy / Pandas / Matplotlib – Data manipulation and visualization
- Python – End-to-end pipeline development

🌐 Demo

## 🌐 Resources

👉 [Nature Scientific Reports (MLP Classifier)](https://www.nature.com/articles/s41598-023-43195-7)

👉 I'll update this list as new papers are released (exp: July/August 2025)
