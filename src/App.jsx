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
  const [availRecipe, setAvailRecipe] = useState();

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
          setError(" Check your internet connection and try again");
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
        <div className="text-xl mt-52 text-center">
          <LoadingOutlined />
        </div>
      ) : (
        <div className="data p-4">
          {results.length > 0
            ? results?.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)
            : availRecipe && (
                <div className="mt-52 col-span-3">Meal recipe unavailable</div>
              )}
        </div>
      )}

      {errorMess && <div className="mt-52 text-center ">{errorMess}</div>}
    </>
  );
}

export default App;
