import React, { useEffect } from 'react';
import { Block } from './Components/Block/Block.jsx';

import './index.scss';

function App() {
  const [fromNumberSystem, setFromNumberSystem] = React.useState('DEC');
  const [toNumberSystem, setToNumberSystem] = React.useState('ROM');
  const [fromNumber, setFromNumber] = React.useState(1);
  const [toNumber, setToNumber] = React.useState();

  const onChangeFromSystem = (value) => {
    setFromNumber(value.toUpperCase());
  };

  const onChangeToSystem = (value) => {
    setToNumber(value.toUpperCase());
  };

  const onClickConvert = (params = {}) => {
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    fetch(`http://convertor/index.php/?${query}`)
      .then((response) => response.text())
      .then((response) => {
        setToNumber(response);
        console.log(response);
      });
  };

  useEffect(() => {
    console.log('Загрузился');
  }, []);

  return (
    <div className="App">
      <div className="blocks">
        <Block
          value={fromNumber}
          numberSystem={fromNumberSystem}
          onChangeSystem={setFromNumberSystem} //(sys) => console.log(sys)
          onChangeValue={onChangeFromSystem}
        />
        <Block
          value={toNumber}
          numberSystem={toNumberSystem}
          onChangeSystem={setToNumberSystem}
          onChangeValue={onChangeToSystem}
        />
      </div>
      <button
        className="convertBtn"
        onClick={onClickConvert( {
          fromNumberSystem,
          toNumberSystem,
          fromNumber,
          toNumber,
        })}
      >
        CONVERT!
      </button>
      {fromNumberSystem === 'ROM' || toNumberSystem === 'ROM' ? (
          <ul className="romesInfo">
            <li>I  = 1</li>
            <li>IV = 4</li>
            <li>V  = 5</li>
            <li>IX = 9</li>
            <li>X  = 10</li>
            <li>XL = 40</li>
            <li>L  = 50</li>
            <li>XC = 90</li>
            <li>C  = 100</li>
            <li>CD = 400</li>
            <li>D  = 500</li>
            <li>CM = 900</li>
            <li>M  = 1000</li>
          </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
