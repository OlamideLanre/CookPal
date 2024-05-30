import axios from "axios";
import { MealCard } from "../components/MealCard";

function ViewRecipie({ meal }) {
  const FetchRecipeDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=53065`
      );
      console.log(response.data.meals[0]);

      const instructions = document.getElementsByClassName("instructions");
      instructions[0].innerHTML = response.data.meals[0].strInstructions;
      console.log(instructions);
    } catch (error) {
      console.log(error);
    }
  };
  FetchRecipeDetails();
  return (
    <>
      <h1>Detalis page</h1>
      <p className="mt-3">
        <h3 className="font-bold text-xl text-start">Instructions</h3>
        <p className="text-justify instructions"></p>
      </p>
    </>
  );
}
export default ViewRecipie;
