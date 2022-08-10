import IssueTrackerForm from './Base';
import { groupUsersByDepartment } from '../../utils/users';
import { getValidations } from '../../utils/validation';

interface PropsI {
  issue: {
    title: string;
    description: string;
    receiverId: string;
    dueAt: Date;
    status: 0 | 1;
  };
  statusList: any;
  usersGroupedByDepartment: ReturnType<typeof groupUsersByDepartment>;
  saving: boolean;
  handleCancel: () => void;
  handleSubmit: (data: any) => void;
}

const EditIssue = ({ issue, usersGroupedByDepartment, statusList, saving, handleCancel, handleSubmit }: PropsI) => {
  return (
    <IssueTrackerForm
      items={[
        {
          type: 'text',
          label: 'Title',
          name: 'title',
          defaultValue: issue.title,
          rules: getValidations(['required']),
          minRows: 2,
          maxRows: 5,
        },
        {
          type: 'text',
          label: 'Description',
          name: 'description',
          defaultValue: issue.description,
          minRows: 6,
          maxRows: 10,
        },
        {
          type: 'groupedSelection',
          label: 'Receiver',
          name: 'receiver',
          defaultValue: issue.receiverId,
          rules: getValidations(['required']),
          groups: usersGroupedByDepartment,
        },
        {
          type: 'dateTimePicker',
          label: 'Deadline',
          name: 'dueAt',
          defaultValue: issue.dueAt,
          disablePast: true,
          rules: getValidations(['required']),
        },
        {
          type: 'selection',
          label: 'Status',
          name: 'status',
          defaultValue: issue.status,
          rules: getValidations(['required']),
          options: statusList,
        },
      ]}
      buttonLabel="Save"
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      saving={saving}
      disabled={usersGroupedByDepartment.length === 0}
    />
  );
};

export default EditIssue;
