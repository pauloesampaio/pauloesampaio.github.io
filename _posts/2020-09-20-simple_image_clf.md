---
title: Deploying simple image classifier to Heroku (tensorflow, stramlit and heroku)
excerpt: I wanted to test streamlit as a simple front end for a pre-trained image classification model. In order to do a proper test, deployed it to Heroku.
excerpt_separator: "<!--more-->"
layout: single
categories:
- Blog
tags:
- Streamlit
- Tensorflow
- Heroku
header:
  teaser: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-09-20-simple-image-clf/teaser_image.jpg
classes: wide
s3_bucket: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-09-20-simple-image-clf
repo_name: simple_image_clf
---
***

{% include repo_card.html %}

So everybody was talking about [streamlit](https://www.streamlit.io/) and how easy it was to create an "app" (more like a simple front end) for data science projects, so I wanted to test it. Before, usually I would do that using [flask](https://flask.palletsprojects.com/en/1.1.x/) or [dash](https://plotly.com/dash/) and I got to say... Streamlit is waaaay simpler and straight to the point. 

In this project, I used a pre-trained convolutional neural network to create a image classifier using [tensorflow](https://www.tensorflow.org/). Then, using streamlit, created a simple web front-end where user can input a image url. The model will classify the image in one of the [imagenet categories](https://github.com/raghakot/keras-vis/blob/master/resources/imagenet_class_index.json) and display it. Finally, deployed it on [Heroku server](https://www.heroku.com/), open to public.

<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/app.jpg" alt="">
<figcaption>Deployed and public simple image classifier</figcaption>
</figure>

## About the code
Nothing too fancy here:
- Function to download image from url and resize it to a target size
- Pre process image according to the convolutional neural net used
- Decode result from index to imagenet category name
- Made a function to load the model just to be able to cache it
- Use simple st.write to make the streamlit output

## About deploying 
A couple of tricks:
- I used `tensorflow-cpu` on the requirements to reduce slug size (free tier limits it to around 500MB)
- When creating the app on heroku, I connect it to a github branch, in this case the `heroku-deploy` branch of my repo, and opted to automatic deploy. 
<figure style="width: 100%"  class="align-center">
<img src="{{ page.s3_bucket }}/options.jpg" alt="">
<figcaption>Deployed and public simple image classifier</figcaption>
</figure>
- So every time I push to this branch, it automatically triggers a deployments
<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/deploying.jpg" alt="">
<figcaption>Deployed and public simple image classifier</figcaption>
</figure>
- I created a `setup.sh` with streamlit configuration. I got this from the [streamlit docs](https://docs.streamlit.io/en/stable/streamlit_faq.html?highlight=deploy#deploying-streamlit)
- On the `Procfile`, I run the `setup.sh` and then the streamlit app

Well, that's basically it!

## Closing thoughts
I can totally understand all the hype around streamlit, since it makes building a web front end to showcase your model results incredibly easy, and usually this is an area where a lot of data scientists have trouble, specially the ones coming from a statistics/maths background. I'll probably be using it to prototype simple apps quick and easy!

See you around!

