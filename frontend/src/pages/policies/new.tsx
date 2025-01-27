import MainLayout from "@/components/main-layout";
import { useForm } from "@tanstack/react-form";
import React from "react";
import { Policy, PolicyType } from "../api/policy";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";

type NewPolicyForm = {
  policyType: PolicyType;
  holderName: string;
  holderEmail: string;
  holderPhone: string;
  coverageAmount: string;
  startDate: string;
};

const policyTypes: { name: string; value: PolicyType }[] = [
  {
    name: "Comprehensive Life Insurance",
    value: "life",
  },
  {
    name: "Family Health Insurance",
    value: "health",
  },
  {
    name: "Vehicle Insurance",
    value: "auto",
  },
  {
    name: "Property Insurance",
    value: "property",
  },
];

export default function NewPolicy() {
  const router = useRouter();
  const form = useForm<NewPolicyForm>({
    defaultValues: {
      policyType: policyTypes[0].value,
      holderName: "",
      holderEmail: "",
      holderPhone: "",
      coverageAmount: "",
      startDate: "",
    },
    onSubmit: async ({ value }) => {
      const policy: Pick<
        Policy,
        "policyHolder" | "type" | "coverageAmount" | "startDate"
      > = {
        type: value.policyType,
        startDate: "2025-01-01",
        coverageAmount: Number(value.coverageAmount),
        policyHolder: {
          name: value.holderName,
          email: value.holderEmail,
          phone: value.holderPhone,
        },
      };
      const response = await fetch("http://localhost:3000/api/policy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(policy),
      });

      if (!response.ok) {
        alert("Failed to purchase policy");
      }

      setTimeout(() => {
        router.push("/policies");
      }, 1500);
    },
  });

  return (
    <MainLayout className="justify-center items-center w-full max-w-4xl">
      <div className="bg-white p-10 w-full rounded-lg border">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Purchase New Insurance Policy
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
                htmlFor="policyType"
                className="text-sm font-medium text-gray-700"
              >
                Policy Type
              </label>
              <form.Field
                name="policyType"
                children={(field) => (
                  <select
                    id="policyType"
                    className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value as PolicyType)
                    }
                  >
                    {policyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Policy Holder Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Policy Holder Information
              </h2>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="holderName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <form.Field
                  name="holderName"
                  children={(field) => (
                    <input
                      id="holderName"
                      type="text"
                      className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="John Smith"
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="holderEmail"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <form.Field
                  name="holderEmail"
                  children={(field) => (
                    <input
                      id="holderEmail"
                      type="email"
                      className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="john.smith@example.com"
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="holderPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <form.Field
                  name="holderPhone"
                  children={(field) => (
                    <input
                      id="holderPhone"
                      type="tel"
                      className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="+60 12-345-6789"
                    />
                  )}
                />
              </div>
            </div>

            {/* Policy Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Policy Details
              </h2>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="coverageAmount"
                  className="text-sm font-medium text-gray-700"
                >
                  Coverage Amount ($)
                </label>
                <form.Field
                  name="coverageAmount"
                  children={(field) => (
                    <input
                      id="coverageAmount"
                      type="number"
                      min="0"
                      step="1000"
                      className="rounded-md p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="50000"
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <form.Field
                  name="startDate"
                  children={(field) => (
                    <input
                      id="startDate"
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
            </div>

            <div className="pt-6">
              <Button type="submit" className="">
                Purchase Policy
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
