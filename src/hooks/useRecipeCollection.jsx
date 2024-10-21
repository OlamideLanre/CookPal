import { useState, useEffect } from "react";
export const useRecipeCollection = (storageKey) => {
  const [userID, setUserID] = useState(null);
  const [recipes, setRecipes] = useState(() => {
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      const savedRecipes = localStorage.getItem(`${storageKey}_${sessionID}`);
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

  const addRecipe = (recipe) => {
    const isInList = recipes.some((r) => r.ID === recipe.ID);
    if (!isInList) {
      const updatedList = [...recipes, recipe];
      setRecipes(updatedList);
      if (userID) {
        localStorage.setItem(
          `${storageKey}_${userID}`,
          JSON.stringify(updatedList)
        );
      }
      alert("Added to " + storageKey);
    } else {
      alert("Recipe already in " + storageKey);
    }
  };

  const removeRecipe = (id) => {
    // delete a particular recipe from favorites
    const updateAfterRemove = recipes.filter((r) => r.ID !== id);
    setRecipes(updateAfterRemove);
    localStorage.setItem(
      `${storageKey}_${userID}`,
      JSON.stringify(updateAfterRemove)
    );
  };

  return { recipes, addRecipe, removeRecipe };
};
