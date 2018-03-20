###### a fork from [mjml-component-boilerplate](https://github.com/mjmlio/mjml-component-boilerplate), but for complete EDM creation

## Getting started
1. install dependencies: `npm install`
2. rename `/src-sample` to `/src`
2. on CLI: `npm start`
3. work on `/src/index.mjml`, all changes will autotranspile and autoreload browser to apply changes

output folder is on `./src/output`

## What is has:
aside from what the original repo has, the following are added:
* [browser-sync](https://browsersync.io/docs/gulp) to autoreload browser
* [gulp-mjml](https://github.com/mjmlio/gulp-mjml) to transpile `index.mjml` -> `index.html`
