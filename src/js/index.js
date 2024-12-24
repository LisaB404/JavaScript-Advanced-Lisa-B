import "../css/styles.css";
import get from 'lodash.get';
import sampleSize from 'lodash.samplesize';
import assign from 'lodash.assign';

document.addEventListener("DOMContentLoaded", function() {

// Seleziona elementi del DOM
const inputSearch = document.getElementById("inputSearch");
const srcButton = document.getElementById("srcBtn");
const divResults = document.getElementById("results");
const loading = document.getElementById("loading");
const body = document.querySelector("body");

// Funzione per mostrare e nascondere loading
function showLoad() {
    loading.style.display = "block";
}

function hideLoad() {
    loading.style.display = "none";
}

// Funzione per validare input utente
function validateInput() {
    const input = inputSearch.value.trim();
    if (input === "") {
        divResults.innerHTML = "<h2>Please, enter a valid category!</h2>";
        return false;
    }
    return true;
}

// Funzione per recuperare i libri
async function getBooks() {
    const input = inputSearch.value.trim();

    if (!validateInput()) return;

    const apiUrl = `http://openlibrary.org/search.json?q=${input}`;
    divResults.innerHTML = ""; //svuota risultati precedenti
    showLoad();

    try {
        const response = await fetch(apiUrl); //effettua chiamata API
        
        // Controlla la risposta HTTP
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.docs.length === 0) {
            divResults.innerHTML = "<h2>No books found.</h2>";
            return;
        }

        // Titolo risultati
        let resultsTitle = document.querySelector(".resultsTitle");
        if(!resultsTitle) {
            resultsTitle = document.createElement("h2");
            resultsTitle.classList.add("resultsTitle");
            resultsTitle.textContent = "Risultati:";
            divResults.appendChild(resultsTitle);
        }
        
        // Crea tabella risultati e svuota se già presente
        let resultsTable = document.querySelector(".resultsTable");
        if (!resultsTable) {
            resultsTable = document.createElement("table");
            resultsTable.classList.add("resultsTable");
            divResults.appendChild(resultsTable);
        } else {
            resultsTable.innerHTML = "";
        }
        
        // Limitare il numero di risultati a 10 random
        const limitedResults = sampleSize(data.docs, 10);

        // Aggiungere informazioni sui libri ai risultati
        limitedResults.forEach(book => {
            const title = get(book, 'title', 'Book not available.');
            const authors = get(book, 'author_name', []).join(', ');
            const cover = get(book, 'cover_i')
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : 'img/default-cover.png';

            const resultsItem = document.createElement("tr");
            const tdCover = resultsItem.appendChild(document.createElement("td"));
            tdCover.innerHTML = `<img src="${cover}" alt="${title}">`;
            const tdData = resultsItem.appendChild(document.createElement("td"));
            tdData.textContent = `${title} - ${authors}`;
            
            tdCover.addEventListener("click", () => showBookDetails(book.key));
            
            resultsTable.appendChild(resultsItem);
            });
    } catch (error) {
        divResults.innerHTML = `<h2>Error while fetching data: ${error.message}</h2>`;
    } finally {
        hideLoad();
    }
}

// Funzione per mostrare i dettagli di un libro
async function showBookDetails(bookKey) {
    const apiUrl = `https://openlibrary.org${bookKey}.json`;
    showLoad();

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        hideLoad();

        const description = get(data, 'description.value', 'The description is not available.');

        // Rimuovi eventuale descrizione già aperta
        const existingDetails = document.querySelector(".bookDetails");
        if (existingDetails) {
            existingDetails.remove();
        }

        // Visualizza i dettagli del libro nel div #bookDetails - con lodash.assign
        const details = document.createElement("div");
        assign(details, {
            className: 'bookDetails',
            innerHTML: `
              <p class="description" id="description">Description: <br>${description}</p>
              <button class="bookDetailsClose">&times;</button>
            `,
          });
          body.appendChild(details);
          
        const closeDetails = document.querySelector(".bookDetailsClose");
        closeDetails.addEventListener("click", () => {
            details.remove();
        });
    } catch (error) {
        console.error("Error while fetching book details:", error);
    }

}

// Event listener sul pulsante di ricerca
srcButton.addEventListener("click", getBooks);

});