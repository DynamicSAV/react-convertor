import React from 'react';

const allNumberSystems = ['BIN', 'DEC', 'HEX', 'ROM'];

export const Block = ({ value, numberSystem, onChangeSystem, onChangeValue }) => (
  <div className="block">
    <ul className="numberSystems">
      {allNumberSystems.map((sys) => (
        <li
          onClick={() => onChangeSystem(sys)}
          className={numberSystem === sys ? 'active' : ''}
          key={sys}
        >
          {sys}
        </li>
      ))}
    </ul>
    <textarea 
      onChange={(e) => onChangeValue(e.target.value)}
      type="textarea"
      value={value}
      placeholder={0}
    />
  </div>
);
