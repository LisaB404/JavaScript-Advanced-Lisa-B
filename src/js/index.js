import "../css/styles.css";

document.addEventListener("DOMContentLoaded", function() {

// Seleziona elementi del DOM
const inputSearch = document.getElementById("inputSearch");
const srcButton = document.getElementById("srcBtn");
const divResults = document.getElementById("results");
const loading = document.getElementById("loading");
//const resultsList = document.getElementById("list");

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
        divResults.innerHTML = "<h2>Per favore, inserisci una categoria valida!</h2>";
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
            throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.docs.length === 0) {
            divResults.innerHTML = "<h2>Nessun libro trovato.</h2>";
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
        
        // Limitare il numero di risultati a 15 random
        const limitedResults = data.docs
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);

        // Aggiungere informazioni sui libri ai risultati
        limitedResults.forEach(book => {
            const title = book.title || "Titolo non disponibile";
            const authors = book.author_name ? book.author_name.join(", ") : "Autore non disponibile";
            const cover = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "https://via.placeholder.com/150";

            const resultsItem = document.createElement("tr");
            const tdCover = resultsItem.appendChild(document.createElement("td"));
            tdCover.innerHTML = `<img src="${cover}" alt="${title}">`;
            const tdData = resultsItem.appendChild(document.createElement("td"));
            tdData.textContent = `${title} - ${authors}`;
            
            resultsTable.appendChild(resultsItem);
            });

    } catch (error) {
        divResults.innerHTML = `<h2>Errore durante il recupero dei dati: ${error.message}</h2>`;
    } finally {
        hideLoad();
    }
}

// Event listener sul pulsante di ricerca
srcButton.addEventListener("click", getBooks);

});

// Funzione per mostrare i dettagli di un libro
/*async function showBookDetails(bookKey) {
    const apiUrl = `https://openlibrary.org${bookKey}.json`;
    showLoader();

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        hideLoader();

        // Visualizza i dettagli del libro nel div #bookDetails
        bookDetailsDiv.style.display = "block";
        
        if (data.description) {
            const description = typeof data.description === 'string' ? data.description : data.description.value;
            bookDescriptionParagraph.textContent = description;
        } else {
            bookDescriptionParagraph.textContent = "Descrizione non disponibile.";
        }

    } catch (error) {
        console.error("Errore nel recupero della descrizione del libro", error);
    } finally {
        hideLoader();
    }
}
}*/


/*
VERSIONE FUNZIONANTE LISTA RISULTATI
       // Aggiungere titoli e autori ai risultati
        data.docs.forEach(book => {
            const title = book.title || "Titolo non disponibile";
            const authors = book.author_name ? book.author_name.join(", ") : "Autore non disponibile";

            const resultsItem = document.createElement("li");
            resultsItem.classList.add("listItem");
            resultsItem.textContent = `${title} - ${authors}`;
            resultsList.appendChild(resultsItem);
            });
*/