import React from 'react';

const GifItem = ({ gif }) => {
  return (
    <li>
      <img src={gif.images.downsized.url} alt="gif searched"/>
    </li>
  )
};

export default GifItem;