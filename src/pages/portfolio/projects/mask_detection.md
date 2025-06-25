---
layout: /src/layouts/ProjectLayout.astro
title: "Mask detection and alert system"
pubDate: 2025-04-05
description: "End-to-end pipeline for image detection, classification and alarm system"
languages: []
image:
  url: "/images/projects/mask_project.gif"
  alt: "Project thumbnail"
---

This was a fun and timely project born during the pandemic. One day I saw a sign in my apartment building that read:
“Mandatory use of masks in all areas”, and I found myself wondering:
“But how would anyone actually check?”

With a Raspberry Pi equipped with a camera sitting idle, I built an end-to-end system to monitor mask usage in real time. If someone was detected without a mask, the system would automatically send a WhatsApp alert.

The pipeline included:

- 🖼️ Building a small custom dataset of masked and unmasked faces
- 🎥 Using a Raspberry Pi camera as a real-time video stream source
- 🧑‍🔬 Running face detection to crop and extract face regions from each frame
- 🧠 Training a CNN to classify mask usage
- ☁️ Deploying the model to a cloud server with FastAPI for inference
- 📲 Integrating WhatsApp notifications via Twilio

It was a lighthearted side project during uncertain times, and a great opportunity to work with hardware, computer vision, and real-time systems.

## 🧩 Features

- 🧠 Real-time face detection and mask classification
- 📷 Raspberry Pi as a low-cost edge device
- ☁️ Cloud-hosted inference API for efficient processing
- 🔔 WhatsApp notifications for non-compliance alerts
- 🧪 Custom training pipeline with CNN model

## 💡 Technologies used

- OpenCV – Face detection and image processing
- TensorFlow / Keras – CNN training for mask detection
- FastAPI – Lightweight inference API
- Raspberry Pi – Real-time video streaming hardware
- Twilio API – WhatsApp messaging integration
- Docker – Reproducible environment for running the server
- Python – Core backend and data flow orchestration

## 🌐 Resources

👉 [Github repo](https://github.com/pauloesampaio/mask_detector)

👉 [Blog post (in portuguese)](https://pauloesampaio.medium.com/usando-tensorflow-e-um-raspberry-pi-para-ver-se-você-está-de-máscara-40258ef91a5c)
