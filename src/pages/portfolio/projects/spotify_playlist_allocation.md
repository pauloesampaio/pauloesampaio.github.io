---
layout: /src/layouts/ProjectLayout.astro
title: "Spotify music classifier"
pubDate: 2025-04-05
description: "Teaching supervised learning using spotify playlist"
languages: []
image:
  url: "/images/projects/spotify.webp"
  alt: "Project thumbnail"
---

This project dates back to 2020, during the early days of the pandemic. At the time, I was teaching an online data science course and wanted a fun, relatable way to explain supervised learning to students stuck behind their screens.

To bring the concept to life, I used the Spotify API to download song features from two playlists: one curated by me, and one by my wife. Then I trained a simple neural network to classify whether a given track was more likely to be in my playlist or hers.

This example served as a playful but effective way to walk through:

- Supervised learning concepts (classification, train/test split, overfitting)
- Neural network architecture and training with TensorFlow
- t-SNE visualizations to explain embeddings and clustering

It was a lighthearted, accessible project that really clicked with students — and made machine learning feel more personal.

More details in the GitHub repo.

## 🧩 Features

- 🎧 Uses Spotify API to pull playlist song features (tempo, danceability, valence, etc.)
- 🧠 Simple neural network using TensorFlow/Keras for binary classification
- 🌐 Interactive t-SNE visualization of learned embeddings
- 🧪 Modular code for teaching purposes and classroom demos

## 💡 Technologies used

- TensorFlow / Keras – Neural network modeling
- t-SNE – Dimensionality reduction for embedding visualization
- Docker – Reproducible environment for running the app
- Python – Core logic and data wrangling
- Streamlit – Interactive UI for visualizing classification and embeddings

## 🌐 Resources

👉 [Github repo](https://github.com/pauloesampaio/spotify_song_classifier)

👉 [Blog post (in portuguese)](https://pauloesampaio.medium.com/https-medium-com-paulo-sampaio-classification-351a0e3592e9)
