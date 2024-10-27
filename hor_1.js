function renderMixName() {
  const page = document.getElementById("mix-page");
  page.style.grid-template-rows = 20% 50% 30%;

  const firstRow = document.createElement("div");
  firstRow.id = "first-row";
  firstRow.innerHTML = "first row text";

  const secondRow = document.createElement("div");
  secondRow.id = "first-row";  
  secondRow.innerHTML = "second row text";

  
  const thirdRow = document.createElement("div");
  thirdRow.id = "first-row";
  thirdRow.innerHTML = "third row text";
  
  page.appendChild(firstRow);
  page.appendChild(secondRow);
  page.appendChild(thirdRow);
};
