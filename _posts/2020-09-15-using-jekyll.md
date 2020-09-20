---
title: Writing this site with Jekyll and hosting it on github pages
excerpt: So after years postponing, it is time to build my website. Here I'll describe
  how I did it using Jekyll and hosting it on github pages
excerpt_separator: "<!--more-->"
layout: single
categories:
- Blog
tags:
- Jekyll
header:
  teaser: "/assets/images/teaser.jpg"
classes: wide
s3_bucket: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-09-15-using-jekyll
---

---
I know, I should have done this year ago... but as they say, better late than never! So I have to create a website to showcase some of my work, to have it as a portfolio/CV.

Requirements are clear:

* I wanted something simple but nice on the eyes
* Free, yet functional
* Preferably markdown based editor (as opposed to HTML)
* "Gentle" learning curve

I knew Jekyll as one of the most famous static sites generator so I thought I would give it a shot.

## About Jekyll and Github pages

So Jekyll is a "static site generator", which means that you don't have to write the HTML or the CSS - you write your content on pure and simple markdown files and, given a web page template, Jekyll will create the final html for you.

<figure style="width: 50%"  class="align-center">
  <img src="{{ page.s3_bucket }}/ssg.jpg" alt="">
  <figcaption>Static site generators</figcaption>
</figure> 

There are lots of options around, some modern and strong competitors are Hugo and Gatsby, but as far as I'm aware, Jekyll is still the most popular static site generator and is known for its simplicity. It is the engine behind github pages, so its integration is seamless - basically you push your repo and your site is alive! And for free!

## Installing

I'm working on a mac with Catalina, that already comes with ruby installed, so it was literally just running these lines:

```console
gem install bundler jekyll
```

And if you want to test your installation

```console
jekyll new my-awesome-site
cd my-awesome-site
bundle exec jekyll serve
```

Then open a browser and go to good old `localhost:4000/` and hopefully you'll see your brand new (but yet rather bland) website:

<figure style="width: 75%"  class="align-center">
  <img src="{{ page.s3_bucket }}/welcome_to_jekyll.jpg" alt="">
  <figcaption>Well at least seems to be working!</figcaption>
</figure> 

If you work with Windows, it might be trickier, since its Jekyll is ruby based. One solution is to work with docker - have jekyll running inside a container. I'm publishing a Dockerfile and a docker-compose on my repo to help you get going.

## Themes

All right, so it works, but I wanted something that looked a little better. As we stated above, we have the templates, or themes as jekyll call them, that actually defines the look and fell of the site. Formally, that's how they define [themes](https://jekyllrb.com/docs/themes/):

> Jekyll has an extensive theme system that allows you to leverage community-maintained templates and styles to customize your site’s presentation. Jekyll themes specify plugins and package up assets, layouts, includes, and stylesheets in a way that can be overridden by your site’s content.

