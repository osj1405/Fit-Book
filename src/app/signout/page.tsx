import { signOut } from "@/auth"
 
export default function SignOutPage() {
  return (
    <div>
      <h5>Are you sure you want to sign out?</h5>
      <form
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        action={async (formData) => {
          "use server"
          await signOut({redirect: true, redirectTo: '/'})
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}