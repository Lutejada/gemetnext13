import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.usuario.createMany({
    data: [
      { correo: "andres@correo.com", nombre: "andres", password: "12345" },
      { correo: "luis@correo.com", nombre: "luis", password: "12345" },
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
