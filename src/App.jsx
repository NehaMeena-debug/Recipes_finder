import { useState } from "react";
import axios from "axios";

const UNSPLASH_ACCESS_KEY = "UpMJyN-dPoo72qnN-YI4n92ZHUiAOMGHfrIXMVNk_Ug"; 
const MEALDB_API = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const App = () => {
  const [likedRecipes, setLikedRecipes] = useState({});
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleLike = (recipeId) => {
    setLikedRecipes((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }));
  };

  const fetchRecipes = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const mealResponse = await axios.get(`${MEALDB_API}${query}`);
      const meals = mealResponse.data.meals || [];

      // Fetch HD images from Unsplash
      const unsplashResponse = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=${meals.length}`
      );
      const images = unsplashResponse.data.results;

      // Combine meals with high-quality images
      const updatedRecipes = meals.map((meal, index) => ({
        ...meal,
        hdImage: images[index]?.urls?.regular || meal.strMealThumb || "https://via.placeholder.com/400?text=No+Image",
      }));

      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')", minHeight: "100vh" }}
    >
      <div className="flex justify-between col-row mb-12 mt-5">
        <div>
          <img className="h-20" src="Recipro.png" alt="logo" />
        </div>

        <div className="flex justify-center p-4 text-center mb-6">
          <input
            type="text"
            placeholder="Search recipes"
            className="w-94 h-10 border px-4 border-gray-300 rounded-lg pl-2 focus:outline-none focus:ring focus:ring-pink-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={fetchRecipes}
            className="ml-2 h-10 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-pink-500 transition"
          >
            Search
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500"></p>}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={recipe.hdImage} alt={recipe.strMeal} className="w-full h-56 p-3 object-cover" />

            <div className="p-4">
              <p className="text-yellow-500 text-sm">⭐⭐⭐⭐☆</p>
              <div className="flex justify-between">
                <h3 className="text-sm pr-4 font-semibold">{recipe.strMeal}</h3>
                <button onClick={() => toggleLike(recipe.idMeal)} className="like-button">
                  <i
                    className={likedRecipes[recipe.idMeal] ? "ri-heart-fill" : "ri-heart-line"}
                    style={{ color: likedRecipes[recipe.idMeal] ? "red" : "black" }}
                  ></i>
                </button>
              </div>

              <a
                href={recipe.strSource || `https://www.themealdb.com/meal/${recipe.idMeal}`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <button className="px-6 py-2 mt-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-pink-500 transition">
                  View Recipe
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
