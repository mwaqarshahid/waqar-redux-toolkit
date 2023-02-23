import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { getRocketItems } from '../features/rocket/rocketSlice';

const CustomNavbar = () => {
  const [filter, setFilter] = useState({});
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRocketItems(filter));
  }, [dispatch, filter]);

  const handleSearchInput = ({ target: { value } }) => {
    setSearch(value);
    if (!value) {
      setFilter({ search: '' });
    }
  };

  const handleSearch = () => {
    setFilter({ search });
  };

  const handleFilterInput = (eventKey) => {
    if (eventKey === 'reset') {
      return setFilter({});
    }
    const events = [{
      value: 'week',
      key: 'date',
    }, {
      value: 'month',
      key: 'date',
    }, {
      value: 'year',
      key: 'date',
    }, {
      value: 'success',
      key: 'launchStatus',
    }, {
      value: 'failure',
      key: 'launchStatus',
    }, {
      value: 'true',
      key: 'upcomingStatus',
    }, {
      value: 'false',
      key: 'upcomingStatus',
    }];
    const currentFilter = events.find((e) => e.value === eventKey);
    const newFilters = { ...filter, [currentFilter.key]: currentFilter.value };
    return setFilter(newFilters);
  };

  return (
    <Navbar expand="lg">
      <Container className='nav-center'>
        <Navbar.Brand>Space X Tech.</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
            onSelect={handleFilterInput}
          >
            <NavDropdown title='Filters' id='navbarScrollingDropdown'>
              <NavDropdown title='By Launch Date' drop={'end'}>
                <NavDropdown.Item eventKey='week'>Last Week</NavDropdown.Item>
                <NavDropdown.Item eventKey='month'>Last Month</NavDropdown.Item>
                <NavDropdown.Item eventKey='year'>Last Year</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='By Launch Status' drop={'end'}>
                <NavDropdown.Item eventKey='success'>Success</NavDropdown.Item>
                <NavDropdown.Item eventKey='failure'>Failure</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='By Upcoming Status' drop={'end'}>
                <NavDropdown.Item eventKey='true'>True</NavDropdown.Item>
                <NavDropdown.Item eventKey='false'>False</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey='reset'>Reset Filters</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className='d-flex'>
            <Form.Control
              data-testid='searchName'
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
              value={search}
              onChange={handleSearchInput}
            />
            <Button variant='primary' onClick={() => handleSearch()}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default CustomNavbar;
