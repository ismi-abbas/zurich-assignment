import MainLayout from "@/components/main-layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { Policy } from "../api/policy";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";

export const getServerSideProps = (async () => {
  const data = await fetch("http://localhost:3000/api/policy");
  const response = (await data.json()) as { message: string; data: Policy[] };

  if (!response) {
    return { props: { policies: [] } };
  }

  return { props: { policies: response.data } };
}) satisfies GetServerSideProps<{ policies: Policy[] }>;

const PolicyStatusBadge = ({ status }: { status: Policy["status"] }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800",
    expired: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function Policies({
  policies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <MainLayout>
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Insurance Policies
          </h1>
          <Button onClick={() => router.push("/policies/new")}>
            Buy New Policy
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {policy.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {policy.policyNumber}
                    </p>
                  </div>
                  <PolicyStatusBadge status={policy.status} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {policy.type}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Premium</span>
                    <span className="font-medium text-gray-900">
                      ${policy.premium.toFixed(2)}/month
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Coverage</span>
                    <span className="font-medium text-gray-900">
                      ${policy.coverageAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="text-sm">
                      <p className="text-gray-600 mb-1">Policy Holder</p>
                      <p className="font-medium text-gray-900">
                        {policy.policyHolder.name}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {policy.policyHolder.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Valid Period</span>
                  <span className="text-gray-900">
                    {new Date(policy.startDate).toLocaleDateString()} -{" "}
                    {new Date(policy.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
