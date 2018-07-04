import { attach, detach } from "@libshin/in-viewport/listener";

import "./index.css";

function detectLoadAndVisibility(img, id) {
  if (img.loaded && img.visible) {
    detach(id);
    img.removeAttribute("lazy-src");
  }
}

[].forEach.call(document.querySelectorAll("img[lazy-src]"), img => {
  const id = attach(img, false, visible => {
    img.visible = visible;
    if (visible) {
      img.setAttribute("src", img.getAttribute("lazy-src"));
    }
    detectLoadAndVisibility(img, id);
  });
  img.onload = () => {
    img.loaded = true;
    detectLoadAndVisibility(img, id);
  };
});
