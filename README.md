## robot-eyes
Visual regression testing

## Installation
```
npm install robot-eyes
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
      testFiles: path.resolve('./robot_eyes/test_files'),
      testImages: path.resolve('./robot_eyes/test_images'),
      diffImages: path.resolve('./robot_eyes/diff_images'),
      referenceImages: path.resolve('./robot_eyes/reference_images')
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

describe('Mercos', function () {
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
