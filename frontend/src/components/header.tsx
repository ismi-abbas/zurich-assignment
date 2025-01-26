import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 hover:text-blue-700"
            >
              Zurich
            </Link>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/policies"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Policies
              </Link>
              <Link
                href="/claims"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Claims
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
