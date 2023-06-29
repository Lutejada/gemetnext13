import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.usuario.createMany({
    data: [
      {
        correo: "andres@correo.com",
        nombre: "andres",
        password: "12345",
        apellido: "tejada",
        rol: "Admin",
        usuario: "admin",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
