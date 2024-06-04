import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ViewRecipie() {
  const idMeal = useParams();
  const [ingredients, setIngredients] = useState([]);

  const FetchRecipeDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal.mealID}`
      );
      if (response.data.meals === null) {
        console.log("NO DETAILS FOR MEAL ID: " + idMeal.mealID);
      } else {
        const meal = response.data.meals[0];
        const instructions = document.getElementsByClassName("instructions");
        instructions[0].innerHTML = meal.strInstructions;
        const mealName = document.getElementsByClassName("meal");
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
      console.log(error);
    }
  };
  // FetchRecipeDetails();

  useEffect(() => {
    FetchRecipeDetails();
  }, [idMeal]);

  return (
    <>
      <h1 className="meal font-bold text-3xl"></h1>
      <div className="mt-3">
        <h3 className="font-bold text-xl text-start">Instructions</h3>
        <p className="text-justify instructions"></p>
      </div>

      <p className="text-start mt-2">
        <span className="text-lg font-semibold">Ingredients: </span> <br />
        {ingredients.map((ingredient, index) => (
          <span key={index} className="block ingredient-list">
            {ingredient}
          </span>
        ))}
      </p>
    </>
  );
}
export default ViewRecipie;
