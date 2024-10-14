import { Link } from "react-router-dom";
import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function MealCard({ meal }) {
  const Favorite_Recipes = [];
  const [userID, setUserID] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      const savedRecipes = localStorage.getItem(`favRecipes_${sessionID}`);
      return savedRecipes ? JSON.parse(savedRecipes) : [];
    }
    return [];
  });

  // generated a unique ID for every user that visits the app
  const generatedUniqueID = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  useEffect(() => {
    // persisting the ID in local storage
    let uniqueID = localStorage.getItem("sessionID");
    if (!uniqueID) {
      uniqueID = generatedUniqueID();
      localStorage.setItem("sessionID", uniqueID);
    }
    setUserID(uniqueID);
  }, []);

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
      alert("already in favorites");
    } else if (Favorite_Recipes.push(Addedrecipe)) {
      const updatedList = [...favorites, Addedrecipe];
      setFavorites(updatedList);
      if (userID) {
        localStorage.setItem(
          `favRecipes_${userID}`,
          JSON.stringify(updatedList)
        );
        console.log(userID);
      }

      toast("added to favorites");
      console.log(favorites);
      alert("added to favorites");
    } else {
      alert("something went wrong");
    }
    // console.log(Addedrecipe);
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
