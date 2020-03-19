
# Graham scan

[![Build Status](https://travis-ci.com/luciopaiva/graham-scan.svg?branch=master)](https://travis-ci.com/luciopaiva/graham-scan) [![codecov](https://codecov.io/gh/luciopaiva/graham-scan/branch/master/graph/badge.svg)](https://codecov.io/gh/luciopaiva/graham-scan)

A JavaScript implementation of the [Graham scan](https://en.wikipedia.org/wiki/Graham_scan) algorithm for finding the convex hull of a set of points.

## Installation

    npm i @lucio/graham-scan

## Usage

```javascript
const grahamScan = new GrahamScan();
grahamScan.setPoints([[1,0], [0,1], [2,1], [1,0.5]]);
const hull = grahamScan.getHull();  // [1,0], [2,1], [0,1]
```

### API

#### `new GrahamScan()`

Creates a new instance of the algorithm, meant to be reusable.

```javascript
const grahamScan = new GrahamScan();
```

#### `grahamScan.addPoint(point)`

Adds a point to the set. The point must be an array of two numbers: the x and y coordinates. 

```javascript
const grahamScan = new GrahamScan();
grahamScan.addPoint([10, 20]);
```

#### `grahamScan.clear()`

Clear the underlying array of points.

```javascript
const grahamScan = new GrahamScan();
grahamScan.addPoint([10, 20]);
grahamScan.clear();
```

#### `grahamScan.getHull()`

Computes the convex hull. Returns a new array containing all the hull vertices, starting from the one with the lowest y value (in case there are multiple ones, it will be the one with the lowest x as well) and going in counter-clockwise direction.

```javascript
const grahamScan = new GrahamScan();
grahamScan.setPoints([[1,0], [0,1], [2,1], [1,0.5]]);
const hull = grahamScan.getHull();  // [1,0], [2,1], [0,1]
```

#### `grahamScan.getPoints()`

Returns a reference to the underlying array containing all the points.

```javascript
const grahamScan = new GrahamScan();
grahamScan.addPoint([10, 20]);
grahamScan.addPoint([30, 40]);
grahamScan.getPoints();  // [10, 20], [30, 40]
```

#### `grahamScan.setPoints(points)`

Replace the underlying array with the given one.

```javascript
const grahamScan = new GrahamScan();
grahamScan.setPoints([[10, 20], [30, 40]]);
```

## Contributing

    git clone git@github.com:luciopaiva/graham-scan.git
    cd graham-scan
    nvm install
    npm install

## Tests

    npm test

## FAQ

### Is this the fastest way to build a convex hull?

No. Graham scan runs in O(n log n), where n is the total number of points in the set. [Chan's algorithm](https://en.wikipedia.org/wiki/Chan%27s_algorithm) does a bit better, O(n log h), where h is the number of vertices composing the final hull.

It is still much better than Jarvis march, though, which runs in O(nh).

### Why use the .mjs extension?

Node.js projects that use this library by directly copying the script file instead of installing it via npm would need to add `type: module` to `package.json`, which may be undesired.
