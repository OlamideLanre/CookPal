import axios from "axios";
import { MealCard } from "../components/MealCard";
import { useParams } from "react-router-dom";

function ViewRecipie() {
  const idMeal = useParams();

  const FetchRecipeDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal.mealID}`
      );
      if (response.data.meals === null) {
        console.log("NO DETAILS FOR MEAL ID: " + idMeal.mealID);
      } else {
        const instructions = document.getElementsByClassName("instructions");
        instructions[0].innerHTML = response.data.meals[0].strInstructions;
        const mealName = document.getElementsByClassName("meal");
        mealName[0].innerHTML = response.data.meals[0].strMeal;
      }
    } catch (error) {
      console.log(error);
    }
  };
  FetchRecipeDetails();
  return (
    <>
      <h1 className="meal font-bold text-3xl"></h1>
      <div className="mt-3">
        <h3 className="font-bold text-xl text-start">Instructions</h3>
        <p className="text-justify instructions"></p>
      </div>
    </>
  );
}
export default ViewRecipie;
