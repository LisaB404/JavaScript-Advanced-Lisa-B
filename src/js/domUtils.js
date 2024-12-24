// Funzioni per manipolare DOM
export function showLoad(loadingElement) {
    loadingElement.style.display = "block";
}

export function hideLoad(loadingElement) {
    loadingElement.style.display = "none";
}

export function validateInput(inputElement, resultsContainer) {
    const input = inputElement.value.trim();
    if (input === "") {
        resultsContainer.innerHTML = "<h2>Please, enter a valid category!</h2>";
        return false;
    }
    return true;
}

export function createResultsTitle(parent) {
    let resultsTitle = document.querySelector(".resultsTitle");
    if (!resultsTitle) {
        resultsTitle = document.createElement("h2");
        resultsTitle.classList.add("resultsTitle");
        resultsTitle.textContent = "Results:";
        parent.appendChild(resultsTitle);
    }
    return resultsTitle;
}