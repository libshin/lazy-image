# TL;DR

Lazy load images that are off the viewport.

Take a look at an [example](https://libshin.github.io/lazyImage/index.html).

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

If you wrap a `img[lazy-src]` inside of a `div[lazy-placeholder]`, the image related to `lazy-placeholder` will be shown instead of the image and once the image is loaded, `lazy-src` will appear and replace `lazy-placeholder`.

```html
<!-- head -->
<link rel="stylesheet" href="..../lazy-image.css">
<!-- somewhere in the body -->
<div lazy-placeholder="placeholder_src">
  <img lazy-src="image_url" alt="alt">
</div>
<!-- footer -->
<script src="..../lazy-image.umd.js"></script>
<script>
  lazyImage() // Scan for img[lazy-src] and div[lazy-placeholder]
</script>
```
