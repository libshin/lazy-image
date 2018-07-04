import { attach, detach } from "@libshin/in-viewport/listener";

import "./index.css";

function detectLoadAndVisibility(img, id) {
  if (img.loaded && img.visible) {
    detach(id);
    img.removeAttribute("lazy-src");
    const parent = img.parentElement;
    const lazyPlaceholder = parent.getAttribute("lazy-placeholder");
    if (lazyPlaceholder) {
      setTimeout(() => {
        parent.style.background = "";
        parent.removeAttribute("lazy-placeholder");
      }, 300);
    }
  }
}

[].forEach.call(document.querySelectorAll("img[lazy-src]"), img => {
  const id = attach(img, false, visible => {
    img.visible = visible;
    if (visible) {
      const lazySrc = img.getAttribute("lazy-src");
      if (lazySrc) {
        img.setAttribute("src", lazySrc);
      }
    }
    detectLoadAndVisibility(img, id);
  });

  img.onload = () => {
    img.loaded = true;
    detectLoadAndVisibility(img, id);
  };

  const parent = img.parentElement;
  const lazyPlaceholder = parent.getAttribute("lazy-placeholder");
  if (lazyPlaceholder) {
    parent.style.background = `no-repeat center url(${lazyPlaceholder}) / cover`;
  }
});
