import React from 'react';

export default function LoadingSpinner(props) {
  return (
    <div className="text-center position-absolute top-50 start-50 translate-middle">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
