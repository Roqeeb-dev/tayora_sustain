export interface Donation {
  id: number;
  donor_id: number;
  fabric_type: string;
  quantity: string;
  description: string;
  image_url: string;
  status: "pending" | "approved";
  location: string;
}
