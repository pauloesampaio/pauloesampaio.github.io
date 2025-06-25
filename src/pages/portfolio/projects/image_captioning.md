---
layout: /src/layouts/ProjectLayout.astro
title: "LLM product description generator"
pubDate: 2025-04-05
description: "LLM to automate the creation of product description tailored for your audience"
languages: []
image:
  url: "/src/content/staticData/pictures/product_description.png"
  alt: "Project thumbnail"
---

In this project we leverage the generative power of Google Gemini to create tailored product descriptions based on a single product image. The model adapts its tone and content to match three specific audience profiles:

**SEO Optimized**: Crafted to maximize search engine visibility, incorporating relevant keywords, clear product attributes, and structured language that ranks well on Google.

**Millennials**: Descriptions emphasize practicality, lifestyle integration, and emotional appeal with a touch of modern, professional language.

**Gen-Z**: Punchy, playful, and packed with slang, emojis, and pop culture references to drive engagement on platforms like TikTok and Instagram.

This tool is perfect for automating A/B testing, personalizing marketplace content, and scaling product copy production. Let your marketers focus on high-impact campaigns while LLMs handle the long-tail content with consistency and speed.

## 🧩 Features

- 🔍 Description generation for multiple audiences (SEO, Millennial, Gen-Z) from a single product image
- 🧠 Uses Google Gemini for multimodal (image + text) understanding
- 🧪 A/B testing–ready outputs

## 💡 Technologies used

- Google Gemini Pro Vision – Multimodal LLM for image-to-text generation
- Python – Core backend and data pipeline
- Streamlit – Rapid development of the demo interface

## 🌐 Resources

👉 [View live demo](https://fashion-image-caption.streamlit.app) - feel free to wake it back up in case it is sleeping

👉 [Github repo](https://github.com/pauloesampaio/auto_image_caption)