There is loads of pages dedicated do Jekyll themes, some paid, some free. Searching around ended up on this ["minimal mistakes"](https://github.com/mmistakes/minimal-mistakes) theme, that checked all the boxes:

* Looks good (splash page, grid-like gallery, syntax highlighting, etc...)
* Seems to be updated (Last commit on github was 10 days ago!)
* Maintainer still active on discussions
* Even have a [quick-start for github pages](https://github.com/mmistakes/minimal-mistakes#remote-theme-method)

Awesome! So I followed the quick start, made repo (quick tip, name it `<your_git_user_name>.github.io`), cloned had the template up and running on github pages in no time. This is what I saw on my github pages address:

<figure style="width: 75%"  class="align-center">
  <img src="{{ page.s3_bucket }}/mms.jpg" alt="">
  <figcaption>Getting there!</figcaption>
</figure> 

Better, but still not what I wanted. Time to configure it!

## How it works

So, basically, you have a `_config.yml` file that holds a lot of site-wise configuration.
For instance, it is where you define

    - Site title, subtitle, description
    - Author info
    - SEO / google analytics tags and tokens
    - Social media links
    - Footer
    - Posts and pages defaults

Then you have the templates, which are basically HTML files with liquid variables, that will be populated with data from post, pages and whatever else you want to create. When you use a theme, it came loaded with these templates. Other options is create the templates yourself. As I'm using the aforementioned minimal mistakes theme, the templates are already defined.

And finally, you have your content. It is made of [markdown files](https://en.wikipedia.org/wiki/Markdown) with a [YAML front matter](https://jekyllrb.com/docs/front-matter/). The front matter defines some more "mandatory" fields for each content, for instance the layout to be used (for instance is it a post, a simple home page, the splash home page and so on), the page title and the permalink. Additionally, each theme have its own variables that can be set on the front matter. This can range from simple things like date, category, tags to more interesting ones, like the teaser image and excerpt text.

## Personalising theme

All right, time to get our hands dirty. Let's start personalising our site!

My folder structure looks like this:
<figure style="width: 25%"  class="align-left">
  <img src="{{ page.s3_bucket }}/structure.jpg" alt="">
</figure> 

So there's a couple of important folder there:
`_config.yml`: File that holds most configurations of your site (from aesthetics to SEO)

`_posts`: where all your raw, markdown version of blog posts will be

`_pages`: where all your raw, markdown version of pages (like about, home, contact form) will be

`_includes`: Additional layouts

`_site`: where you site is generated. Remember, jekyll is a site generator, so here it is what it generates

`assets`: basically where you would save assets for your posts and pages, like images

I'l start by customising the `_config.yml`. There is a lot of things there, most of it self explanatory. I recommend going over the documentation of the theme you selected to understand all the options available. For minimal mistakes, [here's the docs](https://github.com/mmistakes/minimal-mistakes/blob/master/_config.yml)

Now regarding the content, I started by deleting everything in `_posts`. In `_pages` let's keep just the `404.md` and the `about.md` - which are pretty standard. If there's and index on the root folder, let's delete it too.

### Landing page

So, just to start, I wanted a simple landing page, just my name, a menu on top and a sort of contact me call to action. On the theme documentation, there's a nice explanation on [how to achieve this](https://mmistakes.github.io/minimal-mistakes/docs/layouts/#splash-page-layout).

As this will be my landing page, I create a file `index.md` on the root folder and added this to the front matter:

```yml
---
layout: splash 
excerpt: "Paulo Sampaio's WIP portfolio"
header:
    overlay_color: "#333" 
    actions:
      - label: Contact
        url: "https://www.linkedin.com/in/paulosampaio"
---
```

Ok, let's check what is going on here:

* `layout`: the page layout that I want, with a splash image (or in my case just a colour)
* `excerpt`: Text that will appear over the splash image
* `header overlay_color`: This is the actual splash image. I opted for a colour, but this could be and image by using `overlay_image`
* `header action`: The call to action, in this case a button that leads to my linkedin page.

This rendered, becomes this:
<figure style="width: 75%"  class="align-center">
  <img src="{{ page.s3_bucket }}/landing_page.jpg" alt="">
</figure> 

* The title/subtitle on the top right, comes from the `_configuration.yml`
* Navigation menu on the top right comes from the `_data\navigation.yml`. You can edit this file and define whatever you want on this menu
* Footer with social links, also comes from the `_configuration.yml`. There's a footer section there where you define your links.

All right, landing page solved!

### Page not found, about and posts list

The theme already came with a nice 404.md, quite standard but let's take a look anyway:

```yml
---
title: "Page Not Found"
excerpt: "Page not found. Your pixels are in another canvas."
sitemap: false
permalink: /404.html
author_profile: true
---

Sorry, but the page you were trying to view does not exist --- perhaps you can try searching for it below.
```

We'll pretty standard right? Rendered looks like this:
<figure style="width: 75%"  class="align-center">
  <img src="{{ page.s3_bucket }}/404.jpg" alt="">
</figure> 

Notice the region on the left, with my bio picture and social links. This is defined by the `author_profile: true` on the front matter. It can be added to the defaults on the `_config.yml`.

Same idea can be used for the about page:

```yml
---
permalink: /about/
title: "About"
---

(your about text)
```

To create a page with all your posts indexed, jekyll uses a plugin called paginator. If you already set up your `_config.yml` you might have noticed the `paginate` and _`paginate_path` _options. They are explained [here](https://mmistakes.github.io/minimal-mistakes/docs/layouts/#home-page-layout). I customised mine like this:

* As I didn't wanted the list as the landing page (as the default on this theme), I created the index.html on the `_pages` folder
* I therefore updated on `_config.yml` the `pagination_path` as `/_pages/page:num/`, as explained on the docs
* On the front matter, the layout for the list is called `home`, so I added it
* I wanted a grid like view instead of just a list, so I also added `entries_layout: grid` on the front matter
* I wanted my name and social links to appear on the left side, so I added `author_profile: true`
* I wanted it to stay on url/posts/, so I added the \`permalink: /post/

So something like this:

```yml
---
layout: home
entries_layout: grid
classes: wide
author_profile: true
permalink: /posts/
---
```

Done! Awesome! So if you go to that page you'll see that... well you'll see nothing, cause we don't have any posts yet! So hold on for a minute and we'll get back to this soon...

### Comments and contact form

This is interesting. I wanted to have a comments section and a simple contact form. For comments, I see that [Disqus](https://disqus.com/) seem to be the go to option, but I didn't wanted since there's some concerns about privacy and also on the free tier they put ads on your page. Nobody wants that, right?

<figure style="width: 25%"  class="align-left">
  <img src="{{ page.s3_bucket }}/remarkbox.jpg" alt="">
</figure> 
So I'm using [Remarkbox](https://www.remarkbox.com/), also free (maximum of one domain) but with no ads. This is not covered by the theme, so we have to set it up and create the page oursevled. To set it up, you enter you site url and they'll give you a html code. Now on the folder `_includes` create a folder named `comments providers` and inside it, add a file called `custom.html` with the html code you just got from remarkbox. 

Done.

Now you can add comments sections like this:

<figure style="width: 75%"  class="align-center">
  <img src="{{ page.s3_bucket }}/comments.jpg" alt="">
  <figcaption>Simple, effective and ads free!</figcaption>
</figure> 


For the contact form, I also relied on a 3rd party provider, in that case [Formspree](https://formspree.io/). The process is exactly the same. You sign up and it'll provide you with an html snippet. Again, on the `_includes` folder, you will create a html file called `contact.html`. Done, now you can add contact form like this to your pages:

<figure style="width: 75%"  class="align-center">
  <img src="{{ page.s3_bucket }}/contact_form.jpg" alt="">
  <figcaption>No frills, no ads and free!</figcaption>
</figure> 

Great! Now let's write a post!

### Finally writing a post!

Let's start by adding a new file on the `_posts` folder. Jekyll expects that this filename follows the scheme `YYYY-MM-DD-` then your title, so for instance, I created `2020-09-15-using-jekyll.md`.

<figure style="width: 75%"  class="align-center">
  <img src="{{ page.s3_bucket }}/post_file.jpg" alt="">
</figure> 

Then comes the front matters, let's see. I did it like this:

```yml
---
title: "Writing this site with Jekyll and github pages"
excerpt: "So after years postponing, it is time to build my website. Here I'll describe how I did it using Jekyll and hosting it on github pages" 
categories:
  - Blog
tags:
  - Jekyll
header:
  teaser: /assets/images/teaser.jpg
---

Write your awesome mardown content here!
```

Thats it! Remember our good old post list? So this is the time to check it! Now we have post, right, so it should be populated. Let's check:
<figure style="width: 75%"  class="align-center">
  <img src="{{ page.s3_bucket }}/post_list.jpg" alt="">
  <figcaption>Yay! Looking good!</figcaption>
</figure> 

See, now that you have a post, it is properly populated in a grid format with the teaser image!
As for your post, it should also be there, let's check:
<figure style="width: 75%"  class="align-center">
  <img src="{{ page.s3_bucket }}/post.jpg" alt="">
  <figcaption>And now you can call yourself a content creator!</figcaption>
</figure> 

There you have it! Markdown has all sorts of cool formatting tricks like lists, formatted tables, code blocks and so on. I recommend taking a look at some documentation like [this one on github](https://guides.github.com/features/mastering-markdown/)

## Closing thoughts

Well, that's it. I really enjoyed all the process so far and the output I got using only open source and free tools. I know this is almost like coding, so it might not be your cup of tea if you are not used to it, but if you have any familiarity with coding, it is definitely worth the shot. There is couple of things I want to try now, like embedding interactive plots (using plotly) and connecting to a CMS (probably [forestry](https://forestry.io/)).

Notice that I barely touched the templates itself, I basically just customised it. I know there is a lot of powerful customisations that can be done on the templates itself. Also, there's a lot of plugins to add more functionalities but, honestly, for what I want this is more than I bargained for!!

Hope you guys enjoyed! See you around!