import "../css/styles.css";
import { setupEventListeners } from './events.js';

document.addEventListener("DOMContentLoaded", function () {
    const inputSearch = document.getElementById("inputSearch");
    const srcButton = document.getElementById("srcBtn");
    const divResults = document.getElementById("results");
    const loading = document.getElementById("loading");
    const body = document.querySelector("body");

    setupEventListeners(inputSearch, srcButton, divResults, loading, body);
});