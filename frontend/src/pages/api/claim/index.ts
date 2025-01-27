import { NextApiRequest, NextApiResponse } from "next";

export interface Claim {
  id: string;
  policyId: string;
  type: string;
  status: string;
  submissionDate: string;
  amount: number;
  description: string;
  documentName: string;
}

export const claims: Claim[] = [
  {
    id: "1",
    policyId: "1",
    type: "accident",
    status: "pending",
    submissionDate: "2022-01-01",
    amount: 1000,
    description: "Accident claim",
    documentName: "",
  },
  {
    id: "2",
    policyId: "1",
    type: "accident",
    status: "pending",
    submissionDate: "2022-01-01",
    amount: 1000,
    description: "Accident claim",
    documentName: "",
  },
  {
    id: "3",
    policyId: "1",
    type: "accident",
    status: "pending",
    submissionDate: "2022-01-01",
    amount: 1000,
    description: "Accident claim",
    documentName: "",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Success", data: claims });
  } else if (req.method === "POST") {
    const newClaim: Claim = req.body;
    claims.push(newClaim);

    return res.status(200).json({ message: "Success", data: claims });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
