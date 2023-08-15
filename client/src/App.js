import "./App.css";
import RecipeCards from "./Views/RecipeCards/RecipeCards";
import Landing from "./Views/LandingPage/Landing";
import CreateRecipe from "./Views/CreateRecipe/CreateRecipe"
import Detail from "./Views/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import About from "./components/About/About";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" component={Landing} />
      <Route exact path="/recipes/detail/:id" component={Detail} /> 
      <Route exact path="/create" component={CreateRecipe} />
      <Route path="/recipes" render={() => <RecipeCards />} />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
