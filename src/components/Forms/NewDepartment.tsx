import IssueTrackerForm from './Base';
import { getValidations } from '../../utils/validation';

const NewDepartment = ({ saving, handleCancel, handleSubmit }: any) => {
  return (
    <IssueTrackerForm
      items={[
        {
          type: 'text',
          label: 'Name',
          name: 'name',
          rules: getValidations(['required']),
        },
      ]}
      buttonLabel="Add"
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      saving={saving}
    />
  );
};

export default NewDepartment;
