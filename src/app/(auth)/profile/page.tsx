import UserCard from "@/components/UserCard";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();

  const requestUser = await fetch("http://localhost:3001/default/auth/users", {
    headers: {
      cookie: cookiesList.toString(),
    },
    cache: "no-store",
    credentials: "include",
  });

  const user = await requestUser.json();

  return <UserCard user={user} />;
}
