import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getAllCharacters = async () => {
      await axios
        .get(
          `https://rickandmortyapi.com/api/character?page=${page}&name=${query}`
        )
        .then((res) => {
          setData(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getAllCharacters();
  }, [page, query]);

  return (
    <div>
      <div className="my-5 text-end">
        <input
        placeholder="Search here..."
          type="search"
          id="search"
          onChange={(e) => setQuery(e.target.value)}
          className="form-control w-25"
        />
      </div>
      <div className="row">
        {data.map((e) => (
          <div key={e.id} className="col-lg-3 col-md-6 col-12">
            <img src={e.image} alt="character img" className="w-100" />
            <div>
              <p>
                <b>Name:</b> {e.name}
              </p>
              <p>
                <b>Status:</b> {e.status}
              </p>
              <p>
                <b>Species:</b> {e.species}
              </p>
              <p>
                <b>Gender:</b> {e.gender}
              </p>
              <p>
                <b>Origin:</b> {e.origin.name}
              </p>
              <p>
                <b>Location:</b> {e.location.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => setPage(page - 1)}
          disabled={page < 2 ? true : false}
        >
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default App;
