import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Container, Menu, Grid, Image, Form, Button, Card, Divider, Header, Icon, Segment } from 'semantic-ui-react'
import './App.css'
/*
const Menu = () => (
  <div className="menu">
    <NavLink
      exact activeStyle={{
        fontWeight: 'bold',
        color: 'DarkRed'
      }} to="/">anecdotes</NavLink> &nbsp;
    <NavLink
      exact activeStyle={{
        fontWeight: 'bold',
        color: 'DarkRed'
      }} to="/create">create new</NavLink> &nbsp;
    <NavLink
      exact activeStyle={{
        fontWeight: 'bold',
        color: 'DarkRed'
      }} to="/about">about</NavLink> &nbsp;>
  </div>
)
*/


const AnecdoteList = ({ anecdotes }) => (
  <Container centered style={ { width: 500 } }>
    <Header as='h2' color='grey'>Anecdotes</Header>
    <Segment.Group>
      {anecdotes.map(anecdote =>
        <Segment key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </Segment>)}
    </Segment.Group>
  </Container>
)

const About = () => (
  <div>
    <Header as='h2' color='grey'>About anecdote app</Header>
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}  style={ { paddingLeft: 50 } }>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is { ' "a story with a point." ' }</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column width={5}>
          <Image src='/images/Alan_Turing.jpg' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)
//style={ { marginTop: 50 } }
const Footer = () => (
  <Container textAlign='center'>
    <Divider />
    <p>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See<Icon link name='github' /> <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
    </p>
  </Container>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(

      <Card centered>
        <Card.Content>
          <Header as='h2' color='grey'>create a new anecdote</Header>
        </Card.Content>
        <Card.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>content</label>
              <input name='content' value={this.state.content} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>author</label>
              <input name='author' value={this.state.author} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>url for more info</label>
              <input name='info' value={this.state.info} onChange={this.handleChange} />
            </Form.Field>
            <Button basic color='green'>create</Button>
          </Form>
        </Card.Content>
      </Card>
    )

  }
}

const Anecdote = ({ anecdote }) => {
  return (
    <Container centered style={ { width: 600 } }>
      <Header as='h2' color='grey'>
        <Icon color='grey' name='quote right' />
        {anecdote.content}
        <Header.Subheader>by {anecdote.author}</Header.Subheader>
      </Header>
      <Header as='h4' color='grey'>has {anecdote.votes} votes</Header>
      <div><Icon circular color='grey' name='info' /> <a href='{anecdote.info}'>{anecdote.info}</a></div>
    </Container>
  )
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Header as='h1' color='grey'>Software anecdotes</Header>
        <Router>
          <div>

            <Menu stackable inverted size='large'>
              <Menu.Item as={Link} to='/'>
                anecdotes
              </Menu.Item>
              <Menu.Item as={Link} to='/create'>
                create new
              </Menu.Item>
              <Menu.Item as={Link} to='/about'>
                about
              </Menu.Item>
            </Menu>
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew}/>} />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Footer />
      </Container>
    )
  }
}

export default App
