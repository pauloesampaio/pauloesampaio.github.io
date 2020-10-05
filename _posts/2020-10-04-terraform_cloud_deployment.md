---
title: Automate cloud deployment with Terraform and Ansible
excerpt: Terraform and Ansible are "infrastructure as code" tools. Combining them you can automate provisioning and deployment of apps.
excerpt_separator: "<!--more-->"
layout: single
categories:
- Blog
tags:
- Terraform
- Ansible
- AWS
- GCP
- Provisioning
- Cloud
header:
  teaser: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-10-04-terraform_cloud_deployment/teaser_image.jpg
classes: wide
s3_bucket: https://paulo-blog-media.s3-sa-east-1.amazonaws.com/posts/2020-10-04-terraform_cloud_deployment
repo_name: cloud_deploy_with_terraform
---
***

{% include repo_card.html %}

So you have you awesome app and now it is time to make it available to the world, right? Sure, you can go on AWS console, fire up an instance, ssh into it, install all dependencies and requirements, pray for no version problems, clone the repo and run. Easy enough. Then when you want to deploy to other server or fix anything, you have do it all over again... Or you can automate it all using all these ["infrastructure as code"](https://en.wikipedia.org/wiki/Infrastructure_as_code) tools!

## Infrastructure as code

When you are deploying you basically follow a couple of steps. The idea here is to define a recipe, or a playbook, and have a system to run all the steps for you.

### Terraform

[Terraform](https://www.terraform.io/) helps you on creating infrastructure. So you can define provider, instance type, OS image, network setup so on. Naturally you need you have you ssh keys and credentials already setup, so pay attention to this, but after that, it works like a breeze!

### Ansible

[Ansible](https://www.ansible.com/) helps configuring your newly created instance. You define literally each step, like "update apt-get", "install dependencies", "add users", "run commands" and so on. It goes step by step and let you know any problems so it is easy to track and solve.

### Docker

Not sure if I would put it on the "infrastructure as code" bucket, but [Docker](https://www.docker.com/) is one of my favorite tools - it helps you by creating an isolated environment (container) for you to run your app. This container encapsulates everything the app needs, so it solves the famous "it works on my machine" problem - the container is like a mini machine running your app. Super convenient and easy to use.

## So what is going on here

- Terraform creates an instance in the cloud provider
- Ansible install docker and all its dependencies
- Ansible clones a git repository
- The repository has a Dockerfile
- Docker builds the container and runs the app, with the specific ports and ips available for connection

## Closing thoughts

For me, knowing how to actually deploy your models is a vital skill for any data scientist and it will make your life way easier. Might not be your main interest, but it is a skill that definitely pays off. These tools may or may not be the ones used in your company, but the concepts are pretty much universal and transferable to any other tool used for the same objective.
