import { PrismaClient } from "$/generated/prisma";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// El objeto globalThis tiene todas las propiedades normales de Node.js, PERO ADEMAS tiene una propiedad extra llamada prismaGlobal que contiene una instancia del cliente de Prisma.
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Oye, ¿ya tenemos una conexion a la base de datos guardada? Si sí, úsala. Si no, crea una nueva.
// ?? ( Operador Nullish Coalescing) si lo de la izquierda es null o undefined, entonces usa lo de la derecha.
const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
