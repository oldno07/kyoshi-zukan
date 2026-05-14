import { initComponents } from "./components.js";
import { loadCreatures } from "./creatures.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initComponents();

  await loadCreatures();
});
