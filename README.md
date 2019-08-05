# robot-eyes
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
