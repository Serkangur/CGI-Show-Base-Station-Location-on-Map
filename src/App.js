import './App.css';
import 'antd/dist/antd.css';
import LocationSearch from './components/LocationSearch';
import LocationMap from './components/LocationMap';
import { Col, Row } from 'antd';

import data from "./data/data.json";
import { useState } from 'react';

function App() {

  const [baseStation, setBaseStation] = useState(null);

  const onSearch = (filter) => {
    // let result = data.filter(filter)
    // setBaseStation(result)
    let bs= data.filter(function(item) {
      for (var key in filter) {
        if (item[key] === undefined || item[key] != filter[key])
          return false;
      }
      return true;
    });
    setBaseStation(bs);
  }

  return (
    <>
      <Row>
        <Col span={20} offset={2}>
          <LocationSearch onSearch={onSearch}/>
        </Col>
      </Row>
      <Row>
        <Col span={20} offset={2}>
          <LocationMap baseStation={baseStation}/>
        </Col>
      </Row>
    </>
  );
}

export default App;
