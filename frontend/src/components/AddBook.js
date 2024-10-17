import React, { Fragment, useState } from 'react'
import axios from 'axios';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { Notification, useToaster } from 'rsuite';

const apiURL = "http://localhost:9090/api"

const AddBook = () => {
    const toaster = useToaster();

    const [type, setType] = useState('info');
    const [message, setMessage] = useState('info');

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [isbn, setIsbn] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${apiURL}/book`, { title, author, genre, publicationDate, isbn })
            .then(response => {
                console.log(response.data)
                setMessage('Book details added successfully!');
                setType('success');
                toaster.push(toast, 'topCenter');

                setTitle('');
                setAuthor('');
                setGenre('');
                setIsbn('');
                setPublicationDate('');
            })
            .catch(err => {
                const errorMessage = err.response?.data?.error || 'An error occurred while adding the book';
                setMessage(errorMessage);
                setType('error');
                toaster.push(toast, 'topCenter');
            }
            );
    };

    const toast = (
        <Notification type={type} header={`${type}!`} closable>
            <p>{message}</p>
        </Notification>
    );

    return (
        <Fragment>
            <Container>
                <h1 className="text-center my-4">Add Book</h1>

                <Form onSubmit={handleSubmit} className='flex'>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm="2">Title</Form.Label>
                        <Col sm="10">
                            <Form.Control name="title" type='text' maxlength="100" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm="2">Author</Form.Label>
                        <Col sm="10">
                            <Form.Control name="author" type='text' maxlength="50" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm="2">Genre</Form.Label>
                        <Col sm="10">
                            <Form.Control name="genre" type='text' maxlength="100" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm="2">Publication Date</Form.Label>
                        <Col sm="10">
                            <Form.Control name="publicationDate" type='date' value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm="2">ISBN</Form.Label>
                        <Col sm="10">
                            {/* validates ISBN-10 and ISBN-13 formats */}
                            <Form.Control name="isbn" type='text' maxLength={20} value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="ISBN" pattern="^(97(8|9))?\d{9}(\d|X)$" required />
                            <Form.Text className="text-muted">
                                Enter a valid ISBN-10 (e.g., 123456789X) or ISBN-13 (e.g., 9781234567890).
                            </Form.Text>
                        </Col>
                    </Form.Group>
                    <Button variant="outline-success" type="submit">Add Book</Button>
                </Form>
            </Container>
        </Fragment>
    )
}

export default AddBook;