import React from 'react';

export default class ViewDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: null
    };
  }

  componentDidMount() {
    fetch(`/api/details/${this.props.petId}`)
      .then(res => res.json())
      .then(animal => this.setState({ animal }));
  }

  render() {
    if (!this.state.animal) return null;
    const { details } = this.state.animal;
    return (
        <div className='card card-margin'>
          <div className="row g-0">
            <div className="col-md-4 tan-bg">
              <img src={details.photos} className="img-fluid rounded-start" alt={details.name} />
            </div>
            <div className="col-md-8 tan-bg">
              <div className="card-body p-4">
              <h2 className="card-title green-text mb-4 media-font-size d-flex justify-content-center">{details.name}</h2>
                <p className="card-text text-secondary"><span className="fw-bolder">Location: </span>{details.address.city}, {details.address.state}</p>
                <p className="card-text text-secondary"><span className="fw-bolder">Age: </span>{details.age}</p>
                <p className="card-text text-secondary"><span className="fw-bolder">Breed: </span>{details.breed}</p>
                <p className="card-text text-secondary"><span className="fw-bolder">Gender: </span>{details.gender} </p>
                <p className="card-text text-secondary"><span className="fw-bolder">Size: </span>{details.size} </p>
                <p className="card-text text-secondary">
                  <span className="fw-bolder">URL: </span>
                  <a href={details.url} className='text-secondary'>{details.url}</a>
                </p>
                <p className="card-text text-secondary">
                  <span className="fw-bolder">Address: </span>
                  <p>
                    {details.address.address1} <br/>
                    {details.address.city}, {details.address.state}, {details.address.postcode}
                  </p>
                </p>
                <p className="card-text text-secondary"><span className="fw-bolder">Email: </span>{details.email}</p>
                <p className="card-text text-secondary"><span className="fw-bolder">Phone: </span>{details.phone}</p>
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
