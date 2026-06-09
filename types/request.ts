export type RequestStatus = "open" | "matched" | "fulfilled" | "closed";

export interface Request {
  id: number;
  requester_id: number;
  fabric_type: string;
  quantity_needed: string;
  purpose: string;
  status: RequestStatus;
}
