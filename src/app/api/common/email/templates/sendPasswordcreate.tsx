import React from "react";

interface Props {
  link: string;
  name: string;
}

export const SendPasswordcreate = ({ link, name }: Props) => {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#2d3748" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ed8936" }}>
        Bienvenido a GMet
      </h1>
      <p style={{ marginTop: "1rem" }}>
        Hola <b>{name}</b>,
      </p>
      <p style={{ marginTop: "0.5rem" }}>
        Nos complace darte la bienvenida a nuestra plataforma de gestión
        metrológica. Por favor, haz clic en el siguiente enlace para validar tu
        cuenta y completar el proceso de registro.
      </p>
      <a
        href={link}
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1.125rem",
          color: "#fff",
          backgroundColor: "#ed8936",
          borderRadius: "0.375rem",
          textDecoration: "none",
        }}
      >
        Validar Nuevo Usuario
      </a>
      <p style={{ marginTop: "1rem" }}>
        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
      </p>
      <p style={{ marginTop: "0.5rem" }}>¡Gracias por unirte a nosotros!</p>
    </div>
  );
};
