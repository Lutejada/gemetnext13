import React from "react";

interface Props {
  link: string;
  name: string;
}

export const ForgotPasswordTemplate = ({ link, name }: Props) => {
  return (
    <div
      style={{ fontFamily: "sans-serif", color: "#2d3748", lineHeight: "1.6" }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ed8936" }}>
        Restablecimiento de Contraseña
      </h1>
      <p style={{ marginTop: "1rem" }}>
        Hola <b>{name}</b>,
      </p>
      <p style={{ marginTop: "0.5rem" }}>
        Hemos recibido una solicitud para restablecer tu contraseña. Si no
        realizaste esta solicitud, puedes ignorar este correo electrónico.
      </p>
      <p style={{ marginTop: "0.5rem" }}>
        Para restablecer tu contraseña, haz clic en el siguiente enlace:
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
        Restablecer Contraseña
      </a>
      <p style={{ marginTop: "1rem" }}>
        Este enlance tiene un tiempo de expiracion de 24 horas. Pasado el tiempo
        deberas solicitar un nuevo enlace.
      </p>
      <p style={{ marginTop: "1rem" }}>
        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
      </p>
      <p style={{ marginTop: "0.5rem" }}>¡Gracias!</p>
    </div>
  );
};
