import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';
import parseRoute from './lib/parse-route';
import Matches from './pages/matches';
import SavedMatches from './pages/saved-matches';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const parsedRoutes = parseRoute(window.location.hash);
      this.setState({ route: parsedRoutes });
    });
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
  }

  render() {
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
