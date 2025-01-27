import MainLayout from "@/components/main-layout";
import Button from "@/components/ui/button";
import { fetchClaims } from "@/store/slices/claimSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ClaimStatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    processing: "bg-blue-100 text-blue-800",
  };

  const style =
    statusStyles[status as keyof typeof statusStyles] || statusStyles.pending;

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${style}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function Claims() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { claims, loading, error } = useAppSelector((state) => state.claims);
  const filteredClaims = useAppSelector((state) => state.claims.claims);

  useEffect(() => {
    dispatch(fetchClaims());
  }, [dispatch]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading claims...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => dispatch(fetchClaims())}>Try Again</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Insurance Claims</h1>
          <Button onClick={() => router.push("/claims/new")}>
            Submit New Claim
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 capitalize">
                      {claim.type.replace("_", " ")} Claim
                    </h3>
                    <p className="text-sm text-gray-600">
                      Policy #{claim.policyId}
                    </p>
                  </div>
                  <ClaimStatusBadge status={claim.status} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount Claimed</span>
                    <span className="font-medium text-gray-900">
                      ${claim.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Submission Date</span>
                    <span className="font-medium text-gray-900">
                      {new Date(claim.submissionDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 mb-2">Description</p>
                    <p className="text-sm text-gray-900 line-clamp-2">
                      {claim.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t">
                <Button
                  onClick={() => router.push(`/claims/${claim.id}`)}
                  className="w-full"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}

          {filteredClaims.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No claims found</p>
              <Button onClick={() => router.push("/claims/new")}>
                Submit Your First Claim
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
