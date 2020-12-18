---
title: Getting spotify tracks features and classifying them with tensorflow
excerpt: I needed to explain the basics of neural nets to some students. Thought it would be interesting and engaging to use spotify track features to do it!
excerpt_separator: "<!--more-->"
layout: single
categories:
- Blog
tags:
- spotify
- api
- tensorflow
- deep learning
- neural networks
- tsne
header:
  teaser: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-12-18-spotify_song_classifier/teaser_image.jpg
classes: wide
s3_bucket: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-12-18-spotify_song_classifier
repo_name: spotify_song_classifier
---

{% include repo_card.html %}

One time my wife and I were watching some concert on TV and we joked about overlapping music taste and how hard would be to decide which one of us would like a given song. So, initially as a joke, I accessed Spotify's API to get our liked songs features and built a simple classification model to decide between the two of us, for which one the song was more recommended. Since then, I used this model several times to teach classification algorithms, since it is a simple task yet interesting and relevant to most students.

## Project set up

I'll be using the [spotipy library](https://spotipy.readthedocs.io/en/2.16.1/) to connect to Spotify and query their APIs. In order to access the endpoints, you need to register on the [Spotify for developers](https://developer.spotify.com/), so you have a `CLIENT_ID, CLIENT_SECRET` and `REDIRECT_URI`, which should be stored on the `./credentials/credentials.json`. You also need to have a user tokens for each one of the users that you want to access the songs. The [Spotipy documentation](https://spotipy.readthedocs.io/en/2.16.1/#authorization-code-flow) describes this process quite well and I suggest you to take a look at it and follow a couple of examples on how to authenticate. In any case, I'm providing a template for the credentials file on `./credentials/credentials.json`.

All configurations are on the `./config/config.yml` file. The main blocks are:

- paths configurations: Paths to save data, models and where are the credentials
- users: Spotify user ID you want to use
- model: Instructions on how to build the neural network (number of layers, activation function)
- features: Which features to use and how to perform simple feature pre processing

## Tensorflow model

I wanted a simple neural network to use as example with students, but to give them flexibility to test different architectures. So I create a builder that, based on what is set on the config file, builds MLP network. You define the number of layers, number of neurons and activation function and the `build_model` function creates the network. As I'm working with only 2 users, this is a binary classification task and it is set up using binary cross entropy as loss function, but I might add that as an option to the builder too.

There is also the early stopping callback, in order to spot the training if the validation loss doesn't decrease in 5 consecutive epochs and saving the best model so far. This helps avoid overfitting by overtraining.

## Visualizing results

The `training_spotipy_model.py` script trains the model and print some metrics, mainly ROC AUC, F1 Score and a confusion matrix. But even more interesting it is visualizing the results. In order to do that, I'm getting the output of the last hidden layer (right before classification) and using t-SNE to reduce dimensionality to 2 and plotting it, using the labels as colours. That way we can actually visualize how the network is transforming the input:

{% include posts/2020-12-18-spotify_song_classifier/tsne_plot.html %}

So the interesting thing here is to check the points that look out of place (for instance blue dots on regions with lots of orange dots)

- For instance: on the left hand side of the plot, you have Soundgarden's black hole sun it is marked in blue, meaning it is a song my wife liked, and it is sitting nearby songs that I liked like Guns and Roses' Estranged and Ugly Kid Joe's everything about you, which makes total sense in terms of quality of embedding, and also says something regarding overlap in music taste
- Same thing you can see an orange dot on the right hand side for Hall and Oates' You make my dreams com true, song that I liked in a neighborhood of orange dots representing more upbeat/dancy/happier songs from Lady Gaga and such, meaning again - embedding is looking good and there are overlaps in our taste in both spectrums
- In terms of classification, this means that I would not expect a super accurate classifier - I'm getting F1-Score of about 80% which I consider good enough for this level of overlapping and it is true - there are days that I like Lady Gaga, there are days that I like Iron Maiden!

## Running

There are 3 main commands:

- `python get_spotify_data.py`: This will get the data form spotify for the users on `config.yml`
- `python train_spotipy_model.py`: This performs feature preprocessing/engineering, builds a MLP model, trains it and print a couple of metrics (AUC ROC, F1 score, confusion matrix)
- `streamlit run tsne_plot.py`: Starts a simple webserver with t-SNE interactive visualization.

## Docker

I'm providing a `Dockerfile` image and a `docker-compose.yml` in case you want to run in a container. One caveat - you need to have the tokens already cached. This limitation is due to the fact that when you authenticate for the first time, it opens a python `raw_input` for you to input the URL provided by the authenticator, which doesn't work well on docker. So run the `get_data` once locally to get the tokens and then you can use docker.

## API rate limit

As many APIs, there is a rate limit, so if your `get_data` starts to throw 429 or 503, most likely you hit the API too much. Wait for a bit before running it again. I never had this problem since I'm just getting around 500 songs, but I heard some issues about it.

## Closing thoughts

This was made with educational purposes, mainly to explain simple MLP classification algorithms, there's even a [medium post I wrote about it](https://medium.com/@paulo_sampaio/https-medium-com-paulo-sampaio-classification-351a0e3592e9) - in portuguese. Also this is a good exercise in learning about connecting to APIs - authorization, access token, rate limits and so on. Analyzing the results as mentioned above is a fun exercise and might so I do encourage everyone to play around with it and maybe even discover new songs to like!
