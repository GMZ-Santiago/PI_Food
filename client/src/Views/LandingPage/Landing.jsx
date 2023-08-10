import React from "react";
import style from "./Landing.module.css";

const LandingPage = () => {
  return (
    <div className={style.landingContainer}>
      <div className={style.overlay}></div>
      <div className={style.content}>
        <h1>Bienvenido a Chef's Delight</h1>
        <p>Descubre un mundo de sabores y crea tus propias obras maestras culinarias.</p>
        <a href="/recipes" className={style.exploreButton}>
          Explorar Recetas
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
