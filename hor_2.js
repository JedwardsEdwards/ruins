function renderRancid() {
  info("renderRancid", "called");
  const cycle = crypto.randomUUID()
  window.render_cycle = cycle;
  
  const container = document.getElementById("mix-name");
  
  container.style["grid-template-rows"] = "20% 30% 30% 20%";
  
  const firstRow = createRow("first-row", row_styles);
  firstRow.style["grid-template-columns"] = "35% 10% 50% 5%";
  container.appendChild(firstRow);
  const hour_div = createElement("hour", "1 HOUR", getHiddenStyles());
  appendAndFit(firstRow,hour_div);
  const and_div = createElement("and", "AND", "height:80%; width:100%; text-align:center");
  appendAndFit(firstRow,and_div);
  const min_div = createElement("min", "58 MINUTES", getHiddenStyles());
  appendAndFit(firstRow,min_div);
  const of_div = createElement("of", "OF", "height:80%; width:100%; text-align:center");
  appendAndFit(firstRow,of_div);

  const secondRow = createRow("second-row", "");
  container.appendChild(secondRow);
  const rancid_div = createElement("rancid", "RANCID", getHiddenStyles());
  appendAndFit(secondRow,rancid_div);
  
  const thirdRow = createRow("third-row", "");
  container.appendChild(thirdRow);
  const techno_div = createElement("techno", "TECHNO", getHiddenStyles());
  appendAndFit(thirdRow,techno_div);
   
  const fourthRow = createRow("fourth-row", "");
  container.appendChild(fourthRow);
  const courtesy_div = createElement("courtesy", "COURTESY OF SYD.", getHiddenStyles());
  appendAndFit(fourthRow,courtesy_div);

  setTimeout(() => {if (cycle == window.render_cycle) {hour_div.style.color = display_palettes["rancid"]["highlight-color"]}}, 1000);
  setTimeout(() => {if (cycle == window.render_cycle) {and_div.style.color = display_palettes["rancid"]["highlight-color"]}}, 2000);
  setTimeout(() => {if (cycle == window.render_cycle) {min_div.style.color = display_palettes["rancid"]["highlight-color"]}}, 3000);
  setTimeout(() => {if (cycle == window.render_cycle) {of_div.style.color = display_palettes["rancid"]["highlight-color"]}}, 4000);
  setTimeout(() => {if (cycle == window.render_cycle) {rancid_div.style.color = display_palettes["rancid"]["highlight-color"]}}, 5000);
  setTimeout(() => {if (cycle == window.render_cycle) {techno_div.style.color = display_palettes["rancid"]["highlight-color"]}}, 5000);
  setTimeout(() => {if (cycle == window.render_cycle) {courtesy_div.style.color = display_palettes["rancid"]["highlight-color"]}}, 6000);
  setTimeout(() => {if (cycle == window.render_cycle) {document.getElementById("start-mix-button").style.display = "unset"}},7000);

};

mixRenderFunction["rancid"] = renderRancid;
