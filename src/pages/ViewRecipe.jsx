import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeftOutlined,
  HomeFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { Redirect } from "../components/Redirect";

function ViewRecipie() {
  const idMeal = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [mealDetails, setMealDetails] = useState([]);
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
        setMealDetails(meal);
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
      console.log("error fetching: ", error);
      setLoading(false);
      setError("Something went wrong. Try again");
      if (error.message == "Network Error") {
        setError(" Check your internet connection and try again!");
      }
    }
  };

  useEffect(() => {
    FetchRecipeDetails();
  }, [idMeal]);

  return (
    <>
      <Redirect />
      <div className="container p-10 mx-auto">
        <h1 className="meal font-bold text-3xl">{mealDetails.strMeal}</h1>
        <p>{mealDetails.strArea}</p>
        {loading ? (
          <div className="text-xl mt-60">
            <LoadingOutlined />
          </div>
        ) : errorMess ? (
          <div className="text-xl mt-52">{errorMess}</div>
        ) : (
          <div className="container">
            <div className="flex gap-7 flex-wrap">
              <div className="img-header mt-2">
                <img
                  src={mealDetails.strMealThumb}
                  alt={mealDetails.strMeal}
                  // width={"200px"}
                  className="rounded-xl"
                />
              </div>
              <div className="mt-3 instructions-div">
                <h3 className="font-bold text-xl text-start text-yellow-500">
                  Instructions
                </h3>
                <p className="ins text-justify">
                  {mealDetails.strInstructions}
                </p>
                <div className="flex">
                  <h3 className="font-bold text-lg text-start text-yellow-500">
                    Category:
                  </h3>
                  <span className="text-lg font-semibold ml-2 ">
                    {mealDetails.strCategory}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 mt-3 ingredients-div">
              <p className="text-lg font-semibold">Ingredients: </p>
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className=" border py-2 rounded-xl ingredient-list w-40"
                >
                  {ingredient}
                </span>
              ))}
            </div>

            <div className="text-start mt-3 underline text-yellow-500">
              <a href={mealDetails.strYoutube} className="text-m font-semibold">
                Watch recipe tutorial
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default ViewRecipie;
