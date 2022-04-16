// import axios from "axios";
import { useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MovieContext } from "../../contex/movie-context";
import "./list.css";

export default function Product() {
  const titleRef = useRef();
  const { state } = useContext(MovieContext);
  const {
    state: { list },
  } = useLocation();

  const updateHandler = async (e) => {
    e.preventDefault();
    // try {
    //   const result = await axios.put("lists/" + list._id, {
    //     title: titleRef.current.value,
    //   });
    //   console.log(result.data);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
          <div className="content">
            {state.movies
              .filter((movie) => list.content.includes(movie._id))
              .map((movie) => (
                <span key={movie._id} className="content-movie">
                  {movie.title}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input ref={titleRef} type="text" defaultValue={list.title} />
            <label>Genre</label>
            <input type="text" defaultValue={list.genre} />
            <label>Type</label>
            <select name="type" id="type">
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={updateHandler}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
