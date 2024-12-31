import get from 'lodash.get';
import assign from 'lodash.assign';

// Funzioni per manipolare DOM
export function showLoad(loadingElement) {
    loadingElement.style.display = "block";
}

export function hideLoad(loadingElement) {
    loadingElement.style.display = "none";
}

//Valida l'input dell'utente
export function validateInput(inputElement, resultsContainer) {
    const input = inputElement.value.trim();
    if (input === "") {
        resultsContainer.innerHTML = "<h2>Please, enter a valid category!</h2>";
        return false;
    }
    return true;
}

//Crea il titolo dei risultati
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

//Crea la tabella dei risultati
export function createResultsTable(container) {
    let table = document.querySelector(".resultsTable");
    if (!table) {
        table = document.createElement("table");
        table.classList.add("resultsTable");
        container.appendChild(table);
    } else {
        table.innerHTML = "";
    }
    return table;
}

//Mostra i dettagli del libro
function showBookDetails(bookDetails, body) {
    const description = get(bookDetails, 'description.value', 'Description not available.');

    const existingDetails = document.querySelector(".bookDetails");
    if (existingDetails) existingDetails.remove();

    const details = document.createElement("div");
    assign(details, {
        className: 'bookDetails',
        innerHTML: `
            <p>Description:<br>${description}</p>
            <button class="bookDetailsClose">&times;</button>
        `,
    });
    body.appendChild(details);

    const closeDetails = document.querySelector(".bookDetailsClose");
    closeDetails.addEventListener("click", () => {
        details.remove();
    });
}

//Crea una riga della tabella dei risultati
export function createTableRow(book, fetchBookDetails, body) {
    const title = get(book, 'title', 'Book not available.');
    const authors = get(book, 'author_name', []).join(', ');
    const cover = get(book, 'cover_i')
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : '../img/default-cover.png';

    const row = document.createElement("tr");

    const tdCover = row.appendChild(document.createElement("td"));
    tdCover.innerHTML = `<img src="${cover}" alt="${title}">`;

    const tdData = row.appendChild(document.createElement("td"));
    tdData.textContent = `${title} - ${authors}`;

    tdCover.addEventListener("click", async () => {
        const bookDetails = await fetchBookDetails(book.key);
        showBookDetails(bookDetails, body);
    });

    return row;
}