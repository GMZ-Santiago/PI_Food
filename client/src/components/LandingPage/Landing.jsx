import style from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className={style.container}>
            <div className={style.midContainer}>
                <div className={style.box}>
                    <h1 className={style.title}>FOOD</h1>
                    <h2 className={style.subtitle}>Proyecto Individual Food 2023</h2>
                    <Link to={"/recipes"}>
                        <button className={style.btn}>Comenzar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing