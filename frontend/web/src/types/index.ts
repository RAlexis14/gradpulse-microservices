export type Role = "STUDENT" | "ADMIN";

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { access_token: string; token_type: string };

export type CommunityProgram = {
  id?: string | number;
  program_id?: string | number;
  title?: string;
  name?: string;
  description?: string;
};

export type InternshipOffer = {
  id?: string | number;
  offer_id?: string | number;
  company?: string;
  role?: string;
  title?: string;
  description?: string;
};

export type EnglishCourse = {
  id?: string | number;
  course_id?: string | number;
  course_name?: string;
  name?: string;
  level?: string;
  schedule?: string;
  provider?: string;
};
