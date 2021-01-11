---
title: Explaining predictions using shap
excerpt: A lot of times in consulting clients want to understand why a model is giving a prediction. Shap is a fantastic library to help dealing with that.
excerpt_separator: "<!--more-->"
layout: single
categories:
- Blog
tags:
- shap
- explainability
- explainable-ai
- catboost
- spotify
header:
  teaser: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2021-01-06-explainable_ai/teaser_image.jpg
classes: wide
s3_bucket: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2021-01-06-explainable_ai
---

This will be a quick one, not even a repo needed. When you are on a project, specially talking with non technical people, they don't necessarily trust predictions from a black box model. So you will need a way to explain why the model is predicting that way, or why this feature is or isn't important and so on. Shap is an excellent tool for that!

## What is Shap

Shap comes from **SH**apley **A**dditive ex**P**lanations, described [here](https://arxiv.org/pdf/1705.07874.pdf) by the authors of the library. It is model agnostic and based in game theory. Basically, it builds models with all possible combination of features, from no features at all to all features. That way, for each prediction, it can estimate the marginal impact of adding a given feature. That way, it can not only determine the feature importance but also explain how each individual feature impacted the prediction.

## An example

So let's do a quick example to explore some of the main functionalities of shap.

### Getting a model

We'll use the data from the [Spotify song classification post](https://pauloesampaio.github.io/posts/2020-12-18-spotify_song_classifier/) I published some time ago. This data have around 350 songs with its given features provided by the Spotify API and labeled as mine or my wife's. To make interpretation easier, we'll remove the "audio analysis" features (timbre and pitch), since they are more abstract and in theory already considered in the other track features. So we'll use:

- key: The key the track is in
- mode: Mode indicates the modality (major or minor) of a track
- time_signature: An estimated overall time signature of a track
- popularity: The popularity of the track
- danceability: how suitable a track is for dancing
- energy: Energy represents a perceptual measure of intensity and activity
- loudness: The overall loudness of a track in decibels (dB)
- speechiness: Detects the presence of spoken words in a track
- acousticness: A confidence measure of whether the track is acoustic
- instrumentalness: Predicts whether a track contains no vocals
- liveness: Detects the presence of an audience in the recording
- valence: A measure describing the musical positiveness conveyed by a track
- tempo: The overall estimated tempo of a track in beats per minute (BPM)
- duration_ms: The duration of the track in milliseconds

Notice that `key`, `mode` and `time signature` are categorical while the others are numeric.
We'll train a simple model with [CatBoost](https://catboost.ai/), particularly by how it deals with categorical variables without the need of one-hot-encoding, making the exercise of interpretation even more clear. I'll not pass through all the training steps here since this post is focused on the shap. What you need to know is that this is a binary classification model, where 0 represents a song that my wife would appreciate while a value of 1 represents a song more suited to my taste.

### Getting the shap values

All right, let's get to the good part. To get shap's summary plot, simply run:

```python
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X)
shap.summary_plot(shap_values, X)
```

I'm using here TreeExplainer since catboost is a tree based model. There are [other explainers available](https://shap.readthedocs.io/en/latest/api.html#explainers).
This should give you the following plot:

<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/shap_plot.jpg" alt="">
</figure>

There's a lot of information in this plot, let's take a careful look at it:

- Each row is a feature, ordered by importance
- In each row, each dot is an observation (in this case, a song)
- Each dot (or song) in each row is colored in a scale from blue to red
  - The more red, higher the value of that feature on that song. The more blue, lower the value of that feature on that song.
  - So, for instance, a blue dot on the first row (energy) means that this specific song has low energy.
- The position of the dot represent the shap value (the x-axis)
  - Shap values are like the impact in the results. So in this case, values above zero contributes positively to the results - contributes more to be on my playlist,
  - values below zero contributes negatively - pushing the song towards my wife's playlist.

So let's see if we got this right:

- Energy is the most important feature and it seems that the more energetic a song is, higher the probability the model calculates for it to be on my playlist.
- On the other hand, it seems that the model considers that the acoustic songs are more likely to be on my wife's playlist. This makes sense since, in a way, energy and acousticness can almost be seen as opposites.
- Danceability is an interesting one: it definitely weights more towards my wife's, but notice how there some red dots on the positive side. This happens because features are not isolated, they have interactions with other features. So for instance, danceability might be positive for me if a song is acoustic.
- Key doesn't really matter. It makes sense, right, we both like songs in diverse keys. It would be weird if only I care for songs in B flat or something like that. Same for time signature (most of the songs are 4/4 anyway), instrumentalness (I don't think there are many instrumental songs on these playlists), mode (same as key, we don't really care if is major or minor) and duration. Those features could probably be dropped, but I would do further analysis before that.

So this helps to explain how the model works. Now let's try to check specific predictions.
Let's first check some extremes:
There are 2 main plots that can help us with that:

```python
# Force plot
# Where i is the index of the prediction you want to check
shap.force_plot(explainer.expected_value, shap_values[i], X.iloc[i], link="logit")

# Decision plot
# Where i is again the index of the prediction you want to check
shap.decision_plot(explainer.expected_value, shap_values[i], X.iloc[i], link="logit")
```

These will yield the plots below. Let's check 2 extreme opposite songs (at least on our dataset)

**Born to raise hell (Motorhead)**
Force Plot
<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/raise_hell_force.jpg" alt="">
</figure>

Decision Plot
<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/raise_hell_decision.jpg" alt="">
</figure>

So what can we see here? Shap creates a "base value" (0.688), meaning that if it has no idea, it will guess. Remember that 0 is my wife's and 1 is me. So if no further info is given, the model will guess it is my song. This makes sense since on the dataset there's more songs from my playlist than from my wife, so it would be safe to guess me. Then we can see how the features drag this base value to closer or further from the base value. Here, except from the duration, all the feature increase the base value, driving it to 0.91! Energy and acousticness (or in that case the lack of) are the ones that impact most on the prediction. Let's now check another song:

**Put your recors on (Corinne Bailey Rae)**
Force Plot
<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/records_on_force.jpg" alt="">
</figure>

Decision Plot
<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/records_on_decision.jpg" alt="">
</figure>

Here it is the opposite! Again, we start on the base value of 0.688 but everything drives it down to 0.18. The most impactful again are energy and acousticness.

Now let's check a song that both of us like.
**Enter sandman (Metallica)**
Force Plot
<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/sandman_force.jpg" alt="">
</figure>

Decision Plot
<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/sandman_decision.jpg" alt="">
</figure>

That's an interesting one! The decision was mainly due to duration! Ant it is true: Great song, but with its 6 minutes, it bores me a bit so it makes sense that its duration is what basically makes it a draw between the 2 of us. Interesting enough, it was actually from my wife's playlist!

You can even visualize all songs in the decision plot, which can be interesting to detect the "overall decision path" or even to check some outliers. In our case, it doesn't seem to have anything too much out of the ordinary:

<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/all_songs.jpg" alt="">
</figure>

## Closing thoughts

I can't stress enough how many times in consulting I was asked "why is the model predicting this way" or "what is the importance of this feature" or "what matters most, this or that feature" or any combination of these questions. It is not always easy to explain, specially for a non technical crowd. Shap helps a lot to make this conversations easier. It is a simple and effective library definitely worth to have on your toolkit.
