import React from 'react';

export default class SavedMatches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      photos: '',
      name: '',
      location: '',
      age: '',
      breed: ''
    };
    this.handleSavedMatches = this.handleSavedMatches.bind(this);
  }

  componentDidMount() {
    // create a prototype method handleSavedMatches and call it in here
    this.handleSavedMatches();
  }

  handleSavedMatches() {
    const queryString = window.location.hash.split('?');
    const params = new URLSearchParams(queryString[1]);
    const petId = params.get('id');

    fetch(`/api/matches/${petId}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(animal =>
        this.setState({
          id: animal.id,
          photos: animal,
          name: animal.primary_photo_cropped.full,
          location: animal.contact.address.city,
          age: animal.age,
          breed: animal.breeds.primary
        }))
      .catch(error => {
        console.error('Error', error);
      });
  }

  render() {

    return (

      <div className="row row-cols-1 row-cols-md-3 g-4 m-5">
        <div className="col">
          <div className="card h-100">
            <img src="./images/sample-img.JPG" className="card-img-top" alt="..."/>
              <div className="card-body tan-bg">
                <h2 className="card-title green-text mb-3">Meet: Teddy</h2>
                <p className="card-text text-secondary"><span className="fw-bolder">Location:</span> Irvine, CA</p>
                <p className="card-text text-secondary"><span className="fw-bolder">Age:</span> Immortal</p>
                <p className="card-text text-secondary"><span className="fw-bolder">Breed:</span> Pomeranian &amp; Poodle</p>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
