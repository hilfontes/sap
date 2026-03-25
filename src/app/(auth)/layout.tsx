import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
	const cookiesList = await cookies()

	const hasToken = cookiesList.has('token_youtube')

	if (!hasToken) {
		return redirect('/')
	}

	const requestUser = await fetch('http://localhost:3000/profile', {
		headers: {
			cookie: cookiesList.toString(),
		},
		cache: 'no-store',
		credentials: 'include',
	})

	if (!requestUser.ok) {
		return redirect('/')
	}

	return <>{children}</>
}
