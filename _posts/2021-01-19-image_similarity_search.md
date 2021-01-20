---
title: Using convolutional neural network's feature vectors to find similar images
excerpt: If you have a well trained model, it should produce a robust vector representation of your data and similar observations should be next to each other.
excerpt_separator: "<!--more-->"
layout: single
categories:
- Blog
tags:
- convolutional
- neural networks
- tensorflow
- keras
- nmslib
- approximate nearest neighbors
- similarity
- product matching
header:
  teaser: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2021-01-10-image_similarity_search/teaser_image.jpg
classes: wide
s3_bucket: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2021-01-10-image_similarity_search
repo_name: image_similarity_search
---

{% include repo_card.html %}

In the [multitask classification post](https://pauloesampaio.github.io/posts/2020-12-31-multitask_learning/) I mentioned how it should help the embedding, since the model takes into account all tasks and therefore would generate a more holistic vector representation of the image. That's exactly what we will test today. The model we trained is capable of detecting finish type, neckline and sleeve length. So if I have a vector of a striped long sleeved crew neckline dress on this space, the nearest vectors should also be products of the same type. We'll build the small app on the screenshot below to execute this sort queries:

<figure style="width: 50%"  class="align-center">
<img src="{{ page.s3_bucket }}/app.jpg" alt="">
</figure>

## But what is a match?

Before going any further, it is worth to give a step back and think about what even is a *product match*. What makes two garments be considered a match? Exact matches are clear, but what if we want to find similar. It need to be based on something. Here it will be dependent on our model. As stated earlier, we trained a model that identifies finishes (striped, floral, plain, etc), sleeve lengths (sleeveless, long sleeves, short sleeves) and necklines (crew neck, v-neck and so on). So our similarity will be based on these features. There is no colour, so if a garment is floral, v-neck and short sleeves, if our model finds garment with similar characteristics, it would be a match, not necessarily having the same colour, fit or overall length.

<figure style="width: 50%"  class="align-center">
<img src="{{ page.s3_bucket }}/floral.jpg" alt="">
</figure>

You want to also take colour or any other feature into account? There are a couple of ways to do it. Let's use colour as an example:

- Add colour classification to your multitask model
- If you know beforehand the colour (as it is the case in many e-commerces), post process the results keeping only the desired colour
- Add dimensions on your feature vector with colour descriptors (like colour histograms for instance). 

## Data and model

As explained, we'll use the same data and the model trained on the [multitask post](https://pauloesampaio.github.io/posts/2020-12-31-multitask_learning/):

- Data from the [deep fashion dataset](http://mmlab.ie.cuhk.edu.hk/projects/DeepFashion/AttributePrediction.html), specifically all dresses and tops-like garments (shirts, t-shirts, blouses and so on).
- Multitask convolutional neural network model trained to classify garment finishes (striped, embroidered, plain, etc), sleeve length (sleeveless, long sleeves, short sleeves, etc) and neckline (crew neck, v-neck, etc). Notice that there is no colour here.

In order to get the vector representation, instead of the output of the classification layers, we'll get the input of the classification layers! In our case, the input is a 2048-dimensions vector representation of the input image. Each one of these 2048 dimensions is a feature that the classifier uses for its classification. So, in theory, this vector contains all the information needed for the classification to decide if a garment is a v-neck, long sleeves and striped or a crew neck, sleeveless plain garment. In order to get this intermediate result, we need to re-define the output of the model. We can achieve this by doing:

```python
model = load_model("TRAINED_MODEL_PATH")
model = Model(
  inputs=model.input,
  outputs=[model.get_layer("CLF_LAYER_NAME").input],
    )
```

First we load our pre-trained model and then define that the input is the input of our model but the output is now the input of the CLF_LAYER_NAME.

## Approximate nearest neighbors

Now imagine that you get an image from an url, vectorize it (using the same model) and want to find the top-5 most similar images to it that you have on your database. If they are all on the same vector space, it is just a matter of find the 5 vectors with smallest distance!

If you have just a handful of images, it is fine, you can brute-force and calculate the distance to all vectors, order them and get the top-5. The challenge is when you have thousands or millions of images and you vectors space also have thousands of dimensions. In that case, which is the most common, calculate all the distances would be very computationally expensive, so we rely on approximate methods.

This is in itself a research field and there are a couple of methods to do it. [This page](http://ann-benchmarks.com/) tracks all these algorithm's implementations and benchmarks them. First time I did this, probably in 2015 or 2016, [Spotify's annoy](https://github.com/spotify/annoy) was the best one and I love it, super easy to use. A couple of years later it was surpassed by [nmslib](https://github.com/nmslib/nmslib), which we'll be using in this project. [Faiss](https://github.com/facebookresearch/faiss) from Facebook is also great, specially if you are running it on a GPU.

With nmslib, we'll use the [HNSW](https://arxiv.org/abs/1603.09320)(Hierarchical Navigable Small World) method. It works by building an index that can be queried afterwards. The image below, although from Faiss documentation (Facebook ai team is great with communication), explains the idea:

<figure style="width: 75%"  class="align-center">
<img src="{{ page.s3_bucket }}/faiss.jpg" alt="">
</figure>

To build it, you simply do:

```python
ann_index = nmslib.init("INIT_TIME_PARAMETERS")
ann_index.addDataPointBatch(VECTORS)
ann_index.createIndex("INDEX_TIME_PARAMETERS")
```

Where the vectors is your set of vectors and the parameters are detailed [here](https://github.com/nmslib/nmslib/blob/master/manual/methods.md).

In order to query the index, you simply do:

```python
ids, distances = ann_index.knnQuery(query_vector, k=k)
```

Where query vector is the vectorized image you want to find matches and k is the number of nearest vectors you want to find. This command return ids, which are the ids of the k-nearest vectors and distances, which are the distance of these respective vectors. The distance to be used (euclidean, l1, cosine, etc) is defined in the parameters.

Thats basically it!

## Running it

Starting with the `./config/config.yml`, where you define the variables needed. They are quite self explanatory, but let's go over a few:

- `images_dataframe_path`: path to a dataframe with path to the images you want to vectorize
- `path_field`: On the `images_dataframe`, which column contains the image path
- `trained_model_path`: path to the trained model you'll use to vectorize the images
- `layer_to_get_input`: from the trained model, where to get the vectors
- `ann_index`: These are the nmslib parameters, detailed [here](https://github.com/nmslib/nmslib/blob/master/manual/methods.md). Specifically the `k` is the number of matches that will be returned

All right, now that you set the configuration, you can run `python build_index.py`. This will start by looking for the `vectors`. If the file doesn't exist yet, it will load the `vectorizer model` and go through all the images in the `images_dataframe`, vectorize them and save this vectors to the `vectors_path`. Once the vectors exist, it will build the approximate nearest neighbors index and save it to the desired path.

Then, you can run `streamlit run front_end.py` to run the web application where you can past an image url. The app will then:

- loads the `ann_index`, `vectorizer_model`, `image_dataframe` and the calculated `vectors`
- Once the user types an url, download the image from it
- Vectorize the image using the `vectorizer_model`
- Searches on the `index` the `ids` of the `k` nearest neighbors and the `distances` to this vectors
- With the `ids`, searches on the `image_dataframe` for the paths of this neighbors
- Loads and display them with the respective distance

That's it!

<figure style="width: 50%"  class="align-center">
<img src="{{ page.s3_bucket }}/plain.jpg" alt="">
</figure>

## Closing thoughts

This is a simple way of allowing users to search on your inventory based on images, not only text. Results are not perfect, I know. They could be improved by:

- Having a better model. As explained earlier, this model was trained on only 3 aspects of the garment.
- Having more data. This helps in 2 ways:
  - This is deep learning, so the more data you have the better your model
  - The more items you have on your inventory, more likely you will have something similiar to what the client wants
- Having better optimization metrics: We are basically optimizing our vector space to the classification task, not to the similarity search task. There are architectures trying to fix this problem, like [siamese networks](https://www.pyimagesearch.com/2020/12/07/comparing-images-for-similarity-using-siamese-networks-keras-and-tensorflow/), but getting a good training set for that is costly (in terms of time).
- Also metrics for measuring the match quality are hard. For instance, I'm getting 10 matches, but how can I know for sure if these are the best 10 matches? Again, I would have to know beforehand the best matches for a smaller set and evaluate them, but getting this training set with the "best matches" is costly and requires a "business specialist" to do it, since - in our case - I don't feel qualified enough in fashion to set the best 10 matches.

In any case, this is an interesting problem, hope you enjoy. I sure did and if you want to discuss about it let me know!
