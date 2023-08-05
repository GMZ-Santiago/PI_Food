import React from "react";
import style from "./Landing.module.css";

const LandingPage = () => {
  return (
    <div className={style.landingContainer}>
      <h1>Bienvenido a mi Landing Page</h1>
      <p>Descubre deliciosas recetas y comparte las tuyas.</p>
      <a href="/recipes" className={style.exploreButton}>
        Explorar Recetas
      </a>
    </div>
  );
};

export default LandingPage;
