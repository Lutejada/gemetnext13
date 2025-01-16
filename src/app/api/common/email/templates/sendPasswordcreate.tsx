import React from "react";

interface Props {
  link: string;
  name: string;
}

export const SendPasswordcreate = ({ link, name }: Props) => {
  return (
    <div className="font-sans text-gray-800">
      <h1 className="text-2xl font-bold text-green-600">Bienvenido a GMet</h1>
      <p className="mt-4">
        Hola <b>{name}</b>,
      </p>
      <p className="mt-2">
        Nos complace darte la bienvenida a nuestra plataforma de gestión
        metrológica. Por favor, haz clic en el siguiente enlace para validar tu
        cuenta y completar el proceso de registro.
      </p>
      <a
        href={link}
        className="inline-block mt-4 px-6 py-2 text-lg text-white bg-orange-600 rounded hover:bg-orange-700"
      >
        Validar Nuevo Usuario
      </a>
      <p className="mt-4">
        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
      </p>
      <p className="mt-2">¡Gracias por unirte a nosotros!</p>
    </div>
  );
};
