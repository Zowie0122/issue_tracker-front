import { SxProps } from '@mui/system';
import { groupUsersByDepartment } from './utils/users';
import { SubmitHandler } from 'react-hook-form';

export type UserT = {
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

export type DepartmentT = {
  id: number;
  company_id?: number;
  name: string;
};

export type IssueT = {
  id?: number;
  companyId?: number;
  issuerId?: string;
  issuerName?: string;
  issuerDepartmentId?: number;
  receiverId?: string;
  receiverName?: string;
  receiverDepartmentId?: number;
  title?: string;
  description?: string;
  dueAt?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: 0 | 1;
  comments?: Comment[];
};

export type CommentT = {
  id: number;
  contents: string;
  issuerName: string;
  receiverName: string;
  createdAt: Date;
};

export type IssueListRowT =
  | {
      id?: number;
      title?: string;
      from?: string;
      to?: string;
      deadline?: Date;
      detail?: {
        isAction: boolean;
        icon: 'detail' | 'add' | 'edit';
        iconColor?: string;
        iconSize?: 'small' | 'medium' | 'large';
        callback: (value: any) => void;
      };
    }
  | undefined;

export type KeyValuePairObj = Record<string, any>;

export const isKeyValuePairObj = (arg: any): arg is KeyValuePairObj => {
  return true;
};

// form types
export type FormOptionT = {
  label: string;
  value: any;
};

export type FormOptionsT = FormOptionT[] | [];

export type FromOptionsGroupT = {
  label: string;
  options: FormOptionsT;
};

export type FromOptionsGroupsT = FromOptionsGroupT[];

export type OnSubmitHandlerT = SubmitHandler<{ [key: string]: any }>;

export type OnCancelHandlerT = (data: any) => void;

export type FromPropsI = {
  sx?: SxProps;
  onCancel?: OnCancelHandlerT;
  onSubmit: SubmitHandler<any>;
  submitting: boolean;
  disabled?: boolean;
};

// errors
export interface IssueTrackerErr {
  status: number;
  data: {
    code: number;
    err: string;
  };
}

export const isIssueTrackerErr = (obj: any): obj is IssueTrackerErr => {
  return typeof obj.status === 'number' && typeof obj.data.code === 'number' && typeof obj.data.err === 'string';
};

export type GroupedUsersByDepartment = ReturnType<typeof groupUsersByDepartment>;
