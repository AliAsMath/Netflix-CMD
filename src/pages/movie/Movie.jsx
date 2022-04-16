import { useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import axios from "axios";
import { useRef } from "react";

export default function Product() {
  const titleRef = useRef();
  const {
    state: { movie },
  } = useLocation();

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put("movies/" + movie._id, {
        title: titleRef.current.value,
      });
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input ref={titleRef} type="text" defaultValue={movie.title} />
            <label>Year</label>
            <input type="text" defaultValue={movie.year} />
            <label>Genre</label>
            <input type="text" defaultValue={movie.genre} />
            <label>Limit</label>
            <input type="text" defaultValue={movie.limit} />
            <label>Is Series?</label>
            <select name="isSeries" id="isSeries">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <label>Trailer</label>
            <input type="file" />
            <label>Video</label>
            <input type="file" />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={updateHandler}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
