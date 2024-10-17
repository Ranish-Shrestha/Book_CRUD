import React, { useState, Fragment } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack, Table } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { Parser } from '@json2csv/plainjs';

const apiURL = "http://localhost:9090/api"

const FilterBook = () => {

    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationDate, setPublicationDate] = useState('');

    function formatDate(dateString) {
        return dateString.split('T')[0];
    }

    const filterBooks = (e) => {
        e.preventDefault();  // Prevent default form submit

        try {
            axios.post(`${apiURL}/books/filter`, {
                title, author, genre, publicationDate
            }, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => setBooks(response.data))
                .catch(error => console.error('Error: ', error));
        } catch (error) {
            console.error('Error fetching filtered books:', error);
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();

        // Define the columns and data for the table
        const columns = ["Title", "Author", "Genre", "Published Date"];
        const rows = books.map(book => [
            book.title,
            book.author,
            book.genre,
            formatDate(book.publication_date)
        ]);

        // Add the table to the document
        autoTable(doc, {
            head: [columns],
            body: rows,
        });

        // Save the PDF
        doc.save('book_list.pdf');

    };

    const exportCSV = () => {
        const parser = new Parser();
        const csv = parser.parse(books);
        // Create blob
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        // Download as CSV
        link.href = URL.createObjectURL(blob);
        link.download = 'book_list.csv';
        link.click();
    };


    return (
        <Fragment>
            <Container>
                <h1 className="text-center my-4">Filter Book</h1>

                <Form onSubmit={filterBooks}>
                    <Row className="g-3">
                        <Col xs={12} md={6} lg={3}>
                            <FloatingLabel controlId="floatingTitle" label="Title">
                                <Form.Control
                                    name="title"
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Title"
                                />
                            </FloatingLabel>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <FloatingLabel controlId="floatingAuthor" label="Author">
                                <Form.Control
                                    name="author"
                                    type='text'
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="Author"
                                />
                            </FloatingLabel>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <FloatingLabel controlId="floatingGenre" label="Genre">
                                <Form.Control
                                    name="genre"
                                    type='text'
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    placeholder="Genre"
                                />
                            </FloatingLabel>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <FloatingLabel controlId="floatingDate" label="Publication Date">
                                <Form.Control
                                    name="publicationDate"
                                    type='date'
                                    value={publicationDate}
                                    onChange={(e) => setPublicationDate(e.target.value)}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Stack direction="horizontal" className="mt-4" gap={3} justify="center">
                        <Button type="submit" variant="primary">Filter</Button>
                        <Button type="button" variant="secondary" onClick={exportPDF}>Export PDF</Button>
                        <Button type="button" variant="secondary" onClick={exportCSV}>Export CSV</Button>
                    </Stack>
                </Form>

                <hr />
                <Table responsive striped bordered className="mt-4">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Publication Date</th>
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Fragment>
    )
}

export default FilterBook