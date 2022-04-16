import { useContext, useState } from "react";
import "./newList.css";
import { useHistory } from "react-router-dom";
import { MovieContext } from "../../contex/movie-context";
import axios from "axios";

export default function NewList() {
  const [list, setList] = useState(null);
  const { state } = useContext(MovieContext);
  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("lists", list);
      console.log(result.data);
      history.push("/lists");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newList">
      <h1 className="addListTitle">New List</h1>
      <form className="addListForm">
        <div className="formLeft">
          <div className="addListItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addListItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addListItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
          <button className="addListButton" onClick={handleSubmit}>
            Create
          </button>
        </div>
        <div className="formRight">
          <div className="addListItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {state.movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
