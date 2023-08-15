import {
  GET_RECIPES,
  GET_BY_NAME,
  GET_BY_ID,
  GET_DIETS,
  POST_RECIPE,
  FILTER_DIET,
  FILTER_CREATED,
  ORDER_NAME,
  ORDER_BY_HS,
  NEXT_PAGE,
  PREV_PAGE,
  HANDLE_PAGE,
  RESET_RECIPES,
  RESET_FILTERS,
  CLEAN_DETAIL,
  
} from "../redux/actions";

const initialState = {
  allRecipes: [],
  recipes: [],
  recipeDetail: {},
  allDiets: [],
  numPag: 1,
  searchedRecipes: [],
  stringSearched: "",
  filterDiet: "allDiets",
  filterOrigin: "All",
  orderAlph: "Default",
  orderHS: "M",
};

const reducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        allRecipes: payload,
      };

    case GET_BY_NAME: {
      return {
        ...state,
        recipes: payload,
        stringSearched: actions.stringSearch,
      };
    }

    case GET_BY_ID: {
      return {
        ...state,
        recipeDetail: payload,
      };
    }

    case GET_DIETS: {
      return {
        ...state,
        allDiets: payload,
      };
    }

    case POST_RECIPE: {
      return {
        ...state,
        allRecipes: [...state.allRecipes, payload],
        recipes: [...state.recipes, payload],
      };
    }

    case FILTER_DIET: {
      const allRec = state.allRecipes;
      const dietFilter = allRec.filter((rec) =>
        rec.dietsName.includes(payload)
      );
      return {
        ...state,
        recipes: payload === "allDiets" ? allRec : dietFilter,
        filterDiet: payload,
      };
    }

    case FILTER_CREATED: {
      const originRecipes = state.allRecipes;
      const fromApi = originRecipes.filter((recipe) => !isNaN(+recipe.id));
      const fromBDD = originRecipes.filter((recipe) => isNaN(+recipe.id));
      return {
        ...state,
        recipes:
          payload === "api"
            ? fromApi
            : payload === "db"
            ? fromBDD
            : originRecipes,
        filterOrigin: payload,
      };
    }

    case ORDER_NAME: {
      const order = [...state.recipes];
      return {
        ...state,
        recipes:
          payload === "A"
            ? order.sort((a, b) => a.name.localeCompare(b.name))
            : order.sort((a, b) => b.name.localeCompare(a.name)),
        orderAlph: payload,
      };
    }

    case ORDER_BY_HS: {
      const orderHS = [...state.recipes];
      const sortedRecipes = orderHS.sort((a, b) => {
        if (payload === "A") {
          return b.healthScore - a.healthScore;
        } else if (payload === "D") {
          return a.healthScore - b.healthScore;
        } else {
          return 0; // No cambia el orden si el payload no es "A" ni "D"
        }
      });
    
      return {
        ...state,
        recipes: sortedRecipes,
        orderHS: payload,
      };
    }
    

    case NEXT_PAGE: {
      return {
        ...state,
        numPag: state.numPag + 1,
      };
    }

    case PREV_PAGE: {
      return {
        ...state,
        numPag: state.numPag - 1,
      };
    }

    case HANDLE_PAGE: {
      return {
        ...state,
        numPag: payload,
      };
    }

    case RESET_RECIPES: {
      return {
        ...state,
        recipes: state.allRecipes,
      };
    }

    case RESET_FILTERS: {
      return {
        ...state,
        recipes: state.allRecipes,
        filterDiet: "allDiets",
        filterOrigin: "All",
        orderAlph: "Default",
        orderHS: "M",
        stringSearched: "",
      };
    }
    case CLEAN_DETAIL: {
      return {
        ...state,
        recipeDetail: {},
      };
    }

    default:
        return {
            ...state
        }
  }
}

export default reducer;
