import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import CustomNavbar from './components/CustomNavbar';
import RocketContainer from './containers/RocketContainer';

function App() {
  const { isLoading } = useSelector((store) => store.rocket);

  const loader = () => (
    <div className='loading'>
      <h1>Loading...</h1>
      <Spinner animation='grow' variant='dark' />
    </div>
  );

  return (
    <main>
      <CustomNavbar />
      {isLoading ? loader() : <RocketContainer />}
    </main>
  );
}
export default App;
