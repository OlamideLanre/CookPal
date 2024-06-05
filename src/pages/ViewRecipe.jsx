import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ViewRecipie() {
  const idMeal = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMess, setError] = useState();

  const FetchRecipeDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal.mealID}`
      );
      if (response.data.meals === null) {
        console.log("NO DETAILS FOR MEAL ID: " + idMeal.mealID);
      } else {
        setLoading(false);
        setError(false);
        const meal = response.data.meals[0];
        const Display_Instructions = document.getElementsByClassName("ins");
        const mealName = document.getElementsByClassName("meal");
        Display_Instructions[0].innerHTML = meal.strInstructions;
        mealName[0].innerHTML = meal.strMeal;
        const ingredientsList = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient) {
            ingredientsList.push(`${measure} ${ingredient}`);
          }
        }
        setIngredients(ingredientsList);
      }
    } catch (error) {
      if (error) {
        console.log("error fetching: ", error);
        setLoading(false);
        // setError("Ops! Something went wrong. Try again");
        // if (error.message == "Network Error") {
        //   setError(
        //     "Ops! something went wrong." +
        //       " Check your internet connection and try again!"
        //   );
        // }
      }
    }
  };

  useEffect(() => {
    FetchRecipeDetails();
  }, [idMeal]);

  return (
    <>
      <h1 className="meal font-bold text-3xl"></h1>
      {loading ? (
        <div className="text-xl mt-52">Fetching recipe...</div>
      ) : (
        <div>
          <div className="mt-3">
            <h3 className="font-bold text-xl text-start">Instructions</h3>
            <p className="ins text-justify"></p>
          </div>

          <div className="text-start mt-2">
            <span className="text-lg font-semibold">Ingredients: </span> <br />
            {ingredients.map((ingredient, index) => (
              <span key={index} className="block ingredient-list">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* {errorMess && <div className="text-xl mt-52">{errorMess}</div>} */}
    </>
  );
}
export default ViewRecipie;
