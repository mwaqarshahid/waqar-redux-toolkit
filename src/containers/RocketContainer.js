import React from 'react';
import { useSelector } from 'react-redux';
import Rocket from '../components/Rocket';

const RocketContainer = () => {
  const { rocketItems } = useSelector((store) => store.rocket);

  return (
    <div className='rocket'>
      <header>
        <h2>Latest Launches</h2>
      </header>
      {
        rocketItems.length <= 0
          ? <h3>No Rockets Found</h3>
          : rocketItems.map((item) => <Rocket key={item.name} {...item} />)
      }
    </div>
  );
};
export default RocketContainer;
