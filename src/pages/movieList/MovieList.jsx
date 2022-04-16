import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { MovieContext } from "../../contex/movie-context";

export default function MovieList() {
  const { state, func } = useContext(MovieContext);

  const handleDelete = async (id) => {
    func.success(state.movies.filter((item) => item._id !== id));
    try {
      await axios.delete("movies/" + id);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    {
      field: "isSeries",
      headerName: "IsSeries",
      width: 150,
      renderCell: (params) => (params.isSeries ? "Yes" : "No"),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/movie/" + params.row._id,
                state: { movie: params.row },
              }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to="/newmovie">
        <button className="productAddButton">Create</button>
      </Link>
      <DataGrid
        rows={state.movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
