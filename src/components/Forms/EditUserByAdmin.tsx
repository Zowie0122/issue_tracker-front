import IssueTrackerForm from './Base';
import { getValidations } from '../../utils/validation';
import { FromPropsI, FormOptions } from '../../types';

interface PropsI extends FromPropsI {
  user: {
    email: string;
    role_id: number;
    department_id: number;
    status: 0 | 1;
  };
  statusList: FormOptions;
  rolesList: FormOptions;
  departmentsList: FormOptions;
}

const EditUserByAdmin = ({
  user,
  rolesList,
  departmentsList,
  statusList,
  saving,
  handleCancel,
  handleSubmit,
}: PropsI) => {
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
          defaultValue: user.role_id,
        },
        {
          type: 'selection',
          label: 'Department',
          name: 'departmentId',
          options: departmentsList,
          defaultValue: user.department_id,
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
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      saving={saving}
      disabled={departmentsList.length === 0}
    />
  );
};

export default EditUserByAdmin;
