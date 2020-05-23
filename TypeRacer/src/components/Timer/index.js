/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import StyledTimer from './StyledTimer';

const Timer = ({countdownTtimer, setCountdownTtimer}) => {

  useEffect(() => {
    let timer = 0, minutes, seconds;
    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        const countdownTtimer = minutes + ':' + seconds;

        setCountdownTtimer(countdownTtimer)
        
        if (++timer > 180) {
          clearInterval(interval);
        }
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <StyledTimer>
      <div className="time"> Time: {countdownTtimer} </div>
    </StyledTimer>
  );
}

export default Timer