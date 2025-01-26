import { useForm } from "@tanstack/react-form";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (e) => {
      const response = await signIn("credentials", {
        email: e.value.email,
        password: e.value.password,
      });

      if (!response?.error) {
        router.push("/");
      }
    },
  });

  if (session) {
    return router.push("/");
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col bg-gray-50 font-sans">
      <div className="bg-white p-10 rounded-lg border w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

        <div className="w-full">
          <form
            action=""
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <form.Field
                name="email"
                children={(field) => (
                  <input
                    id="email"
                    type="email"
                    className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <form.Field
                name="password"
                children={(field) => (
                  <input
                    id="password"
                    type="password"
                    className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-6"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => signIn("google")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-6"
            >
              Sign In With Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
