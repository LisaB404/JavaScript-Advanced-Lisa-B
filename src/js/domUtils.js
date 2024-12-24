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
