const { attach, detach } = window.listener;

function detectLoadAndVisibility(img, parent) {
  if (!img.getAttribute("loading") && img.visible) {
    detach(img.lazyId);
    delete img.lazyId;
    if (parent) {
      setTimeout(() => {
        parent.style.background = "";
      }, 300);
    }
  }
}

const parseNb = nb => parseInt(nb, 10) || 0;

class LazyImage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }
  get placeholder() {
    return this.getAttribute("placeholder");
  }

  get strict() {
    return Boolean(this.getAttribute("strict"));
  }

  get options() {
    return {
      top: parseNb(this.getAttribute("top")),
      bottom: parseNb(this.getAttribute("bottom")),
      left: parseNb(this.getAttribute("left")),
      right: parseNb(this.getAttribute("right"))
    };
  }

  get html() {
    let div;
    const img = (this.img = document.createElement("img"));
    img.alt = this.getAttribute("alt");
    img.lazyId = attach(img, this.strict, this.options, visible => {
      img.visible = visible;
      if (visible) {
        img.setAttribute("src", this.getAttribute("src"));
      }
      detectLoadAndVisibility(img);
    });
    img.setAttribute("loading", "");

    if (this.placeholder) {
      div = document.createElement("div");
      div.style.background = `no-repeat center url(${this.placeholder}) / cover`;
      div.appendChild(img);
    }
    img.onload = () => {
      img.removeAttribute("loading");
      detectLoadAndVisibility(img, div);
    };
    return div || img;
  }

  get styles() {
    const style = document.createElement("style");
    style.innerHTML = `
img {
  opacity: 1;
  transition: opacity .5s;
}

img[loading] {
  opacity: 0;
}
`;
    return style;
  }

  connectedCallback() {
    this.root.appendChild(this.html);
    this.root.appendChild(this.styles);
  }

  disconnectedCallback() {
    if (this.img.lazyId) {
      detach(this.img.lazyId);
      delete this.img.lazyId;
    }
  }
}

window.customElements.define("lazy-img", LazyImage);
