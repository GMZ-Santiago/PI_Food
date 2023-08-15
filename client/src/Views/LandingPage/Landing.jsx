import React from "react";
import styles from "./Landing.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>Bienvenido a Chef's Delight</h1>
        <p>Descubre un mundo de sabores y crea tus propias obras maestras culinarias.</p>
        <a href="/recipes" className={styles.exploreButton}>
          Explorar Recetas
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
