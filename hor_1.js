function createHiddenElement(id, text) {
   const element = document.createElement("div");
   element.id = id;
   element.innerHTML = text;
   element.style.height = "100%";
   element.style.width = "100%"
   element.style.color = "white";
   element.style["text-align"] = "center";
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
  secondRowFontSize = sss_sizer_div.children["0"].style["font-size"];
  console.log(secondRowFontSize);
  secondRow.innerHTML = "";
  secondRow.style.display = "grid";
  secondRow.style["grid-template-columns"] = "5% 32% 5% 26% 5% 22% 5%";
  secondRow.style["align-items"] = "end";
  const firstBracket = createHiddenElement("mix-name-text-fb", "[");
  firstBracket.style["font-size"] = secondRowFontSize;
  secondRow.append(firstBracket);
  const sweaty = createHiddenElement("mix-name-text-sweaty", "Sweaty");
  sweaty.style["font-size"] = secondRowFontSize;
  secondRow.append(sweaty);
  const firstHeart = createHiddenElement("mix-name-text-fh", "♡");
  firstHeart.style["font-size"] = secondRowFontSize;
  secondRow.append(firstHeart);
  const sticky = createHiddenElement("mix-name-text-sticky", "Sticky");
  sticky.style["font-size"] = secondRowFontSize;
  secondRow.append(sticky);
  const secondHeart = createHiddenElement("mix-name-text-sh", "♡");
  secondHeart.style["font-size"] = secondRowFontSize;
  secondRow.append(secondHeart);
  const slimy = createHiddenElement("mix-name-text-slimy", "Slimy");
  slimy.style["font-size"] = secondRowFontSize;
  secondRow.append(slimy);
  const secondBracket = createHiddenElement("mix-name-text-fb", "]");
  secondBracket.style["font-size"] = secondRowFontSize;
  secondRow.append(secondBracket);


  const thirdRow = document.createElement("div");
  thirdRow.id = "third-row";
  thirdRow.innerHTML = "third row text";
  container.appendChild(thirdRow);

  // could try css animations, don't know how they play when appending but might be easier??
  setTimeout(() => {dj_div.style.color = "black"}, 1000);
  setTimeout(() => {presents_div.style.color = "black"}, 2000);

  setTimeout(() => {firstBracket.style.color = "black"}, 3000);
  setTimeout(() => {firstHeart.style.color = "black"}, 3000);
  setTimeout(() => {secondHeart.style.color = "black"}, 3000);
  setTimeout(() => {secondBracket.style.color = "black"}, 3000);
  setTimeout(() => {sweaty.style.color = "black"}, 4000);
  setTimeout(() => {sticky.style.color = "black"}, 5000);
  setTimeout(() => {slimy.style.color = "black"}, 6000);

};
