import type { NextApiRequest, NextApiResponse } from "next";

export type PolicyType = "life" | "health" | "auto" | "property";

export type Policy = {
  id: number;
  policyNumber: string;
  name: string;
  type: PolicyType;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "pending";
  premium: number;
  coverageAmount: number;
  policyHolder: {
    name: string;
    email: string;
    phone: string;
  };
};

const policies: Policy[] = [
  {
    id: 1,
    policyNumber: "POL-2025-001",
    name: "Comprehensive Life Insurance",
    type: "life",
    startDate: "2025-01-01",
    endDate: "2026-01-01",
    status: "active",
    premium: 250.0,
    coverageAmount: 500000.0,
    policyHolder: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+60123456789",
    },
  },
  {
    id: 2,
    policyNumber: "POL-2025-002",
    name: "Family Health Insurance",
    type: "health",
    startDate: "2025-01-15",
    endDate: "2026-01-15",
    status: "active",
    premium: 350.0,
    coverageAmount: 100000.0,
    policyHolder: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+60198765432",
    },
  },
  {
    id: 3,
    policyNumber: "POL-2025-003",
    name: "Vehicle Insurance",
    type: "auto",
    startDate: "2025-02-01",
    endDate: "2026-02-01",
    status: "pending",
    premium: 150.0,
    coverageAmount: 50000.0,
    policyHolder: {
      name: "Mike Wilson",
      email: "mike.w@example.com",
      phone: "+60187654321",
    },
  },
];

const generatePolicyNumber = () => {
  return (
    "POL-" +
    new Date().getFullYear() +
    "-" +
    String(Math.floor(1000 + Math.random() * 9000))
  );
};

const calculatePremium = (coverageAmount: number) => {
  const premium = (coverageAmount * 0.01) / 12;
  return premium;
};

const getPolicyName = (type: PolicyType) => {
  switch (type) {
    case "life":
      return "Comprehensive Life Insurance";
    case "health":
      return "Family Health Insurance";
    case "auto":
      return "Vehicle Insurance";
    case "property":
      return "Property Insurance";
  }
};

const generatePolicy = ({
  name,
  email,
  phone,
  type,
  coverageAmount,
  startDate,
}: {
  name: string;
  email: string;
  phone: string;
  type: PolicyType;
  coverageAmount: number;
  startDate: string;
}) => {
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1);

  const policy: Policy = {
    id: policies.length + 1,
    policyNumber: generatePolicyNumber(),
    name: getPolicyName(type),
    type,
    startDate,
    endDate: endDate.toISOString(),
    status: "active",
    premium: calculatePremium(coverageAmount),
    coverageAmount: coverageAmount,
    policyHolder: {
      name,
      email,
      phone,
    },
  };
  return policy;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({ message: "success", data: policies });
  } else if (req.method === "POST") {
    const policy: Pick<
      Policy,
      "policyHolder" | "type" | "coverageAmount" | "startDate"
    > = req.body;

    const generatedPolicy = generatePolicy({
      name: policy.policyHolder.name,
      email: policy.policyHolder.email,
      phone: policy.policyHolder.phone,
      type: policy.type,
      coverageAmount: policy.coverageAmount,
      startDate: policy.startDate,
    });

    policies.push(generatedPolicy);

    res.status(200).json({ message: "success", data: generatedPolicy });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
