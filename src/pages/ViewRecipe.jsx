import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeftOutlined,
  HomeFilled,
  LoadingOutlined,
} from "@ant-design/icons";

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
      setError("Ops! Something went wrong. Try again");
      if (error.message == "Network Error") {
        setError(
          "Ops! something went wrong." +
            " Check your internet connection and try again!"
        );
      }
    }
  };

  useEffect(() => {
    FetchRecipeDetails();
  }, [idMeal]);

  return (
    <>
      <div className="mt-4">
        <Link to="/" className="bg-yellow-500 p-2 ml-3 rounded-sm">
          <HomeFilled className="items-start" />
        </Link>

        {/* <img src="cook-book.png" alt="logo" srcset="" width={"40px"} /> */}
      </div>

      <div className="container p-10 mx-auto">
        <h1 className="meal font-bold text-3xl">{mealDetails.strMeal}</h1>
        {loading ? (
          <div className="text-xl mt-60">
            <LoadingOutlined />
          </div>
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

      {errorMess && <div className="text-xl mt-52">{errorMess}</div>}
    </>
  );
}
export default ViewRecipie;
