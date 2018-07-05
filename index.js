import { attach, detach } from "@libshin/in-viewport/listener";

import "./index.css";

function detectLoadAndVisibility(img) {
  if (img.loaded && img.visible) {
    detach(img.lazyId);
    delete img.lazyId;
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

/**
 * Scans DOM to detect img[lazy-src] and [lazy-placeholder]
 * @param {boolean} strict
 * @param {{top: number, bottom: number, left: number, right: number, now: boolean}} options
 */
function scan(strict, options = {}) {
  [].forEach.call(document.querySelectorAll("img[lazy-src]"), img => {
    if (img.lazyId) {
      return;
    }
    img.lazyId = attach(img, strict, options, visible => {
      img.visible = visible;
      if (visible) {
        const lazySrc = img.getAttribute("lazy-src");
        if (lazySrc) {
          img.setAttribute("src", lazySrc);
        }
      }
      detectLoadAndVisibility(img);
    });

    img.onload = () => {
      img.loaded = true;
      detectLoadAndVisibility(img);
    };

    const parent = img.parentElement;
    const lazyPlaceholder = parent.getAttribute("lazy-placeholder");
    if (lazyPlaceholder) {
      parent.style.background = `no-repeat center url(${lazyPlaceholder}) / cover`;
    }
  });
}

export default scan;
