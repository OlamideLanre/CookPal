import { useEffect, useState } from "react";
import "./App.css";
import { MealCard } from "./components/MealCard";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

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

        setResults(response.data.meals || []);
        console.log(results);
      } catch (error) {
        console.log("error fetching ", error);
      }
    };
    fetchMeal();
  }, [searchTerm]);
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="font-bold">Meal Search</h1>
      </div>
      <form>
        <input
          type="text"
          placeholder="find meal..."
          value={searchTerm}
          onChange={handleSearchTerm}
          className="rounded border-blue-400 py-2 px-4 border-solid"
        />
      </form>
      {/* display search results */}
      <div className="grid grid-cols-4 gap-10">
        {results?.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </>
  );
}

export default App;
