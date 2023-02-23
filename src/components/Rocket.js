import React from 'react';
import Card from 'react-bootstrap/Card';

const Rocket = (
  {
    name, details, success, upcoming,
  },
) => <Card className='m-2'>
      <Card.Body>
        <Card.Title data-testid='title'>{name}</Card.Title>
        <Card.Text data-testid='details' style={{ color: '#a8abb3' }}>{details}</Card.Text>
        <h4 style={{ color: '#a8abb3' }}>Flight Status: {success ? 'Successfully Flew' : 'Blown Away'}</h4>
        <h4 style={{ color: '#a8abb3' }}>Upcoming Status: {upcoming ? 'True' : 'False'}</h4>
      </Card.Body>
    </Card>;

export default Rocket;
