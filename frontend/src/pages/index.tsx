import Image from "next/image";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import MainLayout from "@/components/main-layout";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ReqresRespnose {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

const filterUser = (users: User[]) =>
  users.filter(
    (user) =>
      user.first_name.charAt(0).toLowerCase() === "g" ||
      user.last_name.charAt(0).toLowerCase() === "w"
  );

export const getServerSideProps = (async () => {
  let currentPage = 1;
  let totalPages = 1;

  let allData: User[] = [];

  while (currentPage <= totalPages) {
    const res = await fetch(`https://reqres.in/api/users?page=${currentPage}`);
    const data: ReqresRespnose = await res.json();

    const filteredData = filterUser(data.data);

    allData = [...allData, ...filteredData];
    currentPage++;
    totalPages = data.total_pages;
  }

  return {
    props: {
      users: allData,
    },
  };
}) satisfies GetServerSideProps<{ users: User[] }>;

export default function Home({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [redactedUser, setRedactedUser] = useState<User | null>(null);

  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-4">
        {users?.map((user) => (
          <div
            aria-label="user-card"
            key={user.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg"
          >
            <div className="relative aspect-square">
              <Image
                src={user.avatar}
                alt={user.first_name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4 min-w-[200px]">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-gray-600 text-sm flex">
                <span className="inline-block">
                  <svg
                    className="w-4 h-4 inline-block mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <button
                  className="text-gray-600 text-sm transition-all duration-200 w-[200px] text-left"
                  onClick={() => {
                    setRedactedUser(user);
                    if (redactedUser?.email === user.email) {
                      setRedactedUser(null);
                    }
                  }}
                >
                  <span className="inline-block w-full truncate">
                    {redactedUser?.email === user.email
                      ? user.email
                      : "*".repeat(user.email.length)}
                  </span>
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
