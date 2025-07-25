import db from "@/lib/db";

export default async function Home() {
  const user = await db.user.findFirst();
  return (
    <>
      <h1>{JSON.stringify(user)}</h1>
    </>
  );
}
