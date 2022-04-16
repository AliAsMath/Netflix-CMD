import "./listList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const result = await axios.get("lists");

        setLists(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLists();
  }, []);

  const handleDelete = async (id) => {
    setLists(lists.filter((item) => item._id !== id));
    try {
      await axios.delete("lists/" + id);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "_id", headerName: "id", width: 200 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    { field: "type", headerName: "Type", width: 120 },
    { field: "genre", headerName: "Genre", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/list/" + params.row._id,
                state: { list: params.row },
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
      <Link to="/newlist">
        <button className="productAddButton">Create</button>
      </Link>
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
