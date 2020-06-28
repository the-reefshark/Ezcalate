import React, { useState, useEffect } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';

import "./timer.css"


// For now, our timer does not allow user to run while in the background
// Timer must be open

const Timer = props => {
  
  const [seconds, setSeconds] = useState( ()=>{
    console.log(typeof(props.CurrentTime))
    return props.CurrentTime;
  });

  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
    
    if (isActive === true) { // initially false
        return props.handleTimer(props.currentID, seconds)
    }
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);

    return props.handleTimer(props.currentID, 0)
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);


  // function that changes single digits to double digits
  function converter(n){
    return n > 9 ? "" + n: "0" + n;
  }

  //Display of timer
  var current_seconds = seconds
  var display_hours = converter(Math.floor(current_seconds / 3600))
  current_seconds %= 3600;
  var display_minutes = converter(Math.floor(current_seconds / 60));
  var display_seconds = converter(current_seconds % 60);

  


  return (
    <div className="app">
      <div className="time">
        {display_hours}:{display_minutes}:{display_seconds}
      </div>
      <div className="row">
        <IconButton onClick={toggle}>
          {isActive ? <PauseCircleOutlineIcon/> : <PlayCircleOutlineIcon/>}
        </IconButton>

        {/* <IconButton onClick={toggle}>
          <CheckCircleOutlineIcon/>
        </IconButton> */}

        <IconButton className="button" onClick={reset}>
          <ReplayIcon/>
        </IconButton>
      </div>
    </div>
  );
};

export default Timer;