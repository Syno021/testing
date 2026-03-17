export type ForumCategory =
  | "pest_control"
  | "weather"
  | "soil_health"
  | "crop_management"
  | "market_prices"
  | "equipment"
  | "general";
export interface Forum {
    id: number;
    title: string;
    description?: string;
    category: ForumCategory;
    region_tag?: string;   // e.g. "KwaZulu-Natal", "Western Cape"
    crop_tag?: string;     // e.g. "maize", "sugarcane"
    created_by: number;      // FK → Users.id
    is_archived: boolean;
    post_count: number;    // denormalized for quick display
    created_at: Date;
    updated_at: Date;
  }