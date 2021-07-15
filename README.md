Balance is a personal finance tracking software based only on account balances. 

The project is in early development by [João Melo](https://www.linkedin.com/in/joaomelo81/?locale=en_US) and licensed under the [GNU General Public License v3.0](LICENSE).

--- THE TEXT BELOW HAS NO USE ---
_from here on, everything is notes to help complete the final readme_

[![codecov](https://codecov.io/gh/joaomelo/attache/branch/main/graph/badge.svg?token=9H7SY34E7I)](https://codecov.io/gh/joaomelo/attache)

_shield for github actions_

# TL;DR
_What problem it solves?_
_Why someone would bother?_

Attaché is a minimal SERP tracker built with personal use in mind. It periodically reports the position of pages in organic search results.

The use case would be: every other day, I want to receive in my email the updated Ranking of pages "company.com" and "landing-page.com" in searches against the Terms "service", "service my-city" and "service my-neighborhood".

# Motivation
_Why I build this?_

I did it to explore some development challanges regarding front end archtecture with serevelerss spa, applying some appeliaing concepts from the clean archtecture and grokking to make the archture more easier to maintain, extensive use of react based only on functional components with hooks and end to end testing with playwright

# Balance
_what are the apps features?_
_use gifs_

# Runtime
_describe the runtime archtecture?_
_what are the production artifacts?_
_what is the main tech stack behind the scenes?_

Attaché is a combination of two serverless functions that run periodically. The first is the `snapshotsScheduledService` which saves Snapshots for every Stake's Terms in the database.

The second is the `tracksScheduledService`. It dispatches email reports with Rankings and Trends data for every Stake.

Both services run in [Cloud Functions for Firebase](https://firebase.google.com/docs/functions) and use [Cloud Firestore](https://firebase.google.com/docs/firestore) as database. It likewise relies upon [Scale SERP](https://www.scaleserp.com/) to run organic searches and [Send Grid](https://sendgrid.com/) to dispatch emails.

Attaché is developed using Javascript and takes advantage of the language thriving open source library ecosystem. All project dependencies are available in the [package.json](package.json) file.

# Development
_How to run it locally?_
_How to develop it?_

The first step is to clone the repo with git and install all dependencies.

``` bash
git clone https://github.com/joaomelo/lib.git
npm i
```

Now you can get familiar with the project directories and files.

``` js
📂attache
  *.*         // project files
  📁.github   // github actions for ci/cd pipeline
  📁dist      // bundled code for production
  📁src       
    📁app     // services and i/o
    📁domain  // business core
    📁helpers // generic functions
    📁main    // glues everything into serverless functions
  📁tests     // support test files
```

Before we start developing, we need to get rid of some environmental tasks.

## Environment Configuration

To enable Firebase [Cloud Functions](https://firebase.google.com/docs/functions) and [Firestore](https://firebase.google.com/docs/firestore), you need to create a [Firebase project](https://firebase.google.com/docs/admin/setup) and set local development with their [local emulator suite](https://firebase.google.com/docs/emulator-suite).

Now is also an excellent time to create accounts and note the search and email services' API keys. [Scale SERP](https://www.scaleserp.com/) and [Send Grid](https://sendgrid.com/) sites have the proper instructions.

Regarding Send Grid, It is essential to register the email you will use to dispatch Track Reports.

With all that information in hand, we can create a `.env` file at the project root directory and fill it with our services' corresponding data.

``` env
FIRESTORE_EMULATOR_HOST=localhost:8080
SCALE_SERP_KEY=SOME_API_KEY_VALUE
SEND_GRID_KEY=SOME_API_KEY_VALUE
DEFAULT_FROM_EMAIL=some@email.com
```

I must say I have no affiliation with any of these services. I chose them from personal familiarity, ease of use, or free tier convenience. But Attaché was built aiming at easy substitutions. You can take advantage of that if some of the services do not suit your particular needs.

## Engine Start

The project uses [Jest](https://jestjs.io/) for testing. By executing `npm start`, you turn on tests in watch mode and can begin coding. It is easy to focus on a particular module applying file patterns through Jest CLI options.

But be aware these tests don't massage the final serverless functions. These functions are tiny and take care only of putting together dependencies. Nevertheless, If you want to run them locally, type the command `npm run shell`.

The [shell interface](https://firebase.google.com/docs/functions/local-shell) enables local interactive invoke of Firebase functions from the command line.

# Deploy
_How to deploy to production from my machine?_
_How to use Guthub actions?_

## Locally

You can deploy the serverless functions to Firebase from your local machine. To do that, execute `npm run deploy:local`.

This command will take advantage of the same `.env` file used for development and the Firebase project configuration.

## Continuous Delivery

There is also a workflow to deploy automatically from GitHub using GitHub Actions.

This pipeline additionally uploads test reports to [Codecov]( https://about.codecov.io) service. Codecov generates complete and interactive code coverage reports. You can create a free account and obtain an API key on their website.

Going back to GitHub Actions, you need to set some GitHub variables for things to work correctly. You do that by creating a GitHub secret for every workflow variable. The secrets required are listed below.

```
FIREBASE_PROJECT 
FIREBASE_TOKEN
SCALE_SERP_KEY
SEND_GRID_KEY
DEFAULT_FROM_EMAIL
CODECOV_TOKEN
```

# Contribution
_Should I help?_

Lembrar do podcast com cara do SQLite no changelog

# Wrapping up
_So what?_
_Any expectations for the future?_

The project has very limited ambitions. Although some bugs will undoubtedly come, there are not many more things to do as long as I can see. If you need any help, I'm glad to listen. Just contact me via [Twitter](https://twitter.com/joaomeloplus).

🖖 Live long and prosper.

# License
Made by [João Melo](https://twitter.com/joaomeloplus) and licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.