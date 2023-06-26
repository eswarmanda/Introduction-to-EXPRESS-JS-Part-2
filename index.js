const express = require("express");
const {open} = require('sqlite')
const path = require('path');
const sqlite3 = require('sqlite3');
const app = express();

const dbPath = path.join( __dirname, 'goodreads.db');

let db = null;



const initializeDbAndServer = async () => {

    try {
        db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })
        app.listen(3001, () => {
        console.log('server running at http://localhost:3001');
        });

    } catch (e) {
        console.log(`DB error: ${e.message}`);
    }

}

initializeDbAndServer();

app.get('/books/', async (request, response) => {

    const getBooksQuery = `
            SELECT * FROM book ORDER BY book_id;
    `;
    
    const booksArray = await db.all(getBooksQuery);
    response.send(booksArray);
});