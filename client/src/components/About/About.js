import React from "react";
import style from "./About.module.css"; // Importa tu archivo de estilos para About si lo tienes

const About = () => {
  return (
    <div className={style.aboutContainer}>
      <h1 className={style.title}>Acerca de mí</h1>
      <div className={style.contentContainer}>
        <div className={style.description}>
          <p>
            Soy un apasionado profesional joven con una sólida capacidad organizativa y un enfoque colaborativo excepcional. Mi versatilidad y orientación hacia los objetivos me impulsan a buscar oportunidades en organizaciones vanguardistas, donde pueda contribuir con soluciones innovadoras y estratégicas.
          </p>
          <p>
            Mi naturaleza comunicativa y empática, combinada con una habilidad innata para el aprendizaje rápido, me ha permitido sobresalir en roles anteriores, donde he demostrado ser un recurso valioso en la resolución de desafíos complejos y en la creación de relaciones sólidas con colegas y clientes.
          </p>
        </div>
        <div className={style.linksContainer}>
          <a
            href="https://github.com/GMZ-Santiago"
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
          >
            <img
              src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png"
              alt="GitHub"
              className={style.logo}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/santiago-gomez-tartaglino-766a19268/"
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
          >
            <img
              src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Linkedin.png"
              alt="LinkedIn"
              className={style.logo}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
