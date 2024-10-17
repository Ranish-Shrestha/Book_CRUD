import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

// components 
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import FilterBook from './components/FilterBook';

function App() {
  return <Router>
    <Navbar bg="light" data-bs-theme="light" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Book Inventory</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Book List</Nav.Link>
            <Nav.Link href="/add-book">Add Book</Nav.Link>
            <Nav.Link href="/filter-book">Filter Book</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/filter-book" element={<FilterBook />} />
    </Routes>
  </Router>;
}

export default App;
