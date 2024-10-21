import { Link } from "react-router-dom";
import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecipeCollection } from "../hooks/useRecipeCollection";

export function MealCard({ meal }) {
  const { addRecipe: addToFav } = useRecipeCollection("favRecipes");
  const { addRecipe: addToBookmark } = useRecipeCollection("bookMarks");

  const handleAddToFavorites = () => {
    const newFavorite = {
      ID: meal.idMeal,
      MealImg: meal.strMealThumb,
      MealName: meal.strMeal,
    };
    addToFav(newFavorite);
  };

  const HandleAddToBookmark = () => {
    const bookmarked = {
      ID: meal.idMeal,
      MealImg: meal.strMealThumb,
      MealName: meal.strMeal,
    };
    addToBookmark(bookmarked);
  };
  return (
    <>
      <div className="border p4 mt-10 mealImage rounded-2xl card">
        {/* image div */}
        <div className=" flex justify-center items-center mt-4 gap-6">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="mb-2 rounded-md"
            width={"150px"}
          />
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-xl px-5">{meal.strMeal}</p>
          <div className="icons">
            <div title="add to favorites" className="fav">
              <HeartOutlined
                className="icon-child"
                onClick={handleAddToFavorites}
              />
            </div>

            <div title="add to bookmark" className="bookmark">
              <PlusOutlined
                className="icon-child"
                onClick={HandleAddToBookmark}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between py-2 px-5">
          <Link
            key={meal.idMeal}
            to={`/details/${meal.idMeal}`}
            className="view"
            style={{
              color: "#0F4122",
            }}
          >
            View recipe
          </Link>
        </div>
      </div>
    </>
  );
}
