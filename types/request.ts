export interface Request {
  id: number;
  requester_id: number;
  fabric_type: string;
  quantity_needed: string;
  purpose: string;
  status: "open" | "closed";
}
