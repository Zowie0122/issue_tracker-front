export type User = {
  id?: string; // uuid
  first_name?: string;
  last_name?: string;
  email?: string;
  company_id?: number;
  role_id?: number;
  department_id?: number;
  created_at?: Date;
  status?: 0 | 1;
};

export type Department = {
  id: number;
  company_id: number;
  name?: string;
} | null;

export type Issue = {
  id: number;
  title: string;
  description: string;
  issuer: string; //uuid
  receiver: string; // uuid
  due_at: Date;
  created_at: Date;
  updated_at: Date;
  status: 0 | 1;
  comments: Comment[];
} | null;

export type Comment = {
  id: number;
  issue_id: number;
  contents: string;
  issuer: string; //uuid
  receiver: string; // uuid
  created_at: Date;
} | null;
