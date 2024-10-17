import React, { useState, Fragment, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const apiURL = "http://localhost:9090/api"

const BookList = () => {

    const [books, setBooks] = useState([]);

    function formatDate(dateString) {
        return dateString.split('T')[0];
    }

    // Use useEffect to make the API call only once when the component mounts
    useEffect(() => {
        axios.get(`${apiURL}/books`)
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error: ', error));
    }, []);


    return (
        <Fragment>
            <Container>
                <h1 className="text-center my-4">Book List</h1>
                <Table responsive striped bordered hover className="mt-4">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Publication Date</th>
                            <th>ISBN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book.entry_id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{formatDate(book.publication_date)}</td>
                                <td>{book.isbn}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Fragment>
    )
}

export default BookList;