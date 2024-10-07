import { useEffect, useState } from "react";
import "./App.css";
import { MealCard } from "./components/MealCard";
import axios from "axios";
import { NavBar } from "./components/NavBar";
import { LoadingOutlined } from "@ant-design/icons";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMess, setError] = useState();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        setResults(response.data.meals || []);
        if (results != []) {
          setLoading(false);
          setError(false);
        } else {
          console.log("the meal you entered is not available");
        }
      } catch (error) {
        console.log("error fetching ", error);
        setLoading(false);
        setError("Ops! Something went wrong. Try again");
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
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* display search results */}
      {loading ? (
        <div className="text-xl mt-52 ">
          <LoadingOutlined />
        </div>
      ) : (
        <div className="data p-4">
          {results.length > 0 ? (
            results?.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)
          ) : (
            <div className="mt-52 col-span-3">Meal recipe unavailable</div>
          )}
        </div>
      )}

      {errorMess && <div className="mt-52 p-1 ">{errorMess}</div>}
    </>
  );
}

export default App;
