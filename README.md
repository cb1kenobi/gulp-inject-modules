# gulp-inject-modules

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

Loads JavaScript files on-demand from a Gulp stream into Node's module loader.

The motivation for this plugin is so you can write your tests using ES2015,
transpile them using Babel, and run them using mocha without writing the
transpiled code to disk first. The problem is mocha uses `require()` to load the
tests. Writing the transpiled code to disk is inefficient and unnecessary. How
do you get the transpiled tests into mocha so that it can run them without
writing them to disk? That's where `gulp-inject-modules` comes in.

## Installation

	npm install gulp-inject-modules --save-dev

## Usage

Here's an example using [gulp-babel][gulp-babel-url], [gulp-mocha][gulp-mocha-url],
and [gulp-filter][gulp-filter-url] to transpile all your JavaScript source and
unit tests, then inject the code into the module loader before calling Mocha to
run the unit tests.

```javascript
var babel = require('gulp-babel');
var filter = require('gulp-filter');
var injectModules = require('gulp-inject-modules');
var mocha = require('gulp-mocha');

gulp.task('test', [ /* tasks to lint code and clean directories */ ], function () {
	return gulp
		.src(['src/**/*.js', 'test/**/*.js']) // get all source and test files
		.pipe(babel()) // transpile the source and tests
		.pipe(injectModules()) // load the transpiled code into Node's module system
		.pipe(filter('test/**/*.js')) // mocha only likes js files
		.pipe(mocha()); // run the tests
});
```

## License

(The MIT License)

Copyright (c) 2016 Chris Barber

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[npm-image]: https://img.shields.io/npm/v/gulp-inject-modules.svg
[npm-url]: https://npmjs.org/package/gulp-inject-modules
[downloads-image]: https://img.shields.io/npm/dm/gulp-inject-modules.svg
[downloads-url]: https://npmjs.org/package/gulp-inject-modules
[gulp-babel-url]: https://www.npmjs.com/package/gulp-babel
[gulp-mocha-url]: https://www.npmjs.com/package/gulp-mocha
[gulp-filter-url]: https://www.npmjs.com/package/gulp-filter
