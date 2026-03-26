"use client";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(3, "Senha deve ter pelo menos 3 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const request = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // withCredentials: true, // axios style
        body: JSON.stringify(values),
      });

      console.log("Status:", request.status);
      console.log("Headers:", [...request.headers.entries()]);

      // 3. Ler o body
      const data = await request.json();
      console.log("Response body:", data);
      //return;
      if (!request.ok) {
        form.setError("email", { message: "Credenciais inválidas" });
        form.setError("password", { message: "Credenciais inválidas" });
        setIsSubmitting(false);
        return;
      }
      console.log("Login bem-sucedida");
      console.log("Token...:", data.accessToken);

      const requestUser = await fetch(`${API_URL}/api/auth/me`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
        credentials: "include",
      });
      const userData = await requestUser.json();
      console.log("User data:", userData.id);
      return router.replace(`/users/${userData.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('../bg-login2.jpg')" }}
    >
      <Navbar />

      <Card
        className="w-full max-w-md border-0 overflow-hidden 
        p-0 shadow-lg transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl"
      >
        <CardHeader className="p-0">
          <div className="bg-blue-950 text-white px-6 py-6 rounded-t-lg">
            <CardTitle className="text-2xl text-center">Fazer Login</CardTitle>
            <CardDescription className="text-center text-blue-100">
              Por favor, insira o email e senha para aceder à plataforma
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 pb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="seu@email.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-950 hover:bg-blue-900 text-white cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
