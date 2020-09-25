[![npm version](https://badge.fury.io/js/robot-eyes.svg)](https://badge.fury.io/js/robot-eyes)

<p align="center">
  <a href="https://github.com/mercos/robot-eyes"><img width="30%" src="https://i.imgur.com/rglWPiW.jpg" title="source: imgur.com" /></a>
</p>

<p align="center">
  Simple and consistent visual regression testing
</p>

robot-eyes is a **CI based** library for visual regression testing. It works best with docker, since a page renders differently on linux and mac for example. Rest assured that you don't need to know much about the docker to make it work.

Everything revolves around 3 simple commands:

- **test:** compares the current layout with the previous one.
- **report:** shows the differences that were found, in an interactive way.
- **approve:** when there is still no reference image, this is the way to approve the current layout.

## Table of contents

- [Getting started](#getting-started)
- [Setting up](#setting-up)
- [Creating a test file](#creating-a-test-file)
- [Commands](#commands)

## Getting started
Run this command in your project's root directory. 
```bash
docker run -v $(pwd):/data -w="/data" -it mercos/robot-eyes init
```
I know, the command is a bit verbose, but it does the job. After that, you will probably see a message like this: `Alright, you are ready to go!`. If this is the case, this folder structure must be present in your project:

```
.
├── robot-eyes
│   ├── docker-compose.yml
│   ├── example_app
│   │   ├── contact.html
│   │   ├── index.html
│   │   └── robot-eyes.jpg
│   ├── images
│   │   └── reference_images
│   │       ├── contact
│   │       │   └── contact1920x1080.png
│   │       └── home
│   │           └── home1920x1080.png
│   ├── robot-eyes.json
└── └── test.js
```

**The next commands must be executed inside the `robot-eyes` folder**. The init command that we executed, created a specific docker-compose.yml file for robot-eyes. This file has the 3 commands you will need. Let's start by running the `test`.
```bash
docker-compose run test
```

That's OK, we expect one to fail. We did this on purpose so that you learn to use the second command, the `report`.

```bash
robot-eyes
    1) Home
    ✓ Contact (1045ms)


  1 passing (2s)
  1 failing

  1) robot-eyes
       Home:
     Error: 1920x1080: Images are not the same. See difference at /data/images/diff_images/home/home1920x1080.png.
      at Promise (/usr/src/compare/index.js:38:14)
```

To correct tests when they break, we need to analyze the differences and see if they are expected or not. The best way to do this is to run the `report` command.
```bash
docker-compose up report
```

## Setting up
First create `robot-eyes.json` in your project root folder. Here's a list of the available options:

| Property        | Description
| ------------- |-------------|
| `baseURL`      | Link to the main page of your application (shouldn't contain '/'). Example: https://github.com |
| `paths.testImages`      | relative path where temporary test image files will be saved. Example './test_images/'      |
| `paths.diffImages` | relative path where temporary diff image files will be saved. Example './diff_images/'      |
| `paths.referenceImages` | relative path where the baseline/reference images will be saved. Example './reference_images/'      |
| `viewports` | Array of objects containing the width and height that will be tested      |
| `timeout` | Mocha timeout      |
| `headless` | Chrome browsing mode. Is important to know that, headless and headed generate different images.      |
| `threshold` | Maximum percentage of different pixels for the test to pass     |

### Default values
```javascript
{
   baseURL: null,
   paths: {
      testImages: './robot_eyes/test_images',
      diffImages: './robot_eyes/diff_images',
      referenceImages: './robot_eyes/reference_images'
   },
   viewports: [
   {
      width: 1920,
      height: 1080
   }
   ],
   timeout: 40000,
   headless: true,
   threshold: 0.01
}
```

## Creating a test file
Currently we support only mocha. So you will need to create a mocha test file, that look like this:

```javascript
const test = require('robot-eyes/test')

describe('Your website', function () {
  it('Login', function () {
    return test('/login', this.test.title)
  })
})
```

### Aditional options
robot-eyes/test receives an object as 3rd argument. By default, robot-eyes only go to the page, and take a screenshot, with this options you can add some extra behavior. Here is the list of available options:

`cookies`: If your application needs authorization, it's the best option. Here's an example:
```javascript
const test = require('robot-eyes/test')
const getCookies = require('./getCookies')

describe('Your website', function () {
  let cookies = []
  before(async function () {
    cookies = await getCookies()
  })

  it('Transactions', function () {
    return test('/transactions', this.test.title, {cookies})
  })
})
```
If you need help, here's an example of getting cookies with puppeteer: https://github.com/brendonbarreto/robot-eyes/blob/master/examples/getCookies.js

`delay`: Wait for some time(ms), or a specific selector to be present. Examples: `1000`, `'.card'`.

`removeSelectors`: Remove from DOM a list of selectors. Example: `['.container-time', 'container-date']` 

`onReady`: function to be right before the screenshot. It receives puppeteer page, as first argument. Useful for more complex setups:
```js
onReady: async page => {
   await page.click('.btn-open-modal')
   await page.waitFor('.modal.in')
   await page.waitFor(150)
}
```

More options will be available as needed.

## Commands
There are 3 commands, **test, report and approve**. If you need help, you can use `--help` and look at the description of each one.

### test
```
npx robot-eyes test testfile.js
```
Do all the magic...Capture screenshots and compare with baselines.
- `--grep`: specify a patern to match test name
- `--report`: open report after test if it fails

### approve
```
npx robot-eyes approve "Test name"
```
Approve the test, in all viewports. You can use `--viewport` to specify just one.

### report
```
npx robot-eyes report
```

Start a express server where you can look and see and approve differences. Default port is 3000, but you can set it with `--port`
