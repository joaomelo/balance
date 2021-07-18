![github actions](https://github.com/joaomelo/balance/actions/workflows/publish.yml/badge.svg)
[![codecov](https://codecov.io/gh/joaomelo/balance/branch/main/graph/badge.svg?token=3ZkBAWh6qg)](https://codecov.io/gh/joaomelo/balance)

# TL;DR
_What problem it solves?_

Balance records accounts balances (from credit cards or loans for example) and show their evolution in a chart.

It is an unsophisticated software which tries to settle the need for minimal financial self-management for someone ~~too lazy~~ unable to do the correct tracking based on individual transactions, category analysis and accounts reconciliation. 

# Motivation
_Why it was built?_

The problem can surely be solved with some spreadsheet shenanigans. Though, why lose some hours learning how to implement an algorithm in Excel if you can burn dozens more coding your own software?

Seriously, I built the project mainly to explore some techs and practices in a front-end web app. Mostly:
- feasibility of replacing traditional backend with serverless services;
- some concepts from [Clean Architecture](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure-ebook-dp-B075LRM681/dp/B075LRM681/ref=mt_other?_encoding=UTF8&me=&qid=) and [Grokking Simplicity](https://www.manning.com/books/grokking-simplicity?gclid=CjwKCAjw3MSHBhB3EiwAxcaEu7fdoYDomaXaYdL8obQ_-fKzSvr_gqgYZzf_s53g9lpfPHfTnG1sARoCFLYQAvD_BwE);
- UI craft with React functional components and hooks;
- reactive state management without a central store like Redux or Vuex;
- end-to-end testing with Microsoft Playwright.

# Usage
_What are the features?_

The main output is a time series chart to assess the net balance evolution from accounts and groups. But the first step is to feed the relevant data.

## Accounts

Accounts can be used to represent things like savings, credit cards, loans, long term investments and assets as houses or cars. Bellow an example on how to create an account in the app.

![Add accounts](docs/add-accounts.gif)

## Balances

A balance states the net value for one account at a given day. Here we create some balance records:

![Add balances](docs/add-balances.gif)

## Groups

Accounts can be optionally grouped. Every group will appear as an additional time series in the history chart with calculated balances based on the accounts they aggregate.

![Add group](docs/add-groups.gif)

## History Chart

The history chart shows the balance progression for every account and group. The chart is interactive and series can be hidden to facilitate analysis.

Groups balances are the sum of its accounts balances. The calculation will deal with mismatch dates using the most recent past balance at a given day.

The follow example show the history chart for two groups with two accounts each. 

![History](docs/history.gif)

# Architecture
_What it is made of?_

Balance is a traditional web single page application. After compilation, the production artifacts are a couple of HTML and JavaScript files. I use [Firebase hosting](https://firebase.google.com/docs/hosting) to serve them, but any other web server will do just fine.

The app relies on two serverless services provided by [Firebase](https://firebase.google.com/). [Firestore](https://firebase.google.com/docs/firestore) saves data related to accounts, groups, and balances and [Firebase Auth](https://firebase.google.com/docs/auth) supports user authentication.

The source structure attempts to express the design choices as clear as possible. Here a bird's eye view of the project folders.

``` js
📂balance
  *.*             // project config files
  📁.github       // ci/cd pipeline for github actions 
  📁dist          // bundled code for production
  📁src
    📁app         // general app logic
    📁components  // ui shared components
    📁features    // core business
    📁services    // external services abstractions
    📁main        // glues everything
  📁tests         // support test files
```

The code spread in those folders takes advantage of the JavaScript thriving open source ecosystem. [React](https://reactjs.org/), [Material-UI](https://material-ui.com/) and [Chart.js](https://www.chartjs.org/) are the UI backbone. [RxJS](https://rxjs.dev/) supports the state management. [Playwright](https://playwright.dev/) and [Jest](https://jestjs.io/) enable unit and e2e testing. The [package.json](package.json) file lists the many others libraries I was fortune to have access to.

# Development
_How to run locally?_

The first step to run Balance in your local machine is download the project. GitHub offers many ways to do that. For example, you could clone the repo with git.

``` bash
git clone https://github.com/joaomelo/balance.git
```

After that, go to the project directory and install both the JS dependencies and the [Firebase CLI](https://firebase.google.com/docs/cli).

``` bash
npm i
npm install -g firebase-tools
```

Now link the directory to a Firebase project you already [created and set up](https://firebase.google.com/docs/web/setup) on their platform.

``` bash
firebase use some-project-id
```

Rename the `.env.exampe` file to just `.env`. For the local environment this is enough, but the `.env` file will need further updates if we want to deploy to the cloud later.

Type `npm start` to run Balance. It will be available at `http://localhost:8181`. The default local user credentials are:

```
user: user@email.com
password: password
```

Finally, we have both unit and e2e tests to support the development effort. With the app running, type `npm t` to run all of those tests in watch mode.

# Deploy
_How to push to production?_

## From the local machine 

The following steps assume you already set your local environment according to [these steps](#development).

We will need to go back to that `.env` file and replace all the “…” placeholders with the actual values from the Firebase project you want to deploy to.

Now execute `npm run prod:local:deploy` and the script will run all tests and, if they succeed, do a full deploy.

## From GitHub actions

There is also a workflow to deploy automatically from GitHub using GitHub Actions. The workflow will ignite after every push to the “main” branch.

This pipeline additionally uploads test reports to [Codecov]( https://about.codecov.io) service. You can create a free account and obtain a token on their website. Alternately, remove the corresponding steps from the workflow.

Going back to GitHub Actions, we need to create a GitHub secret for every workflow variable for things to work correctly. The secrets required are listed below.

```
APP_ENV_API_KEY
APP_ENV_APP_ID
APP_ENV_AUTH_DOMAIN
APP_ENV_FIREAUTH_EMULATOR_HOST
APP_ENV_FIRESTORE_EMULATOR_HOST
APP_ENV_MESSAGING_SENDER_ID
APP_ENV_PROJECT_ID
APP_ENV_STORAGE_BUCKET
CODECOV_TOKEN
```

# Contribution
_How can I help?_

Pending.

# Wrapping up
_What to expect?_

The project has very limited ambitions. Although some bugs will undoubtedly come, there are not many more things to do as long as I can see. If you need any help, I'm glad to listen. Just contact me via [Twitter](https://twitter.com/joaomeloplus).

🖖 Live long and prosper.

# License
Made by [João Melo](https://twitter.com/joaomeloplus) and licensed under the GNU General Public License v3.0 — see the [LICENSE](LICENSE) file for details.