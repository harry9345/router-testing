import React, { useState } from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from 'react-router-dom';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import styled from 'styled-components';

const Button = styled.button`
  background: Bisque;
  fontsize: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid Chocolate;
  border-darius: 3px;
`;
const Input = styled.input`
  margin: 0.25rem;
`;

const Page = styled.div`
  padding: 10rem;
  backgtound-color: papayawhip;
`;

const Navigation = styled.div`
  padding: 1rem;
  background-color: BurlyWood;
`;

const Footer = styled.div`
  padding: 1rem;
  background-color: Chocolate;
  margin-top: 1rem;
`;

const Home = () => (
  <div style={{ padding: '20px' }}>
    <h2>Harry Notes App</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
);

const Note = ({ note }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <strong>{note.important ? 'important' : 'not Imoortant '}</strong>
    </div>
  );
};
const Notes = ({ notes }) => (
  <div>
    <h2>Notes : </h2>{' '}
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>{note.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);
const Users = () => (
  <div style={{ padding: '20px' }}>
    <h2>app Users :</h2>
    <ul>
      <li>
        <h3>Harry</h3>
      </li>
      <li>
        <h3>Mona</h3>
      </li>
      <li>
        <h3>Majid</h3>
      </li>
    </ul>
  </div>
);

const Login = (props) => {
  const navigate = useNavigate();
  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogIn('Harry');
    navigate('/');
  };
  return (
    <div style={{ padding: '20px' }}>
      <h2>LogIn</h2>
      <form onSubmit={onSubmit}>
        UserName :
        <Input />
        Password :
        <Input type='password' />
        <Button type='submit' variant='contained' color='primary'>
          Login
        </Button>
      </form>
    </div>
  );
};
function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Harry',
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Mona',
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: false,
      user: 'Majid',
    },
  ]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const match = useMatch('/notes/:id');
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  const login = (user) => {
    setUser(user);
    setMessage(`Welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const padding = {
    padding: 20,
  };

  return (
    <Page>
      <Navigation>
        <Link style={padding} to='/'>
          home
        </Link>
        <Link style={padding} to='/notes'>
          notes
        </Link>
        <Link style={padding} to='/users'>
          users
        </Link>

        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to='/login'>
            login{' '}
          </Link>
        )}
      </Navigation>
      {message && <Alert serverity='success'>{message}</Alert>}
      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login onLogIn={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer style={padding}>
        <br />
        <em>Note app, depatement of computer and science</em>
      </Footer>
    </Page>
  );
}

export default App;
