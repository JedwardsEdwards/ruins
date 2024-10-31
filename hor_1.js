function renderMixName() {
  const container = document.getElementById("mix-name");
  // need some way to clear up the page here - remove old styles / kill child elements
  // probably need to do this before moving to the page
  
  container.style["grid-template-rows"] = "20% 50% 30%";

  const firstRow = document.createElement("div");
  firstRow.id = "first-row";
  firstRow.innerHTML = "first row text";

  const secondRow = document.createElement("div");
  secondRow.id = "second-row";  
  secondRow.innerHTML = "second row text";

  
  const thirdRow = document.createElement("div");
  thirdRow.id = "third-row";
  thirdRow.innerHTML = "third row text";

  // could try css animations, don't know how they play when appending but might be easier??
  setTimeout(() => {container.appendChild(firstRow)}, 1000);
  setTimeout(() => {container.appendChild(secondRow)}, 2000);
  setTimeout(() => {container.appendChild(thirdRow)}, 3000);
};
