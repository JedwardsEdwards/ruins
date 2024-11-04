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

function renderMixName() {
  const container = document.getElementById("mix-name");

  // clean up from last run - probably need to do this before moving to the page
  // also need to check how many times this render is run depending on where it is 
  container.innerHTML = "";
  container.style = "";
  
  container.style["grid-template-rows"] = "30% 40% 15% 15%";

  const firstRow = createRow("first-row", row_styles);
  firstRow.style["grid-template-columns"] = "90% 10%";
  container.appendChild(firstRow);

  const dj_div = createElement("dj", "DJ Incredibly Annoying", hidden_styles);
  appendAndFit(firstRow,dj_div);
  
  const presents_div = createElement("presents", "presents", "height:50%; width:100%; color:white; text-align:center");
  appendAndFit(firstRow,presents_div);

  const secondRow = createRow("second-row", "");
  container.appendChild(secondRow);
  const sss_sizer_div = createElement("sizer", "[ Sweaty ♡ Sticky ♡ Slimy ]", hidden_styles);
  appendAndFit(secondRow,sss_sizer_div);
  secondRowFontSize = (0.85 * Number(sss_sizer_div.children["0"].style["font-size"].slice(0, -2))) + "px";
  secondRow.innerHTML = "";
  secondRow.style = row_styles;
  secondRow.style["grid-template-columns"] = "4% 28% 4% 28% 4% 28% 4%";
  secondRow.style["margin-top"] = "auto";
  secondRow.style["margin-bottom"] = "auto";
   
  const firstBracket = createElement("fb", "[", hidden_styles + "; font-size: " + secondRowFontSize);
  secondRow.append(firstBracket);
  const sweaty = createElement("sweaty", "Sweaty", hidden_styles + "; font-size: " + secondRowFontSize);
  secondRow.append(sweaty);
  const firstHeart = createElement("fh", "♡", hidden_styles + "; font-size: " + secondRowFontSize);
  secondRow.append(firstHeart);
  const sticky = createElement("sticky", "Sticky", hidden_styles + "; font-size: " + secondRowFontSize);
  secondRow.append(sticky);
  const secondHeart = createElement("sh", "♡", hidden_styles + "; font-size: " + secondRowFontSize);
  secondRow.append(secondHeart);
  const slimy = createElement("slimy", "Slimy", hidden_styles + "; font-size: " + secondRowFontSize);
  secondRow.append(slimy);
  const secondBracket = createElement("fb", "]", hidden_styles + "; font-size: " + secondRowFontSize);
  secondRow.append(secondBracket);

  const thirdRow = createRow("thirdRow", "margin: auto; font-size: 35px");
  container.appendChild(thirdRow);
  const slimeParty = createElement("slime-party", "welcome 💚 to the slime party", "");

  const fourthRow = createRow("fourth-row", "margin: auto; display: flex; font-size: 35px");
  container.appendChild(fourthRow);
  const puke1 = createElement("puke1", "🤮", "");
  const puke2 = createElement("puke2", "🤮", "");
  const puke3 = createElement("puke3", "🤮", "");

  // could try css animations, don't know how they play when appending but might be easier??
  setTimeout(() => {dj_div.style.color = "inherit"}, 1000);
  setTimeout(() => {presents_div.style.color = "inherit"}, 2000);

  setTimeout(() => {firstBracket.style.color = "inherit"}, 3000);
  setTimeout(() => {secondBracket.style.color = "inherit"}, 3000);
  setTimeout(() => {sweaty.style.color = "inherit"}, 4000);
  setTimeout(() => {firstHeart.style.color = "inherit"}, 4500);
  setTimeout(() => {sticky.style.color = "inherit"}, 5000);
  setTimeout(() => {secondHeart.style.color = "inherit"}, 5500);
  setTimeout(() => {slimy.style.color = "inherit"}, 6000);
  setTimeout(() => {thirdRow.append(slimeParty)}, 7000);
  setTimeout(() => {fourthRow.append(puke1)}, 8000);
  setTimeout(() => {fourthRow.append(puke2)}, 8500);
  setTimeout(() => {fourthRow.append(puke3)}, 9000);
};
