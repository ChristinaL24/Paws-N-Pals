import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';
import parseRoute from './lib/parse-route';
import Matches from './pages/matches';
import SavedMatches from './pages/saved-matches';
import ViewDetails from './pages/view-details';
import SignUp from './pages/sign-up';
import LogIn from './pages/log-in';
import decodeToken from './lib/decode-token';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);

  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const parsedRoutes = parseRoute(window.location.hash);
      this.setState({ route: parsedRoutes });
    });
    const token = window.localStorage.getItem('jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  displayMatches() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'matches') {
      return <Matches />;
    }
    if (route.path === 'saved-matches') {
      return <SavedMatches />;
    }
    if (route.path === 'details') {
      const petId = route.params.get('petId');
      return <ViewDetails petId={petId}/>;
    }
    if (route.path === 'sign-up') {
      return <SignUp />;
    }
    if (route.path === 'log-in') {
      return <LogIn />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    return (
      <>
        <Navbar />
        <PageContainer>
          { this.displayMatches() }
        </PageContainer>
      </>
    );
  }
}
