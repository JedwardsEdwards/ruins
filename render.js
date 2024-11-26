const mixRenderFunction = {};

function createElement(id, text, styles) {
   const element = document.createElement("div");
   element.id = "hor-1-" + id;
   element.innerHTML = text;
   element.style = styles;
   return element;
};

function getHiddenStyles() {
   return "height:100%; width:100%; text-align:center" + display_palettes[getMixFromId(window.target_mix) || "default"]["background-color"];

function appendAndFit(parent, child) {
  parent.appendChild(child);
  textFit(child,  {multiLine : false});
};

function createRow(id, styles) {
   const row = document.createElement("div");
   row.id = id;
   row.style = styles;
   return row;
};

const row_styles = "display: grid; align-items: end";

function clearRender() {
  let container = document.getElementById("mix-name");
  container.innerHTML = "";
  container.style = "";
   
  let name = document.getElementById('track-name');
  let artist = document.getElementById('track-artist');
  name.innerHTML= "";
  artist.innerHTML= "";
};
