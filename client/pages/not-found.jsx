import React from 'react';

const styles = {
  pageContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh'
  }
};

export default function NotFound(props) {
  return (
    <div style={styles.pageContent}>
      <div className="card text-center m-5 w-100">
        <div className="card-body">
          <i className="fa-solid fa-dog fs-1"></i>
          <h5 className="card-title"> Uh oh, we could not find the page you were looking for!</h5>
          <a href="#" className="text-black">Click here to return home</a>
        </div>
      </div>
    </div>
  );
}
