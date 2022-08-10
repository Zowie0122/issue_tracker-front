import IssueTrackerForm from './Base';
import { getValidations } from '../../utils/validation';

const NewIssue = ({ usersGroupedByDepartment, saving, handleCancel, handleSubmit }: any) => {
  return (
    <IssueTrackerForm
      items={[
        {
          type: 'text',
          label: 'Title',
          name: 'title',
          rules: getValidations(['required']),
          minRows: 2,
          maxRows: 5,
        },
        {
          type: 'text',
          label: 'Description',
          name: 'description',

          minRows: 6,
          maxRows: 10,
        },
        {
          type: 'groupedSelection',
          label: 'Receiver',
          name: 'receiver',
          rules: getValidations(['required']),
          groups: usersGroupedByDepartment,
        },
        {
          type: 'dateTimePicker',
          label: 'Deadline',
          name: 'dueAt',
          disablePast: true,
          rules: getValidations(['required']),
        },
      ]}
      buttonLabel="Add"
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      saving={saving}
      disabled={usersGroupedByDepartment.length === 0}
    />
  );
};

export default NewIssue;
