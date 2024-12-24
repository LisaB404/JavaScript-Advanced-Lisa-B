import { fetchBooks, fetchBookDetails } from './api.js';
import { showLoad, hideLoad, validateInput } from './domUtils.js';
import get from 'lodash.get';
import sampleSize from 'lodash.samplesize';
import assign from 'lodash.assign';

export function setupEventListeners(inputSearch, srcButton, divResults, loading, body) {
    srcButton.addEventListener("click", async () => {
        if (!validateInput(inputSearch, divResults)) return;

        const query = inputSearch.value.trim();
        divResults.innerHTML = "";
        showLoad(loading);

        try {
            const books = await fetchBooks(query);

            if (books.length === 0) {
                divResults.innerHTML = "<h2>No books found.</h2>";
                return;
            }

            // Crea una tabella per i risultati
            let resultsTable = document.querySelector(".resultsTable");
            if (!resultsTable) {
                resultsTable = document.createElement("table");
                resultsTable.classList.add("resultsTable");
                divResults.appendChild(resultsTable);
            } else {
                resultsTable.innerHTML = "";
            }

            // Mostra solo i primi 10 risultati
            const limitedResults = sampleSize(books, 10);
            limitedResults.forEach(book => {
                const title = get(book, 'title', 'Book not available.');
                const authors = get(book, 'author_name', []).join(', ');
                const cover = get(book, 'cover_i')
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                    : '../img/default-cover.png';

                const resultsItem = document.createElement("tr");
                const tdCover = resultsItem.appendChild(document.createElement("td"));
                tdCover.innerHTML = `<img src="${cover}" alt="${title}">`;
                const tdData = resultsItem.appendChild(document.createElement("td"));
                tdData.textContent = `${title} - ${authors}`;

                tdCover.addEventListener("click", async () => {
                    const bookDetails = await fetchBookDetails(book.key);
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
                });

                resultsTable.appendChild(resultsItem);
            });
        } catch (error) {
            divResults.innerHTML = `<h2>Error while fetching data: ${error.message}</h2>`;
        } finally {
            hideLoad(loading);
        }
    });
}