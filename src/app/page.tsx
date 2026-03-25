import LoginForm from "@/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookiesList = await cookies();

  //const requestUser = await fetch("http://localhost:3000/profile", {
  // headers: {
  //    cookie: cookiesList.toString(),
  // },
  //  cache: "no-store",
  //   credentials: "include",
  // });

  // if (requestUser.ok) {
  //    return redirect("/profile");
  // }

  return <LoginForm />;
}
