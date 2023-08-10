import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const getAllRecipes = () => {
    return async function (dispatch) {
        const {data} = await axios.get("http://localhost:3001/recipes")
        return dispatch({type: GET_RECIPES, payload: data})
    }
}

export const GET_BY_NAME = "GET_BY_NAME";
export const getRecipeByName = (name) => {
    return async function (dispatch) {
        const {data} = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        return dispatch({type: GET_BY_NAME, payload: data, stringSearch: name})
    }
}

export const GET_BY_ID = "GET_BY_ID";
export const getRecipeById = (id) => {
    return async function (dispatch) {
        const {data} = await axios.get(`http://localhost:3001/recipes/${id}`)
        return dispatch({type: GET_BY_ID, payload: data})
    }
}

export const GET_DIETS = "GET_DIETS";
export const getTypeDiets = () => {
    return async function (dispatch) {
        const {data} = await axios.get("http://localhost:3001/diets")
        return dispatch({type: GET_DIETS, payload: data})
    }
}

export const POST_RECIPE = "POST_RECIPE";
export const postRecipes = (newRecipe) => {
    return async function (dispatch) {
        try {
            const {data} = await axios.post("http://localhost:3001/recipes/createrecipe", newRecipe)
            window.alert("Receta creada exitosamente!")
            return dispatch({type: POST_RECIPE, payload: data})
        } catch (error) {
            window.alert(`Ha ocurrido un error al crear la receta, ${error}`)
        }
    }
}

export const FILTER_DIET = "FILTER_DIET";
export const filterByDiet = (diet) => {
    return {type: FILTER_DIET, payload: diet}
}

export const FILTER_CREATED = "FILTER_CREATED";
export const filterByOrigin = (origin) => {
    return {type: FILTER_CREATED, payload: origin}
}

export const ORDER_NAME = "ORDER_NAME";
export const orderByName = (order) => {
    return {type: ORDER_NAME, payload: order}
}

export const ORDER_BY_HS = "ORDER_BY_HS";
export const orderByHs = (order) => {
    return {type: ORDER_BY_HS, payload: order}
}

export const NEXT_PAGE = "NEXT_PAGE";
export const nextPag = () => {
    return {type: NEXT_PAGE}
}

export const PREV_PAGE = "PREV_PAGE";
export const prevPag = () => {
    return {type: PREV_PAGE}
}

export const HANDLE_PAGE = "HANDLE_PAGE";
export const handlePage = (num) => {
    return {type: HANDLE_PAGE, payload: num}
}

export const RESET_RECIPES = "RESET_RECIPES";
export const resetRecipes = () => {
    return {type: RESET_RECIPES}
}

export const RESET_FILTERS = "RESET_FILTERS"
export const resetFilters = () => {
    return {type: RESET_FILTERS}
}

export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const cleanDetail = () => {
    return {type: CLEAN_DETAIL}
}
