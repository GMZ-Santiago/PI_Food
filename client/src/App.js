import "./App.css";
import RecipeCards from "./Views/RecipeCards/RecipeCards";
import Landing from "./Views/LandingPage/Landing";
import CreateRecipe from "./Views/CreateRecipe/CreateRecipe"
import Detail from "./Views/Detail/Detail";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const shouldRenderSearchBar = !["/create", "/"].includes(location.pathname);

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      {shouldRenderSearchBar && <SearchBar />} {/* Condiciona la renderización */}
      <Route exact path="/" component={Landing} />
      <Route exact path="/detail" component={Detail} />
      <Route exact path="/create" component={CreateRecipe} />
      <Route path="/recipes" render={() => <RecipeCards />} />
    </div>
  );
}

export default App;
