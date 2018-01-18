export default function getScrollbarWidth() {

  let outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  document.body.appendChild(outer);

  let widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = "scroll";

  // add innerdiv
  let inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  let widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);

  let width = widthNoScroll - widthWithScroll
  if (width > 0) width++

  return {
    type: 'GET_SCROLLBAR_WIDTH',
    payload: { width }
  }
}