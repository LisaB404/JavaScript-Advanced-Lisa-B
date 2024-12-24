import axios from 'axios';
import get from 'lodash.get';

export async function fetchBooks(query) {
    const apiUrl = `https://openlibrary.org/search.json?q=${query}`;
    const response = await axios.get(apiUrl);
    return response.data.docs;
}

export async function fetchBookDetails(bookKey) {
    const apiUrl = `https://openlibrary.org${bookKey}.json`;
    const response = await axios.get(apiUrl);
    return response.data;
}