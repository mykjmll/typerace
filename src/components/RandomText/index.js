import React from 'react';
import StyledRandomText from './StyledRandomText';

const RandomText = ({randomTextArr, inputTextArr}) => {
  return (
    <StyledRandomText>
      {randomTextArr.map((text, idx) => {
        return inputTextArr[idx] === text ? (
          <span className="text-success" key={idx}>{text + ' '}</span>
        ) : (
          <span key={idx}>{text + ' '}</span>
        )
      })}
    </StyledRandomText>
  );
}

export default RandomText