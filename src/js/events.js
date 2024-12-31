import { fetchBooks, fetchBookDetails } from './api.js';
import { showLoad, hideLoad, validateInput, createResultsTitle, createResultsTable, showBookDetails, createTableRow } from './domUtils.js';
import sampleSize from 'lodash.samplesize';

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

            createResultsTitle(divResults);
            
            const resultsTable = createResultsTable(divResults);
            
            const limitedResults = sampleSize(books, 10); // Mostra solo i primi 10 risultati
            limitedResults.forEach(book => {
                const row = createTableRow(book, fetchBookDetails, body);
                resultsTable.appendChild(row);
            });
        } catch (error) {
            divResults.innerHTML = `<h2>Error while fetching data: ${error.message}</h2>`;
        } finally {
            hideLoad(loading);
        }
    });
}