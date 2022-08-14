import IssueTrackerForm from './Base';
import { getValidations } from '../../utils/validation';
import { FromPropsI, FormOptions } from '../../types';

interface PropsI extends FromPropsI {
  rolesList: FormOptions;
  departmentsList: FormOptions;
}

const NewUser = ({ rolesList, departmentsList, onCancel, onSubmit, submitting }: PropsI) => {
  return (
    <IssueTrackerForm
      items={[
        {
          type: 'text',
          label: 'First Name',
          name: 'firstName',
          rules: getValidations(['required']),
        },
        {
          type: 'text',
          label: 'Last Name',
          name: 'lastName',
          rules: getValidations(['required']),
        },
        {
          type: 'email',
          label: 'Email',
          name: 'email',
          rules: getValidations(['required', 'email']),
        },
        {
          type: 'password',
          label: 'Password',
          name: 'password',
          rules: getValidations(['required', 'password']),
        },
        {
          type: 'selection',
          label: 'Role',
          name: 'roleId',
          rules: getValidations(['required']),
          options: rolesList,
        },
        {
          type: 'selection',
          label: 'Department',
          name: 'departmentId',
          rules: getValidations(['required']),
          options: departmentsList,
        },
      ]}
      buttonLabel="Add"
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitting={submitting}
    />
  );
};

export default NewUser;
