

function renderSlimy() {
  info("renderSlimy", "called");

  const cycle = crypto.randomUUID()
  window.render_cycle = cycle;
  info("renderSlimy start","local: " + cycle + ", global: " + window.render_cycle)
  
  const container = document.getElementById("mix-name");
  
  container.style["grid-template-rows"] = "25% 15% 45% 15%";
  //container.style["grid-template-rows"] = "20% 30% 50%";

  const firstRow = createRow("first-row", row_styles);
  if (window.innerHeight > window.innerWidth) {
    firstRow.style["grid-template-columns"] = "80% 20%";
  } else {
    firstRow.style["grid-template-columns"] = "90% 10%";
  };
  container.appendChild(firstRow);

  const dj_div = createElement("dj", "DJ INCREDIBLY ANNOYING", getHiddenStyles());
  appendAndFit(firstRow,dj_div);
  
  const presents_div = createElement("presents", "PRESENTS", "height:70%; width:100%; text-align:center");
  appendAndFit(firstRow,presents_div);

  const secondRow = createRow("second-row", "");
  container.appendChild(secondRow);

  // this is sss on two lines
  const sss_sizer_div = createElement("sizer", "Sweaty ♡ Sticky", getHiddenStyles());
  appendAndFit(secondRow,sss_sizer_div);
  secondRowFontSize = Number(sss_sizer_div.children["0"].style["font-size"].slice(0, -2));
  secondRow.innerHTML = "";
  secondRow.style = row_styles;
  secondRow.style["grid-template-columns"] = "45% 10% 45%";
  secondRow.style["margin-top"] = "auto";
  secondRow.style["margin-bottom"] = "auto";
  secondRow.style["text-align"] = "center";

  const secondRowStyles = "color: " + display_palettes[getMixFromId(window.target_mix) || "default"]["background-color"] + ";font-size: " + 0.7 * secondRowFontSize + "px";
  console.log(secondRowStyles);
  const sweaty = createElement("sweaty", "SWEATY", secondRowStyles);
  sweaty.style["text-align"] = "right";
  secondRow.append(sweaty);
  const firstHeart = createElement("fh", "♡", secondRowStyles);
  secondRow.append(firstHeart);
  const sticky = createElement("sticky", "STICKY", secondRowStyles);
  sticky.style["text-align"] = "left";
  secondRow.append(sticky);

  const thirdRow = createRow("third-row", "");
  container.appendChild(thirdRow);
  const slimy_sizer = createElement("slimy", "SLIMY", getHiddenStyles());
  appendAndFit(thirdRow,slimy_sizer);
  thirdRowFontSize = Number(slimy_sizer.children["0"].style["font-size"].slice(0, -2));
  thirdRow.innerHTML = "";
  thirdRow.style["margin-top"] = "auto";
  thirdRow.style["margin-bottom"] = "auto";
  thirdRow.style["text-align"] = "center";
  if (window.innerHeight > window.innerWidth) {
    fontMultiplier = 1;
    lineMultiplier = 1;
  } else {
    fontMultiplier = 1.5;
    lineMultiplier = 0.8;
  };
  const thirdRowStyles = "color: " + display_palettes[getMixFromId(window.target_mix) || "default"]["background-color"] + "; font-size: " + fontMultiplier * thirdRowFontSize + "px; line-height: " + lineMultiplier * thirdRowFontSize + "px";
  console.log(thirdRowStyles);
  const slimy = createElement("slimy", "SLIMY", thirdRowStyles);
  thirdRow.append(slimy);
  /*
  // this is sss on one line
  const sss_sizer_div = createElement("sizer", "[ SWEATY ♡ STICKY ♡ SLIMY ]", getHiddenStyles());
  appendAndFit(secondRow,sss_sizer_div);
  secondRowFontSize = (0.85 * Number(sss_sizer_div.children["0"].style["font-size"].slice(0, -2))) + "px";
  secondRow.innerHTML = "";
  secondRow.style = row_styles;
  secondRow.style["grid-template-columns"] = "4% 28% 4% 28% 4% 28% 4%";
  secondRow.style["margin-top"] = "auto";
  secondRow.style["margin-bottom"] = "auto";
   
  const firstBracket = createElement("fb", "[", getHiddenStyles() + "; font-size: " + secondRowFontSize);
  secondRow.append(firstBracket);
  const sweaty = createElement("sweaty", "Sweaty", getHiddenStyles() + "; font-size: " + secondRowFontSize);
  secondRow.append(sweaty);
  const firstHeart = createElement("fh", "♡", getHiddenStyles() + "; font-size: " + secondRowFontSize);
  secondRow.append(firstHeart);
  const sticky = createElement("sticky", "Sticky", getHiddenStyles() + "; font-size: " + secondRowFontSize);
  secondRow.append(sticky);
  const secondHeart = createElement("sh", "♡", getHiddenStyles() + "; font-size: " + secondRowFontSize);
  secondRow.append(secondHeart);
  const slimy = createElement("slimy", "Slimy", getHiddenStyles() + "; font-size: " + secondRowFontSize);
  secondRow.append(slimy);
  const secondBracket = createElement("fb", "]", getHiddenStyles() + "; font-size: " + secondRowFontSize);
  secondRow.append(secondBracket);
  */
  const fourthRow = createRow("fourthRow", "margin: auto; font-size: 25px");
  container.appendChild(fourthRow);
  const slimeParty = createElement("slime-party", "WELCOME 💚 TO THE SLIME PARTY", "color: " + display_palettes["slimy"]["highlight-color"]);
  /*
  const fourthRow = createRow("fourth-row", "margin: auto; display: flex; font-size: 35px");
  container.appendChild(fourthRow);
  const puke1 = createElement("puke1", "🤮", "");
  const puke2 = createElement("puke2", "🤮", "");
  const puke3 = createElement("puke3", "🤮", "");
  */
   
  // could try css animations, don't know how they play when appending but might be easier??
  
  // two lines
  setTimeout(() => {if (cycle == window.render_cycle) {info("renderSlimy","local: " + cycle + ", global: " + window.render_cycle);dj_div.style.color = display_palettes["slimy"]["highlight-color"]}}, 1000);
  setTimeout(() => {if (cycle == window.render_cycle) {presents_div.style.color = display_palettes["slimy"]["highlight-color"]}}, 2000);

  setTimeout(() => {if (cycle == window.render_cycle) {sweaty.style.color = display_palettes["slimy"]["highlight-color"]}}, 3000);
  setTimeout(() => {if (cycle == window.render_cycle) {firstHeart.style.color = display_palettes["slimy"]["highlight-color"]}}, 3500);
  setTimeout(() => {if (cycle == window.render_cycle) {sticky.style.color = display_palettes["slimy"]["highlight-color"]}}, 4000);
  setTimeout(() => {if (cycle == window.render_cycle) {slimy.style.color = display_palettes["slimy"]["highlight-color"]}}, 5000);
  setTimeout(() => {if (cycle == window.render_cycle) {fourthRow.append(slimeParty)}}, 6000);
  setTimeout(() => {if (cycle == window.render_cycle) { document.getElementById("start-mix-button").style.display = "unset"}},7000);  

  /*
  // one line
  setTimeout(() => {dj_div.style.color = display_palettes["slimy"]["highlight-color"]}, 1000);
  setTimeout(() => {presents_div.style.color = display_palettes["slimy"]["highlight-color"]}, 2000);
  setTimeout(() => {firstBracket.style.color = display_palettes["slimy"]["highlight-color"]}, 3000);
  setTimeout(() => {secondBracket.style.color = display_palettes["slimy"]["highlight-color"]}, 3000);
  setTimeout(() => {sweaty.style.color = display_palettes["slimy"]["highlight-color"]}, 4000);
  setTimeout(() => {firstHeart.style.color = display_palettes["slimy"]["highlight-color"]}, 4500);
  setTimeout(() => {sticky.style.color = display_palettes["slimy"]["highlight-color"]}, 5000);
  setTimeout(() => {secondHeart.style.color = display_palettes["slimy"]["highlight-color"]}, 5500);
  setTimeout(() => {slimy.style.color = display_palettes["slimy"]["highlight-color"]}, 6000);
  */
  //setTimeout(() => {fourthRow.append(puke1)}, 8000);
  //setTimeout(() => {fourthRow.append(puke2)}, 8500);
 // setTimeout(() => {fourthRow.append(puke3)}, 9000);

};

mixRenderFunction["slimy"] = renderSlimy;
