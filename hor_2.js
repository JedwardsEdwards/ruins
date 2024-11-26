function renderRancid() {
  info("renderRancid", "called");
  const container = document.getElementById("mix-name");
  
  container.style["grid-template-rows"] = "30% 50% 20%";
  
  const firstRow = createRow("first-row", row_styles);
  firstRow.style["grid-template-columns"] = "35% 10% 50% 5%";
  container.appendChild(firstRow);
  const hour_div = createElement("hour", "1 HOUR", hidden_styles);
  appendAndFit(firstRow,hour_div);
  const and_div = createElement("and", "AND", "height:50%; width:100%; color:white; text-align:center");
  appendAndFit(firstRow,and_div);
  const min_div = createElement("min", "58 MINUTES", hidden_styles);
  appendAndFit(firstRow,min_div);
  const of_div = createElement("of", "OF", "height:50%; width:100%; color:white; text-align:center");
  appendAndFit(firstRow,of_div);

  const secondRow = createRow("second-row", "");
  container.appendChild(secondRow);
  const rancid_div = createElement("rancid", "RANCID TECHNO", hidden_styles);
  appendAndFit(secondRow,rancid_div);
  
  const thirdRow = createRow("third-row", "");
  container.appendChild(thirdRow);
  const courtesy_div = createElement("courtesy", "COURTESY OF", hidden_styles);
  appendAndFit(thirdRow,courtesy_div);
  const syd_div = createElement("syd", "SYD", hidden_styles);
  appendAndFit(thirdRow,syd_div);

  setTimeout(() => {hour_div.style.color = "inherit"}, 1000);
  setTimeout(() => {and_div.style.color = "inherit"}, 2000);
  setTimeout(() => {min_div.style.color = "inherit"}, 3000);
  setTimeout(() => {of_div.style.color = "inherit"}, 4000);
  setTimeout(() => {rancid_div.style.color = "inherit"}, 5000);
  setTimeout(() => {courtesy_div.style.color = "inherit"}, 6000);
  setTimeout(() => {syd_div.style.color = "inherit"}, 7000);
};

mixRenderFunction["rancid"] = renderRancid;
