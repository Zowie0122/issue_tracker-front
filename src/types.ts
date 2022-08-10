export type User = {
  id: string; // uuid
  first_name: string;
  last_name: string;
  email: string;
  company_id: number;
  role_id: number;
  department_id: number;
  created_at: Date;
  status: 0 | 1;
};

export type Department = {
  id: number;
  company_id: number;
  name: string;
};

export type Issue = {
  id: number;
  company_id: number;
  issuer_id: string;
  issuer_name: string;
  issuer_department_id: number;
  receiver_id: string;
  receiver_name: string;
  receiver_department_id: number;
  title: string;
  description: string;
  due_at: string;
  created_at: string;
  updated_at: string;
  status: 0 | 1;
  comments: Comment[];
};

export type Comment = {
  id: number;
  issue_id: number;
  contents: string;
  issuer: string; //uuid
  issuer_name: string;
  receiver: string; // uuid
  receiver_name: string;
  created_at: Date;
};

export type IssueListRow =
  | {
      id?: number;
      title?: string;
      from?: string;
      to?: string;
      deadline?: Date;
      detail?: {
        isAction: boolean;
        icon: "detail" | "add" | "edit";
        iconColor?: string;
        iconSize?: "small" | "medium" | "large";
        callback: (value: any) => void;
      };
    }
  | undefined;
