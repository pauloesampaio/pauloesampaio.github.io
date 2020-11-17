---
title: Multi-thread image download and process pipeline using metaflow and OpenCV
excerpt: A lot of times you have to download images from the internet. Here's my attempt to use multi-thread to speed it up. As a bonus, a bit of image pre-processing.
excerpt_separator: "<!--more-->"
layout: single
categories:
- Blog
tags:
- pipelines
- metaflow
- opencv
- multi-process
- multi-thread
- parallelizing 
header:
  teaser: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-10-31-download_and_process_pipeline/teaser_image.jpg
classes: wide
s3_bucket: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-10-31-download_and_process_pipeline
repo_name: pictures_downloader
---

{% include repo_card.html %}

So, working with computer vision, a lot of time you have to download thousands of images from the internet, right? This can be time consuming, specially if you don't use all your computer power. Python, by default, doesn't use all of your computer processing power. So here instead of download one image after the other sequentially, we'll use [multi-threading](https://docs.python.org/3/library/concurrent.futures.html) to start as many downloads in parallel as possible. We'll also use [Metaflow](https://metaflow.org/), Netflix's framework for building pipelines, to help us organize the tasks and [OpenCV](https://github.com/opencv/opencv/wiki/Deep-Learning-in-OpenCV) to do some simple yet effective pre processing steps.

## Before we start

So, on [this repo](https://github.com/pauloesampaio/scraping_dresses) I described how I scraped some retailers websites and stored images urls on MongoDB. So I'll get my images url from this database. If you don't have your data on MongoDB, you can or build your own database query function or provide urls on a cvs file.

## Download pipeline

So, as mentioned above, I built a pipeline using Metaflow. It has the following steps:

<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/pipeline.jpg" alt="">
<figcaption>Pipeline steps</figcaption>
</figure>

A little bit about each step:

- Load config: On the `./config/config.yml` there's all the pipeline configurations, including where to save, if it should query MongoDB or get urls from local file, if it should run preprocess function and so on
- Load credentials: If on the config file it is set to query MongoDB, load the needed credentials.
- Get download list: Get urls to be downloaded from remote database or from local csv file. It is set for MongoDB, but feel free to modify it for any database you use.
- Load preprocess requirements: If on config it is set to run preprocess, there a function to load any dependencies of these functions. For instance, on this example I'm doing a face detection and removal function. In order to run it, the models need to be available. So this function downloads it if needed.
- Download images: Here we start the download (and if desired, preprocess) jobs. Using multi-thread we can take advantage of all cores, making downloading all the images way faster. You can just download the images or do some preprocessing on them. You just need to set a function to do whatever you want. As I'm running on fashion catalog images, as an example I'm removing face, resizing and trimming useless background to isolate the product.

## A bit about the preprocess step

So, OpenCV now has a deep neural network module that have a great face detection algorithm, a clear improvement over the good old [cascade based face detection](https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_objdetect/py_face_detection/py_face_detection.html) that used to be the standard opencv face detection model. As I'm working with fashion catalog images, I'm assuming a maximum of 1 face per image.

After the face detection and removal, I'm resizing and trimming useless background. This is interesting, what I'm doing is:

- applying a simple gaussian blur to smooth things a bit
- Starting from all te edges (right, left, top and bottom), I'm getting the variance of the pixel column or row.
- If this variance is below a given threshold, it is useless background and I remove it.
- I run this iteratively, using different thresholds to be sure that I'm not trimming too much (or too little)

Putting on a scheme, face detection + variance based trimming works like this:
<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/process_example.jpg" alt="">
<figcaption>Pipeline steps</figcaption>
</figure>

## Run in a docker container

As always I made a `Docker` file and `docker-compose`, so you can easily run this in a container by doing:

```bash
docker-compose build
```

To build the image and

```bash
docker-compose up
```

To run it

## Closing thoughts

Using multi-processing or multi-threading can drastically speed up running time of any code and should be used whenever possible. One caveat of the [python standard implementation](https://docs.python.org/3/library/concurrent.futures.html) is that it expects to receive one parameter, that's why I'm using a helper function and passing a list [here](https://github.com/pauloesampaio/pictures_downloader/blob/03c0fb3e4cd325094e310fc0f96e6a1c7973b214/downloader/downloader_functions.py#L83). Also I wanted to split the download and preprocess in 2 different steps in metaflow, but I had some problems creating a queue and passing the images in batches instead. It seems to work when coupled with AWS, but I wanted to create a local running example. In any case, it is a good starting point for anyone wanting to play around with downloading and processing images.
