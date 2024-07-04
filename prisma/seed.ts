
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const cliente = await prisma.cliente.create({
    data: {
      nombre: "micliente",
    },
  });
  // await crearUsuario({
  //   clienteId: cliente.id,
  //   apellido: "luis",
  //   cargo: "admin",
  //   correo: "luis@micliente.com",
  //   nombre: "luis",
  //   password: "luis1234",
  //   usuario: "luistejada10$",
  //   rol: Role.Admin,
  // });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
