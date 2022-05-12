import React from 'react';
export default class SavedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.renderSavedMatches();
  }

  renderSavedMatches() {
    fetch('/api/saved')
      .then(response => response.json())
      .then(animals => this.setState({ animals }))
      .catch(error => {
        console.error('Error', error);
      });
  }

  handleDelete(event) {
    const selectedPetId = Number(event.currentTarget.id);
    let petIndex = null;
    for (let i = 0; i < this.state.animals.length; i++) {
      if (this.state.animals[i].petId === selectedPetId) {
        petIndex = i;
      }
    }
    fetch(`/api/details/${selectedPetId}`, {
      method: 'DELETE'
    })
      .then(() => {
        const deleteAnimal = this.state.animals.slice();
        deleteAnimal.splice(petIndex, 1);
        this.setState({ animals: deleteAnimal });
      })
      .catch(error => {
        console.error('Error', error);
      });
  }

  render() {
    if (this.state.animals[0] === undefined) {
      return (
        <div className="card text-center m-5">
          <div className="card-body">
            <h5 className="card-title">There are currently no saved pals.</h5>
            <p className="card-text">Log in to see your saved pals! <i className="fa-solid fa-dog fs-5"></i>
            </p>
            <a href="#log-in" className="btn green-bg text-white">Let&apos;s go!</a>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <h1 className="green-text d-flex justify-content-center mt-4">Matched Pals</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4 ms-5 me-5 mt-1 mb-5">
            {this.state.animals.map(animal => {
              return (
                <div key={animal.petId} className='col'>
                  <div className="card h-100 hover">
                    <button className='bg-transparent position-absolute top-0 start-0' id={animal.petId} onClick={this.handleDelete}>
                      <i className="fa-solid fa-heart"></i>
                    </button>
                    <a href={`#details?petId=${animal.petId}`} className='text-decoration-none'>
                      <img src={animal.details.photos} className="card-img-top" alt={animal.details.name} />
                      <div className="card-body tan-bg">
                        <h2 className="card-title green-text mb-3 d-flex justify-content-center">{animal.details.name}</h2>
                        <p className="card-text text-secondary"><span className="fw-bolder">Location:</span> {animal.details.address.city}, {animal.details.address.state}</p>
                        <p className="card-text text-secondary"><span className="fw-bolder">Age:</span> {animal.details.age}</p>
                        <p className="card-text text-secondary"><span className="fw-bolder">Breed:</span> {animal.details.breed}</p>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }
  }
}
