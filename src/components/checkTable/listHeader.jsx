import React, {useState} from 'react';

function ListHeader(props) {
  const [selected, ] = useState(props.selected);

  return (
    <div className='listHeader'>
      <span className='warning'>{props.name}</span>
      <span className='centered'>Shown: {props.shown}</span>
      <span className='aright'>Selected: {selected}</span>
    </div>
  );
}

export default ListHeader