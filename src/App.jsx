import { useEffect, useState } from "react";
import "./App.css";
import { MealCard } from "./components/MealCard";
import axios from "axios";
import ViewRecipie from "./pages/ViewRecipe";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMess, setError] = useState();

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };
  // useEffect hook for
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        console.log(response);
        setResults(response.data.meals || []);
        if (results != []) {
          setLoading(false);
        } else {
        }
        console.log(results);
      } catch (error) {
        console.log("error fetching ", error);
        setLoading(false);
        setError("Ops! An error occured. Try again");
        if (error.message == "Network Error") {
          setError(
            "Ops! something went wrong." +
              " Check your internet connection and try again!"
          );
        }
      }
    };
    fetchMeal();
  }, [searchTerm]);
  return (
    <>
      <div className="container mx-auto pb-2">
        <h1
          className="font-bold text-3xl"
          style={{
            color: "#F8E06C",
          }}
        >
          CookPal
        </h1>
      </div>
      <form>
        <input
          type="text"
          placeholder="find meal..."
          value={searchTerm}
          onChange={handleSearchTerm}
          className="rounded border-gray-400 py-2 px-28 border-solid outline-none border"
        />
      </form>

      {/* display search results */}
      {loading ? (
        <div className="text-xl mt-52 ">Loading...</div>
      ) : (
        <div className="grid grid-cols-4 gap-10">
          {results?.map(
            (meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            )
            // console.log(meal.idMeal)
          )}
        </div>
      )}
      {errorMess && <div className="text-xl mt-52 ">{errorMess}</div>}
    </>
  );
}

export default App;
