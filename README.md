NREMT Prep
==========

[![Build Status](https://travis-ci.org/cmattoon/nremt-prep.svg?branch=master)](https://travis-ci.org/cmattoon/nremt-prep)

Open-Source NREMT Practice Quizzes
----------------------------------

The goal of this project is to make high-quality practice questions available to everyone.

There are a few parts to this project

  - Application   - The general quiz software
  - Questions     - Community-generated content, in plain text files
  - Documentation - The project Wiki


Questions are stored as plain text files in [YAML](http://yaml.org/) format, and anyone
may submit questions for consideration. Likewise, vague, "unfair", or just-plain-bad questions
can be flagged, reviewed, and edited. User-submitted questions will be available on the live
website as soon as they're approved and merged.

A public URL for the project will be up shortly, but this can also be run entirely on your
computer with Docker (see **Installation**, below)

Useful Links
------------

  * [Report An Issue](https://github.com/cmattoon/nremt-prep/issues)
  * [Documentation](https://github.com/cmattoon/nremt-prep/wiki)

Installation
------------

First, install [Docker Community Edition](https://www.docker.com/community-edition#/download)
and [Docker Compose](https://docs.docker.com/compose/install/)


Run `docker-compose up --build` from a terminal window, and the website should be available at
[http://localhost:8080](http://localhost:8080)


Submitting a Question
---------------------

To submit a question, copy [TEMPLATE.yaml](https://github.com/cmattoon/nremt-prep/blob/master/new_questions/TEMPLATE.yaml) into the `new_questions` directory and rename it.
