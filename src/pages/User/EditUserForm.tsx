import IssueTrackerForm from '../../components/Forms/Base';
import { getValidations } from '../../utils/validation';
import { FromPropsI, FormOptionsT } from '../../types';

interface PropsI extends FromPropsI {
  user: {
    email: string;
    roleId: number;
    departmentId: number;
    status: 0 | 1;
  };
  statusList: FormOptionsT;
  rolesList: FormOptionsT;
  departmentsList: FormOptionsT;
}

const EditUserByAdmin = ({ user, rolesList, departmentsList, statusList, onCancel, onSubmit, submitting }: PropsI) => {
  return (
    <IssueTrackerForm
      items={[
        {
          type: 'email',
          label: 'Email',
          name: 'email',
          defaultValue: user.email,
          disabled: true,
        },
        {
          type: 'password',
          label: 'New Password',
          name: 'password',
          rules: getValidations(['password']),
        },
        {
          type: 'selection',
          label: 'Role',
          name: 'roleId',
          options: rolesList,
          defaultValue: user.roleId,
        },
        {
          type: 'selection',
          label: 'Department',
          name: 'departmentId',
          options: departmentsList,
          defaultValue: user.departmentId,
        },
        {
          type: 'selection',
          label: 'Status',
          name: 'status',
          options: statusList,
          defaultValue: user.status,
        },
      ]}
      buttonLabel="Save"
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitting={submitting}
      disabled={departmentsList.length === 0}
    />
  );
};

export default EditUserByAdmin;
