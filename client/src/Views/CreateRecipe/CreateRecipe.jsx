import React, { useState } from "react";
import styles from "./CreateRecipe.module.css"

const CreateRecipe = () => {
  const [form, setForm] = useState({
    nombre: "",
    resumen: "",
    indiceSalud: "",
    pasos: "",
    imagen: null,
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
    const { name, value, files } = event.target;

    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }

    validate({ ...form, [name]: value });
  };

  const validate = (formData) => {
    const nombreRegExp = /^[a-zA-Z\s'-]{3,15}$/;
    const resumenRegExp = /^.{1,50}$/;
    const numericRegExp = /^[0-9]*$/;
    const indiceSaludRegExp = /^(10|[1-9])$/;
    const pasosASeguirRegExp = /^.{1,50}$/;
    const imageFileRegExp = /\.(jpg|jpeg|png|gif)$/i;
    const dietTagsRegExp = /^[\w\s-]*$/;

    const errorMessages = {
      nombre: {
        required: "El campo no puede estar vacío",
        invalid: "Hay un error en el nombre",
        maxLength: "Nombre demasiado largo",
      },
      resumen: {
        required: "El campo no puede estar vacío",
        invalid: "Hay un error en el resumen",
        maxLength: "El resumen es muy extenso",
      },
      indiceSalud: {
        required: "Complete el campo por favor",
        invalid: "El índice saludable debe contener solo caracteres numéricos",
        outOfRange: "El índice debe estar entre 1 y 10",
      },
      pasos: {
        required: "El campo no puede estar vacío",
        invalid: "Hay un error en los pasos a seguir",
        maxLength: "El contenido debe ser breve",
      },
      imagen: {
        required: "Debe seleccionar una imagen",
        invalidFormat: "Formato de imagen no válido (jpg, jpeg, png o gif)",
      },
      dietas: {
        invalid: "Etiquetas dietéticas inválidas",
      },
    };

    const newErrors = {};

    if (!nombreRegExp.test(formData.nombre)) {
      newErrors.nombre = errorMessages.nombre.invalid;
    } else if (formData.nombre === "") {
      newErrors.nombre = errorMessages.nombre.required;
    } else if (formData.nombre.length > 15) {
      newErrors.nombre = errorMessages.nombre.maxLength;
    }

    if (!resumenRegExp.test(formData.resumen)) {
      newErrors.resumen = errorMessages.resumen.invalid;
    } else if (formData.resumen === "") {
      newErrors.resumen = errorMessages.resumen.required;
    } else if (formData.resumen.length > 50) {
      newErrors.resumen = errorMessages.resumen.maxLength;
    }

    if (!numericRegExp.test(formData.indiceSalud)) {
      newErrors.indiceSalud = errorMessages.indiceSalud.invalid;
    } else if (!indiceSaludRegExp.test(formData.indiceSalud)) {
      newErrors.indiceSalud = errorMessages.indiceSalud.required;
    } else if (formData.indiceSalud < 1 || formData.indiceSalud > 10) {
      newErrors.indiceSalud = errorMessages.indiceSalud.outOfRange;
    }

    if (!pasosASeguirRegExp.test(formData.pasos)) {
      newErrors.pasos = errorMessages.pasos.invalid;
    } else if (formData.pasos === "") {
      newErrors.pasos = errorMessages.pasos.required;
    } else if (formData.pasos.length > 50) {
      newErrors.pasos = errorMessages.pasos.maxLength;
    }

    if (!formData.imagen) {
      newErrors.imagen = errorMessages.imagen.required;
    } else if (!imageFileRegExp.test(formData.imagen.name)) {
      newErrors.imagen = errorMessages.imagen.invalidFormat;
    }

    if (!dietTagsRegExp.test(formData.dietas)) {
      newErrors.dietas = errorMessages.dietas.invalid;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validate(form);
    // Si no hay errores, puedes continuar con el envío del formulario
    // ...
  };


  return (
    <form onSubmit={handleSubmit} className={styles.recipeForm}>
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
        {errors.resumen && <span>{errors.resumen}</span>}
      </div>

      <div>
        <label>Indice de salubilidad: </label>
        <input
          type="text"
          value={form.indiceSalud}
          onChange={changeHandler}
          name="indiceSalud"
        />
        {errors.indiceSalud && <span>{errors.indiceSalud}</span>}
      </div>

      <div>
        <label>Pasos a seguir: </label>
        <input
          type="text"
          value={form.pasos}
          onChange={changeHandler}
          name="pasos"
        />
        {errors.pasos && <span>{errors.pasos}</span>}
      </div>

      <div>
        <label>Imagen: </label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={changeHandler}
          name="imagen"
        />
        {errors.imagen && <span>{errors.imagen}</span>}
      </div>

      <div>
        <label>Etiquetas dietéticas: </label>
        <input
          type="text"
          value={form.dietas}
          onChange={changeHandler}
          name="dietas"
        />
        {errors.dietas && <span>{errors.dietas}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default CreateRecipe;


