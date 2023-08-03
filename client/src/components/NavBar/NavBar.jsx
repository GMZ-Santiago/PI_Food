import { Link } from "react-router-dom"
import style from "./NavBar.module.css"

const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <Link to="/recipes">RECETAS </Link>
            <Link to="/create"> CREAR RECETA</Link>
        </div>
    )
}

export default NavBar