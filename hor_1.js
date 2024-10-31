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
  textFit(child,  {multiLine : false});
};

function createRow(id, cols) {
   const row = document.createElement("div");
   row.id = id;
   row.style.display = "grid";
   row.style["grid-template-columns"] = cols;
   row.style["align-items"] = "end";
   return row;
};

function renderMixName() {
  const container = document.getElementById("mix-name");

  // clean up from last run - probably need to do this before moving to the page
  // also need to check how many times this render is run depending on where it is 
  container.innerHTML = "";
  container.style = "";
  
  container.style["grid-template-rows"] = "20% 50% 30%";

  const firstRow = createRow("first-row", "90% 10%");
  container.appendChild(firstRow);

  const dj_div = createHiddenElement("mix-name-text-dj", "DJ Incredibly Annoying");
  appendAndFit(firstRow,dj_div);
  
  const presents_div = createHiddenElement("mix-name-text-presents", "presents");
  presents_div.style.height = "50%"
  appendAndFit(firstRow,presents_div);

  const secondRow = createRow("second-row", "5% 25% 7.5% 25% 7.5% 25% 5%");
  secondRow.style = "";
  container.appendChild(secondRow);
  const sss_sizer_div = createHiddenElement("mix-name-text-sizer", "[ Sweaty ♡ Sticky ♡ Slimy ]");
  appendAndFit(secondRow,sss_sizer_div);


  const thirdRow = document.createElement("div");
  thirdRow.id = "third-row";
  thirdRow.innerHTML = "third row text";
  container.appendChild(thirdRow);

  // could try css animations, don't know how they play when appending but might be easier??
  setTimeout(() => {dj_div.style.color = "black"}, 1000);
  setTimeout(() => {presents_div.style.color = "black"}, 2000);
  setTimeout(() => {sss_sizer_div.style.color = "black"}, 3000);

};
