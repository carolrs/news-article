import React from 'react';

const AboutModal = ({ onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <h2 className="font-bold text-2xl mb-2 lg: text:4xl">About this App</h2>
      <p>This is a NY Times Search App that allows users to search for articles on NY Times using any search term. Users can also view the details of each article.</p>
    </div>
  </div>
);

export default AboutModal;
