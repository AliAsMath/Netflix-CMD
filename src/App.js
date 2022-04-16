import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/newMovie";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import axios from "axios";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./contex/auth-contex";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8800/api/";

function App() {
  const {
    state: { user },
  } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/">
          <Topbar />
          <div className="container">
            <Sidebar />
            <Switch>
              {!user ? (
                <Redirect to="/login" />
              ) : (
                <>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/users">
                    <UserList />
                  </Route>
                  <Route path="/user/:userId">
                    <User />
                  </Route>
                  <Route path="/newUser">
                    <NewUser />
                  </Route>
                  <Route path="/movies">
                    <MovieList />
                  </Route>
                  <Route path="/movie/:movieId">
                    <Movie />
                  </Route>
                  <Route path="/newmovie">
                    <NewMovie />
                  </Route>
                  <Route path="/lists">
                    <ListList />
                  </Route>
                  <Route path="/list/:listId">
                    <List />
                  </Route>
                  <Route path="/newlist">
                    <NewList />
                  </Route>
                </>
              )}
            </Switch>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
