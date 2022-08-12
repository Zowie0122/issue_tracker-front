import IssueTrackerForm from './Base';
import { getValidations } from '../../utils/validation';
import { FromPropsI } from '../../types';

interface PropsI extends FromPropsI {
  user: {
    firstName: string;
    lastName: number;
  };
}

const UserSettings = ({ user, saving, handleCancel, handleSubmit }: PropsI) => {
  return (
    <IssueTrackerForm
      items={[
        {
          type: 'text',
          label: 'First Name',
          name: 'firstName',
          defaultValue: user.firstName,
          rules: getValidations(['required']),
        },
        {
          type: 'text',
          label: 'Last Name',
          name: 'lastName',
          defaultValue: user.lastName,
          rules: getValidations(['required']),
        },
        {
          type: 'password',
          label: 'Current Password',
          name: 'currentPassword',
          rules: getValidations(['password']),
        },
        {
          type: 'password',
          label: 'New Password',
          name: 'newPassword',
          rules: getValidations(['password']),
        },
      ]}
      buttonLabel="Save"
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      saving={saving}
    />
  );
};

export default UserSettings;