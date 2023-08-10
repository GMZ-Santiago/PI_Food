import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, name, image, dietsName }) => {
 
  return (
    <div className={styles.container}>
      <Link className={styles.url} to={`/recipes/detail/${id}`}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={image} alt={name} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.diets}>
            {Array.isArray(dietsName) &&
              dietsName.map((diet, index) => (
                <div key={index} className={styles.diet}>
             {diet}
                </div>
              ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
