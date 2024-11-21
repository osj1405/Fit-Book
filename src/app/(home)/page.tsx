import { signOut, auth } from "@/auth";

export default async function Home() {
  const session  = await auth();

  console.log('Session:', );
  if(!session?.user) return null
  return (
    <div>
      <h1>Fit Book</h1>
      <h1>{session.user.email}</h1>
      <form
        action={async () => {
          "use server"
          await signOut({redirectTo: `/login`})
        }}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
