function renderRancid() {
  info("renderRancid", "called");
  const container = document.getElementById("mix-name");

  // clean up from last run - probably need to do this before moving to the page
  // also need to check how many times this render is run depending on where it is 
  container.innerHTML = "";
  container.style = "";};

mixRenderFunction["rancid"] = renderRancid;
