import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from './App';
import SourceComponent from "./SourceComponent";
import { Grid, Header, Container,Image } from "semantic-ui-react";
import { Link } from 'react-router-dom';

 const RouterApp = () => (
    <div className="App">
  <Container>
    <Router>
        <Grid centered>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column width={6}>
              <Link to={'/'}>
              <Image src="/21601.png" className="App-logo" alt="logo" />
              </Link>
            </Grid.Column>
            <Grid.Column width={10}>
              <Link to={'/'}>
              <Header as="h2">Welcome to Top News</Header>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Routes>
        <Route exact path='/' element={<App />} />
        <Route path='/source/:id' element={<SourceComponent />} />
        </Routes>
    </Router>
    </Container>
    </div>
);

export default RouterApp;