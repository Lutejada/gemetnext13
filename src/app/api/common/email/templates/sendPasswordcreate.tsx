import React from "react";

interface Props {
  password: string;
}
export const SendPasswordcreate = ({ password }: Props) => {
  return (
    <div>
      <h1>Bienvenido a gmet</h1>
      <p>
        Tu clave de acceso es:<strong>{password}</strong>
      </p>
    </div>
  );
};
