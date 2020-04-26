import React from 'react';

function GoBack(props){
  return(
    <span>
      <button onClick={props.goBack}>Go Back</button>
    </span>
  );
}

export default GoBack;
