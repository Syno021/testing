export type ForumMemberRole = "owner" | "moderator" | "member";
export interface ForumMember {
  id: number;
  forum_id: number;      // FK → Forum.id
  user_id: number;       // FK → User.id
  role: ForumMemberRole;
  joined_at: Date;
  created_at: Date;
  updated_at: Date;
}

