---
layout: /src/layouts/ProjectLayout.astro
title: "LLM based text-to-image and image-to-image search"
pubDate: 2025-04-05
description: "Based on text or image, find closest product on database."
languages: []
image:
  url: "/src/content/staticData/pictures/text_image_search.png"
  alt: "Thumbnail of Astro arches."
---

This project explores the capabilities of multimodal models to encode both text and images into the same embedding space, enabling seamless nearest neighbor search based on either modality.

This unlocks intuitive and flexible product search experiences:
• 🔴 Text-to-image search: Search with a natural language prompt like “a powerful and dramatic red dress” and retrieve visually matching products.
• 🖼 Image-to-image search: Upload a photo of a look you love and discover similar items across the catalog.

At the core of this system is OpenAI’s CLIP, used for embedding both product images and search queries into a shared vector space. The retrieval is powered by FAISS, Meta’s efficient similarity search library.

The online demo uses a small dataset (~100 products from online fashion retailers), so results should be viewed as a proof-of-concept rather than a production system.

## 🧩 Features

- 🔍 Multimodal embedding of images and text into a shared vector space
- 🧠 FAISS-based fast nearest neighbor retrieval
- 🧪 Dual search modes: text-to-product and image-to-product
- 📸 Visual preview of top matches
- 📊 Suitable for e-commerce, fashion tech, and style-based recommendation engines

## 💡 Technologies used

- OpenAI CLIP – Multimodal text/image encoder (via Hugging Face Transformers)
- FAISS – Scalable vector index and similarity search
- Python – Core backend and logic
- Streamlit – UI for demo and result display
- Pandas / NumPy – Dataset handling and result formatting

## 🌐 Resources

👉 [View live demo](https://fashion-multimodal-matcher.streamlit.app) - feel free to wake it back up in case it is sleeping

👉 [Github repo](https://github.com/pauloesampaio/multimodal_matcher)
