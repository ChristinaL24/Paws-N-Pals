import React from 'react';

export default class SavedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: []
    };
    this.renderSavedMatches = this.renderSavedMatches.bind(this);
  }

  componentDidMount() {
    this.renderSavedMatches();
  }

  renderSavedMatches() {
    fetch('/api/matches')
      .then(response => response.json())
      .then(animals => this.setState({ animals }))
      .catch(error => {
        console.error('Error', error);
      });
  }

  render() {
    return (
      <a href='#view-details' className='text-decoration-none'>
        <div className="row row-cols-1 row-cols-md-3 g-4 m-5">
          {this.state.animals.map(animal => {
            return (
              <div key={animal.petId} className='col'>
                <div className="card h-100 card-hover">
                  <img src={animal.details.photos} className="card-img-top" alt="matched pet" />
                  <div className="card-body tan-bg">
                    <h2 className="card-title green-text mb-3">{animal.details.name}</h2>
                    <p className="card-text text-secondary"><span className="fw-bolder">Location: </span>{animal.details.location}</p>
                    <p className="card-text text-secondary"><span className="fw-bolder">Age: </span>{animal.details.age}</p>
                    <p className="card-text text-secondary"><span className="fw-bolder">Breed: </span>{animal.details.breed}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </a>
    );
  }
}
