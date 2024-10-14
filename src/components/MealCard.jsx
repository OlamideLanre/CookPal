import { Link } from "react-router-dom";
import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function MealCard({ meal }) {
  const Favorite_Recipes = [];
  const [favorites, setFavorites] = useState(() => {
    const savedRecipes = localStorage.getItem("favRecipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const addToFav = () => {
    const Addedrecipe = {
      ID: meal.idMeal,
      MealImg: meal.strMealThumb,
      MealName: meal.strMeal,
    };
    const isInFavorites = favorites.some(
      (favorite) => favorite.ID === Addedrecipe.ID
    );
    if (isInFavorites) {
      console.log("is in favorites");
    } else if (Favorite_Recipes.push(Addedrecipe)) {
      const updatedList = [...favorites, Addedrecipe];
      setFavorites(updatedList);
      localStorage.setItem("favRecipes", JSON.stringify(updatedList));
      toast("added to favorites");
      console.log(favorites);
    }
    console.log(Addedrecipe);
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
              <HeartOutlined className="icon-child" onClick={addToFav} />
            </div>

            <div title="add to bookmark" className="bookmark">
              <PlusOutlined className="icon-child" />
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
        {/* <div>
          <ToastContainer position="top-center" />
        </div> */}

        {/* <p className="ml-2 italic text-center">
          <span>Category: </span>
          {meal.strCategory}
          <span className="ml-3">
            Origin: <span>{meal.strArea}</span>
          </span>
        </p> */}
      </div>
    </>
  );
}
