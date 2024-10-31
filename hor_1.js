function createHiddenElement(id, text) {
   const element = document.createElement("div");
   element.id = id;
   element.innerHTML = text;
   element.style.height = "100%";
   element.style.width = "100%"
   element.style.color = "white";
   return element;
};

function appendAndFit(parent, child) {
  parent.appendChild(child);
  textFit(child);
};

function renderMixName() {
  const container = document.getElementById("mix-name");

  // clean up from last run - probably need to do this before moving to the page
  // also need to check how many times this render is run depending on where it is 
  container.innerHTML = "";
  container.style = "";
  
  container.style["grid-template-rows"] = "20% 50% 30%";

  const firstRow = document.createElement("div");
  firstRow.id = "first-row";
  firstRow.style.display = "grid";
  firstRow.style["grid-template-columns"] = "90% 10%";
  container.appendChild(firstRow);

  const dj_div = createHiddenElement("mix-name-text-dj", "DJ Incredibly Annoying");
  appendAndFit(firstRow,dj_div);

  const presents_div = document.createElement("div");
  presents_div.id = "mix-name-text-presents";
  presents_div.innerHTML = "presents";
  presents_div.style.height = "100%";
  presents_div.style.width = "100%"
  presents_div.style.color = "white";
  firstRow.appendChild(presents_div);
  textFit(presents_div);
  
  const secondRow = document.createElement("div");
  secondRow.id = "second-row";  
  secondRow.innerHTML = "second row text";
  //firstRow.style["grid-template-columns"] = "70% 30%";
  container.appendChild(secondRow);
  
  const thirdRow = document.createElement("div");
  thirdRow.id = "third-row";
  thirdRow.innerHTML = "third row text";
  container.appendChild(thirdRow);

  // could try css animations, don't know how they play when appending but might be easier??
  setTimeout(() => {dj_div.style.color = "black"}, 1000);
  setTimeout(() => {presents_div.style.color = "black"}, 2000);
};
