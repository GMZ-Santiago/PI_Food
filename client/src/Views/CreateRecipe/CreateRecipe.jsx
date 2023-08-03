import React, { useState } from "react";

const CreateRecipe = () => {
  const [form, setForm] = useState({
    nombre: "",
    resumen: "",
    indiceSalud: "",
    pasos: "",
    imagen: "",
    dietas: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    resumen: "",
    indiceSalud: "",
    pasos: "",
    imagen: "",
    dietas: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value });

    setForm({ ...form, [property]: value });
  };

  const validate = (form) => {
    const nombreRegExp = /^[a-zA-Z\s'-]{3,15}$/;
    if (nombreRegExp.test(form.nombre)) {
        setErrors({ ...errors, nombre: "" });
    } else {
        setErrors({ ...errors, nombre: "Hay un error en el nombre" });
    }
    if (form.nombre === "") {
        setErrors({ ...errors, nombre: "Nombre vacío" });
    }
    if (form.nombre.length > 15) {
        setErrors({ ...errors, nombre: "Nombre demasiado largo" });
    }
};


  return (
    <form>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          value={form.nombre}
          onChange={changeHandler}
          name="nombre"
        />
        {errors.nombre && <span>{errors.nombre}</span>}
      </div>

      <div>
        <label>Resumen: </label>
        <input
          type="text"
          value={form.resumen}
          onChange={changeHandler}
          name="resumen"
        />
      </div>

      <div>
        <label>Indice de salubilidad: </label>
        <input
          type="text"
          value={form.indiceSalud}
          onChange={changeHandler}
          name="indiceSalud"
        />
      </div>

      <div>
        <label>Pasos a seguir: </label>
        <input
          type="text"
          value={form.pasos}
          onChange={changeHandler}
          name="pasos"
        />
      </div>

      <div>
        <label>Imagen ilustrativa: </label>
        <input
          type="text"
          value={form.imagen}
          onChange={changeHandler}
          name="imagen"
        />
      </div>

      <div>
        <label>Dieta: </label>
        <input
          type="text"
          value={form.dietas}
          onChange={changeHandler}
          name="dietas"
        />
      </div>
    </form>
  );
};

export default CreateRecipe;

// name summary healthScore steps text image diets
