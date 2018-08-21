# TL;DR

Lazy load images that are off the viewport.

Take a look at an [example](https://libshin.github.io/lazy-image/index.html).

## How to use

### Basic usage

In order to use this package, just use `lazy-url` instead of `url` in `<img>`.

```html
<!-- head -->
<link rel="stylesheet" href="..../lazy-image.css">

<!-- somewhere in the body -->
<img lazy-src="image_url" alt="alt">

<!-- footer -->
<script src="..../lazy-image.umd.js"></script>
<script>
  lazyImage() // Scan for img[lazy-src]
</script>
```

### Placeholder

If you wrap a `img[lazy-src]` inside of a `[lazy-placeholder]`, the image related to `lazy-placeholder` will be shown instead of the image and once the image is loaded, `lazy-src` will appear and replace `lazy-placeholder`.

```html
<!-- head -->
<link rel="stylesheet" href="https://unpkg.com/@libshin/lazy-image/build/lazy-image.css">

<!-- somewhere in the body -->
<div lazy-placeholder="placeholder_src">
  <img lazy-src="image_url" alt="alt">
</div>

<!-- footer -->
<script src="https://unpkg.com/@libshin/lazy-image/build/lazy-image.umd.js"></script>
<script>
  lazyImage(strict, options) // Scan for img[lazy-src] and [lazy-placeholder]
</script>
```

See [here](https://github.com/libshin/inViewport#strict-mode) for the details on the strict/loose mode and [here](https://github.com/libshin/inViewport#options) for the options' details.

## Web Component

```html
<!-- Polyfills -->
<script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>


<link rel="import" href="https://unpkg.com/@libshin/lazy-image/webcomponent/lazy-image.html">

<lazy-img src="image_url"></lazy-img>

<lazy-img placeholder="placeholder_src" src="image_url"></lazy-img>
```
