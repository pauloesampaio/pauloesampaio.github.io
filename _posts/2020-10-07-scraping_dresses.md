---
title: Scraping a javascript website using scrapy, splash, docker and mongodb
excerpt: I worked on a retail tech company that used a lot of crawlers, but I never actually built one. I wanted to give it a try and see if I could do it.
excerpt_separator: "<!--more-->"
layout: single
categories:
- Blog
tags:
- webscraping
- scrapy
- splash
- scrapy-splash
- docker
- mongodb
header:
  teaser: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-10-07-scraping_dresses/teaser_image.jpg
classes: wide
s3_bucket: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-10-07-scraping_dresses
repo_name: scraping_dresses
---
***

{% include repo_card.html %}

So I was a senior data scientist at this lovely retail tech company that had a lot of data coming from crawlers monitoring e-commerces. I worked with NLP, interpreting the products descriptions and with computer vision, identifying colours, patterns, details and so on. The thing is - I never actually built the crawlers, so I wanted to try to do it myself!

I got a [brazilian retailer website](https://www.lojasrenner.com.br/c/feminino/vestidos/-/N-cg003xZ1hwylc0/p1) that uses javascrit and have pagination, and I wanted to get all products from all the pages on the dresses category, with and save the following information to a [MongoDB](https://www.mongodb.com/) database:

- Prodcut id
- Product url
- Product name
- Product price
- url of all images available
- Crawl timestamp

## Scraping dynamic website

Most e-commerces use [dynamic websites](https://en.wikipedia.org/wiki/Dynamic_web_page), meaning that the website renders using some client-side javascript. So in order to properly access the HTML, each page need to be accessed by a browser.

### Splash

In a nutshell, [splash](https://github.com/scrapinghub/splash) is like a browser. It opens a page and act as a browser would, therefore processing javascript and rendering the page properly.

### Scrapy

[Scrapy](https://scrapy.org/) is a python crawling framework. It is very flexible, has a huge community, is very fast and easy to use. Here we define which website we want to crawl and all the rules to find the fields we want to get and how to interact with controls and paginators. It also has an item pipeline functionality that helps us deal with items and for each item define what to do. In our case, store on a database. It is probably the most popular web scraping tool for python.

### MongoDB

[MongoDB](https://www.mongodb.com/) is a NoSQL database that stores json-like documents. Also has a huge community, easy to integrate with python and offers a cloud-hosted instance with a fair free tier. 

### Docker

Probably my favorite dev tool, [docker](https://www.docker.com/) creates an isolated environment (container) for you to run your app. This container encapsulates everything the app needs, so it solves the famous "it works on my machine" problem - the container is like a mini machine running your app. Super convenient and easy to use. Here we are using 2 containers: one for splash and one for running scrapy.

## Connecting the dots

So, as mentioned, the website uses javascript, so I'm using splash to mimic a browser. Splash already runs in a container (image provided by [scrapinghub](https://hub.docker.com/r/scrapinghub/splash)) and I decided to run scrapy also from a container, so I put together a minimal `Dockerfile` with scrapy and pymongo and a `docker-compose.yml` to run it . This makes easier to deploy wherever I want (or even run locally isolated on my machine). I'm saving the results to a MongoDB cloud collection, with each `product_id` as `document_id`.

## Closing thoughts

So being able to scrape websites is a great skill to have and empowers one to build data apps, monitor websites, create event-based alarms, sky is the limit! For instance, since I'm into computer vision, here I'm focusing on getting the product images urls to use in another examples there will be published here - so if there's no link to other artiles here right now, come back soon!!

Hope you enjoy and try to build something yourself!
