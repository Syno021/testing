export type ConnectionStatus = "pending" | "accepted" | "rejected" | "blocked";
export interface FarmerConnection {
    id: number;
    follower_id: number;    // the user who initiated the connection
    following_id: number;   // the user being followed
    status: ConnectionStatus;
    created_at: Date;
    updated_at: Date;
  }