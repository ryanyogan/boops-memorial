import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { LoginForm } from "@/components/login-form"

export default async function LoginPage() {
  const session = await auth()

  // Redirect to homepage if already logged in
  if (session) {
    redirect("/")
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

