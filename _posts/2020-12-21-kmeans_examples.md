---
title: Retro style image quantization with k-Means
excerpt: Another educational post - I needed to explain k-means to some students and wanted a different use case to make it more engaging.
excerpt_separator: "<!--more-->"
layout: single
categories:
- Blog
tags:
- kmeans
- sklearn
- quantization
- segmentation
- streamlit
header:
  teaser: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-12-21-kmeans_examples/teaser_image.jpg
classes: wide
s3_bucket: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-12-21-kmeans_examples
repo_name: kmeans
---

{% include repo_card.html %}

I needed to talk about [k-means](https://en.wikipedia.org/wiki/K-means_clustering) to a group of students. Cool, I really enjoy talking with students and k-means is something easy, simple to explain and truly useful. I wanted to try to showcase something different - there are a lot of k-means examples around talking about users or product segmentation. Naturally I could use my [MSc dissertation](https://upcommons.upc.edu/handle/2117/77312), that used k-means to segment image regions... but this was 2014, there are more interesting ways to segment images and, to be honest, I am a bit tired of using it as example. So I was looking at some retro games and remembered when I was playing computer games in the 80s, and the coolest thing was when I changed my monochrome CRT monitor to an awesome 16 colors EGA monitor! So using k-means to downgrade a current 8-bit, 16 Million colors image to a 16 color old school image sounded like an interesting use case to explain it!

## How it works

It is easy:

- I'm resizing the image so the largest side has 128 pixels (just so it runs faster)
- I'm converting the image from RGB to [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV) (for me HSV makes more sense for clustering, since there is less correlation between dimensions)
- Then I'm reshaping the image to a pixel list (one row for each pixel, columns are the H, S and V values)
- Fitting a k-means instance to cluster pixels into the number of colours you desire to see. 16 for instance.
- Get the label assigned to each one of the pixels and reshape it back to the original image shape, and color them using the cluster centroid.

That's it.
!["Lechuck"](https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-12-21-kmeans_examples/lechuck.jpg)Basically [LeChuck](https://monkeyisland.fandom.com/wiki/LeChuck), from the 80s classic Monkey Island

Probably it would be better to use the medoid instead of the centroid, but I will leave that for another conversation.

## Running

I'm providing a [streamlit](https://www.streamlit.io/) app so you can experiment with any image url and any number of clusters.

Install all the requirements listed on the `requirements.txt`, do a `streamlit run k_means_demo.py` and you should be good to go!

If you are into `docker`, I'm providing a `Dockerfile`and a `docker-compose.yml` so you can easily run with `docker-compose up`.

## Notebooks

As this is an educational repo, I also add a notebook with a traditional k-means application using the [UCI wholesale dataset](https://archive.ics.uci.edu/ml/datasets/wholesale+customers) and a notebook describing the image segmentation I used on the MSc dissertation. Both on the `notebooks` folder.

## Closing thoughts

Whenever I have to teach something, I try to bring some interesting application to make it more engaging and memorable. Hope you enjoy this application, feel free to let me know what you think or if you have any other interesting k-means use to share!