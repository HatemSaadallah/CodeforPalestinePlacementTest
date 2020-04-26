import React from 'react';


// This is the go back button

function GoBack(props){
  return(
    <span>
      <button onClick={props.goBack}>Go Back</button>
    </span>
  );
}

export default GoBack;
