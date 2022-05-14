import React from 'react';
import GoogleMaps from '../components/google-maps';
import Geocode from 'react-geocode';
import { CardGroup, Card } from 'react-bootstrap';

const styles = {
  image: {
    width: '100%',
    height: '70%',
    objectFit: 'cover'
  }
};

export default class ViewDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: null,
      map: null
    };
  }

  componentDidMount() {
    this.renderDetails();
  }

  renderDetails() {
    fetch(`/api/details/${this.props.petId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(animal => {
        this.setState({ animal });
      })
      .then(() => this.getCoordinates());
  }

  getCoordinates() {
    const { details } = this.state.animal;
    Geocode.fromAddress(`${details.address.address1} ${details.address.city} ${details.address.state}
                         ${details.address.postcode}`, process.env.GOOGLEMAPS_KEY)
      .then(response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          map: { lat: lat, lng: lng }
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    if (!this.state.animal) return null;

    const { details } = this.state.animal;
    return (
      <CardGroup className='mt-3'>
        <Card className='m-2'>
          <h1 className="text-secondary mt-2 d-flex justify-content-center">{details.name}</h1>
          <Card.Img variant="top" src={details.photos} style={styles.image} alt={details.name}/>
          <Card.Body>
            <Card.Text className='mt-2'>
              <p className="text-secondary"><span className="fw-bolder">Age: </span>{details.age}</p>
              <p className="text-secondary"><span className="fw-bolder">Breed: </span>{details.breed}</p>
              <p className="text-secondary"><span className="fw-bolder">Gender: </span>{details.gender} </p>
              <p className="text-secondary"><span className="fw-bolder">Size: </span>{details.size} </p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='m-2'>
          <Card.Body>
            <Card.Text>
              <p className="text-secondary">
                <span className="fw-bolder">Location: </span>
              </p>
              <p className='text-secondary'>
                {details.address.address1} {details.address.city}, {details.address.state}, {details.address.postcode}
              </p>
              <GoogleMaps coordinates={this.state.map}/>
              { details.email !== null &&
                <p className="text-secondary mt-2">
                  <span className="fw-bolder">Email: </span>
                  {details.email}
                </p>
              }
              { details.email === null &&
                <p className="text-secondary mt-2">
                  <span className="fw-bolder">Email: </span>
                  Sorry! This pal&#39;s organization did not provide an email
                </p>
              }
              { details.phone !== null &&
                <p className="text-secondary">
                  <span className="fw-bolder">Phone: </span>
                  {details.phone}
                </p>
              }
              { details.phone === null &&
                <p className="text-secondary">
                  <span className="fw-bolder">Phone: </span>
                  Sorry! This pal&#39;s organization did not provide a number
                </p>
              }
              <p className="text-secondary">
                <span className="fw-bolder">Need more info? <br /> </span>
                <a href={details.url} className='text-secondary'>
                  Click on this link to learn how you can adopt this pal!
                </a>
              </p>
            </Card.Text>
            <a href='#saved-matches'>
              <i className="fa-solid fa-circle-arrow-left green-text mt-3"></i>
            </a>
          </Card.Body>
        </Card>
      </CardGroup>
    );
  }
}
