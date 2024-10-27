function renderMixName() {
  const page = document.getElementById("mix-page");
  page.style["grid-template-rows"] = "20% 50% 30%";

  const firstRow = document.createElement("div");
  firstRow.id = "first-row";
  firstRow.innerHTML = "first row text";

  const secondRow = document.createElement("div");
  secondRow.id = "second-row";  
  secondRow.innerHTML = "second row text";

  
  const thirdRow = document.createElement("div");
  thirdRow.id = "third-row";
  thirdRow.innerHTML = "third row text";
  
  setTimeout(() => {page.appendChild(firstRow)}, 1000);
  //setTimeout(page.appendChild(secondRow), 2000);
  //setTimeout(page.appendChild(thirdRow), 3000);
};
