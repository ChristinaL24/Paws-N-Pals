import React from 'react';

export default class ViewDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: null,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`/api/matches/${this.props.petId}`)
      .then(res => res.json())
      .then(animal => this.setState({ animal }));
  }

  render() {
    // if (this.state.isLoading === true) {
    //   return (
    //     <div className="text-center position-absolute top-50 start-50 translate-middle">
    //       <div className="spinner-border" role="status">
    //         <span className="visually-hidden">Loading...</span>
    //       </div>
    //     </div>
    //   );
    // } else {
    return (
        <div className='card card-margin'>
          <div className="row g-0">
            <div className="col-md-4 tan-bg">
              <img src='' className="img-fluid rounded-start" alt="matched pet" />
            </div>
            <div className="col-md-8 tan-bg">
              <div className="card-body p-4">
                <h2 className="card-title green-text mb-4 media-font-size"> </h2>
                <p className="card-text text-secondary"><span className="fw-bolder">Location:</span></p>
                <p className="card-text text-secondary"><span className="fw-bolder">Age:</span></p>
                <p className="card-text text-secondary"><span className="fw-bolder">Breed:</span> </p>
                <p className="card-text text-secondary"><span className="fw-bolder">Size:</span> </p>
                <p className="card-text text-secondary"><span className="fw-bolder">Gender:</span> </p>
              </div>
              <a href='#saved-matches'>
                <i className="fa-solid fa-circle-arrow-left green-text ps-4 pb-3"></i>
              </a>
            </div>
          </div>
        </div>
    );

  }
}
