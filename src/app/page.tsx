import LoginForm from "@/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookiesList = await cookies();

  /* const token = cookiesList.get("token")?.value;

  if (token) {
    redirect("/dashboard");
  } */

  return <LoginForm />;
}
