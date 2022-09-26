import React from 'react';
import { Block } from './Components/Block.jsx';

import './index.scss';

function App() {
  const [fromNumberSystem, setFromNumberSystem] = React.useState('DEC');
  const [toNumberSystem, setToNumberSystem] = React.useState('ROM');
  const [fromNumber, setFromNumber] = React.useState();
  const [toNumber, setToNumber] = React.useState(0);

  const onChangeFromSystem = (value) => {
    setFromNumber(value);
  };
  
  const onChangeToSystem = (value) => {
    setToNumber(value);
  };

  return (
    <div className="App">
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
  );
}

export default App;
