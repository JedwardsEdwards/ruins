function renderMixName() {
  const container = document.getElementById("mix-name");

  // clean up from last run - probably need to do this before moving to the page
  // also need to check how many times this render is run depending on where it is 
  container.innerHTML = "";
  container.style = "";
  
  container.style["grid-template-rows"] = "20% 50% 30%";

  const firstRow = document.createElement("div");
  firstRow.id = "first-row";
  firstRow.style["grid-template-columns"] = "70% 30%";

  const dj_div = document.createElement("div");
  dj_div.id = "mix-name-text-dj";
  dj_div.innerHTML = "DJ Incredibly Annoying";
  firstRow.appendChild(dj_div);
  textFit(dj_div);

  const presents_div = document.createElement("div");
  presents_div.id = "mix-name-text-presents";
  presents_div.innerHTML = "presents";
  firstRow.appendChild(presents_div);
  textFit(presents_div);
  
  const secondRow = document.createElement("div");
  secondRow.id = "second-row";  
  secondRow.innerHTML = "second row text";

  const thirdRow = document.createElement("div");
  thirdRow.id = "third-row";
  thirdRow.innerHTML = "third row text";

  // could try css animations, don't know how they play when appending but might be easier??
  container.appendChild(firstRow);
  //setTimeout(() => {firstRow.appendChild(}, 1000);
  setTimeout(() => {container.appendChild(secondRow)}, 2000);
  setTimeout(() => {container.appendChild(thirdRow)}, 3000);
};
