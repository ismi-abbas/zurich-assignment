import MainLayout from "@/components/main-layout";
import Button from "@/components/ui/button";
import {
  clearSelectedClaim,
  deleteClaim,
  fetchClaimById,
  updateClaim,
} from "@/store/slices/claimSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${style}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function ClaimDetails() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const { claims, loading, error } = useAppSelector((state) => state.claims);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id && typeof id === "string") {
      dispatch(fetchClaimById(id));
    }
    return () => {
      dispatch(clearSelectedClaim());
    };
  }, [dispatch, id]);

  const claim = claims.find((claim) => claim.id === id);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!claim) return;

    try {
      await dispatch(
        updateClaim({
          id: claim.id,
          claim: { status: newStatus },
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClaim = async () => {
    if (!claim) return;

    try {
      await dispatch(deleteClaim(claim.id)).unwrap();
      router.push("/claims");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading claim details...</p>
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
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!claim) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Claim not found</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Claims
          </button>

          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Claim Details</h1>
            <ClaimStatusBadge status={claim.status} />
          </div>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Claim Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Claim Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Claim ID</p>
                  <p className="text-gray-900 font-medium">{claim.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Policy Number</p>
                  <p className="text-gray-900 font-medium">#{claim.policyId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Claim Type</p>
                  <p className="text-gray-900 font-medium capitalize">
                    {claim.type.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount Claimed</p>
                  <p className="text-gray-900 font-medium">
                    ${claim.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(claim.submissionDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(claim.submissionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {claim.description}
              </p>
            </div>

            {/* Supporting Documents */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Supporting Documents
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-500">No documents uploaded</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex justify-end gap-4">
              {claim.status === "pending" && (
                <>
                  <Button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-white !text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    Cancel Claim
                  </Button>
                  <Button
                    onClick={() => {
                      router.push(`/claims/${claim.id}/edit`);
                    }}
                  >
                    Edit Claim
                  </Button>
                </>
              )}
              {claim.status === "processing" && (
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleUpdateStatus("approved")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve Claim
                  </Button>
                  <Button
                    onClick={() => handleUpdateStatus("rejected")}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Reject Claim
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Cancel Claim
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this claim? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-white !text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Keep Claim
              </Button>
              <Button
                onClick={handleDeleteClaim}
                className="bg-red-600 hover:bg-red-700"
              >
                Cancel Claim
              </Button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
