import MainLayout from "@/components/main-layout";
import { useForm } from "@tanstack/react-form";
import React from "react";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";

type ClaimType = "accident" | "medical" | "property_damage" | "death" | "theft";

type ClaimForm = {
  policyId: string;
  type: ClaimType;
  amount: string;
  description: string;
  incidentDate: string;
  documents: string;
};

const claimTypes: { label: string; value: ClaimType }[] = [
  { label: "Accident", value: "accident" },
  { label: "Medical", value: "medical" },
  { label: "Property Damage", value: "property_damage" },
  { label: "Death", value: "death" },
  { label: "Theft", value: "theft" },
];

export default function Claims() {
  const router = useRouter();
  const form = useForm<ClaimForm>({
    defaultValues: {
      policyId: "",
      type: "accident",
      amount: "",
      description: "",
      incidentDate: "",
      documents: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch("/api/claim", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Math.random().toString(36).substr(2, 9),
            policyId: value.policyId,
            type: value.type,
            status: "pending",
            submissionDate: new Date().toISOString(),
            amount: Number(value.amount),
            description: value.description,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit claim");
        }

        alert("Claim submitted successfully!");
        router.push("/dashboard");
      } catch {
        alert("Failed to submit claim. Please try again.");
      }
    },
  });

  return (
    <MainLayout className="justify-center items-center w-full max-w-4xl">
      <div className="bg-white p-10 w-full rounded-lg border">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Submit Insurance Claim
        </h1>

        <div className="w-full">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="policyId"
                className="text-sm font-medium text-gray-700"
              >
                Policy Number
              </label>
              <form.Field
                name="policyId"
                children={(field) => (
                  <input
                    id="policyId"
                    type="text"
                    className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="POL-2025-XXXX"
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="type"
                className="text-sm font-medium text-gray-700"
              >
                Claim Type
              </label>
              <form.Field
                name="type"
                children={(field) => (
                  <select
                    id="type"
                    className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value as ClaimType)
                    }
                  >
                    {claimTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Claim Details
              </h2>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-medium text-gray-700"
                >
                  Claim Amount ($)
                </label>
                <form.Field
                  name="amount"
                  children={(field) => (
                    <input
                      id="amount"
                      type="number"
                      min="0"
                      step="100"
                      className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="1000"
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="incidentDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Date of Incident
                </label>
                <form.Field
                  name="incidentDate"
                  children={(field) => (
                    <input
                      id="incidentDate"
                      type="date"
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
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description of Incident
                </label>
                <form.Field
                  name="description"
                  children={(field) => (
                    <textarea
                      id="description"
                      rows={4}
                      className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Please provide details about the incident..."
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="documents"
                  className="text-sm font-medium text-gray-700"
                >
                  Supporting Documents
                </label>
                <form.Field
                  name="documents"
                  children={(field) => (
                    <input
                      id="documents"
                      type="file"
                      multiple
                      className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                />
                <p className="text-sm text-gray-500">
                  Upload relevant documents (receipts, photos, reports)
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Button type="submit">Submit Claim</Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
