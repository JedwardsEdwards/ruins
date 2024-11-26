const mixRenderFunction = {};

function createElement(id, text, styles) {
   const element = document.createElement("div");
   element.id = "hor-1-" + id;
   element.innerHTML = text;
   element.style = styles;
   return element;
};

const hidden_styles = "height:100%; width:100%; color:white; text-align:center";

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
  const container = document.getElementById("mix-name");

  // clean up from last run - probably need to do this before moving to the page
  // also need to check how many times this render is run depending on where it is 
  container.innerHTML = "";
  container.style = "";
};
