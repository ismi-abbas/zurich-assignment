import { NextApiRequest, NextApiResponse } from "next";
import { claims } from ".";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { claimId } = req.query;
    const claim = claims.find((c) => c.id === claimId);

    return res.status(200).json({ message: "Success", data: claim });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
