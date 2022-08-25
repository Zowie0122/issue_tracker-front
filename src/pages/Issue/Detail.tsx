import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@mui/material';

import { useGetIssueByIdQuery, useAddCommentMutation, useUpdateIssueMutation } from '../../services/issuesApi';
import { useGetSelfQuery, useGetUsersQuery } from '../../services/usersApi';
import { useGetDepartmentsQuery } from '../../services/departmentsApi';

import Spinner from '../../components/Spinner';
import ErrorAlert from '../../components/ErrorAlert';
import IssueBlock from '../../components/Papers/IssueBlock';
import CommentBlock from '../../components/Papers/CommentBlock';
import Dialog from '../../components/Dialog';
import NewCommentForm from './NewCommentForm';
import EditIssueForm from './EditIssueForm';

import { groupUsersByDepartment } from '../../utils/users';
import { ISSUE_STATUS } from '../../utils/constants';
import { CommentT, KeyValuePairObj, GroupedUsersByDepartment } from '../../types';

function Detail() {
  const { id } = useParams();
  const { data: currentUser } = useGetSelfQuery({});

  const { data: users, isLoading: loadingUsers, error: errorUsers } = useGetUsersQuery({});

  const { data: departments, isLoading: loadingDepartments, error: errorDepartments } = useGetDepartmentsQuery({});

  const { data: issue, isLoading: loadingIssue, error: errorIssue } = useGetIssueByIdQuery({ id });

  const [addComment, { isLoading: savingNewComment, isSuccess: successNewComment, error: errorNewComment }] =
    useAddCommentMutation();

  const [updateIssue, { isLoading: updatingIssue, isSuccess: successUpdateIssue, error: errorUpdateIssue }] =
    useUpdateIssueMutation();

  const [showEditIssue, setShowEditIssue] = useState<boolean>(false);
  const [showNewComment, setShowNewComment] = useState<boolean>(false);
  const [usersGroupedByDepartment, setUsersGroupedByDepartment] = useState<GroupedUsersByDepartment>([]);
  const [addNewCommentErr, setAddNewCommentErr] = useState<typeof errorNewComment>(undefined);
  const [updateIssueErr, setUpdateIssueErr] = useState<typeof errorUpdateIssue>(undefined);

  // prepare for edit form receiver selection
  useMemo(() => {
    if (!loadingUsers && !loadingDepartments)
      setUsersGroupedByDepartment(groupUsersByDepartment(users, departments, currentUser.id));
  }, [loadingUsers, loadingDepartments]);

  // add new comment
  const handleNewCommentSubmit = async (data: KeyValuePairObj) => {
    data.issueId = id;
    await addComment(data);
  };

  const onCloseNewComment = () => {
    setShowNewComment(false);
    setAddNewCommentErr(undefined);
  };

  // since redux toolkit RTK doesn't support reset cache yet, use local state to track and reset the error
  useEffect(() => {
    setAddNewCommentErr(errorNewComment);
  }, [errorNewComment]);

  useMemo(() => {
    if (!savingNewComment && successNewComment) setShowNewComment(false);
  }, [savingNewComment]);

  // update issue
  const handleEditIssueSubmit = async (data: KeyValuePairObj) => {
    await updateIssue({ id, payload: data });
  };

  const onCloseUpdateIssue = () => {
    setShowEditIssue(false);
    setUpdateIssueErr(undefined);
  };

  useEffect(() => {
    setUpdateIssueErr(errorUpdateIssue);
  }, [errorUpdateIssue]);

  useMemo(() => {
    if (!updatingIssue && successUpdateIssue) setShowEditIssue(false);
  }, [updatingIssue]);

  if (loadingIssue) return <Spinner />;
  else if (errorIssue) return <ErrorAlert errors={[errorIssue]} />;

  return (
    <>
      {issue && issue.issuerId === currentUser.id && (
        <Button sx={{ m: 2 }} variant="contained" onClick={() => setShowEditIssue(true)}>
          Edit
        </Button>
      )}
      <IssueBlock issue={issue ? issue : {}} />
      <Button sx={{ m: 2 }} variant="contained" onClick={() => setShowNewComment(true)}>
        Add Comment
      </Button>
      {issue && issue.comments.map((comment: CommentT, i: number) => <CommentBlock key={i} comment={comment} />)}

      <Dialog
        open={showNewComment}
        onClose={onCloseNewComment}
        title="New Comment"
        content={
          <NewCommentForm
            submitting={savingNewComment}
            onCancel={onCloseNewComment}
            onSubmit={handleNewCommentSubmit}
          />
        }
        errors={
          (errorDepartments || errorUsers || addNewCommentErr) && [errorDepartments, errorUsers, addNewCommentErr]
        }
      />
      {issue && (
        <Dialog
          open={showEditIssue}
          onClose={onCloseUpdateIssue}
          title="Edit Issue"
          content={
            <EditIssueForm
              issue={{
                title: issue.title,
                description: issue.description,
                receiverId: issue.receiverId,
                dueAt: new Date(issue.dueAt),
                status: issue.status,
              }}
              usersGroupedByDepartment={usersGroupedByDepartment}
              statusList={Object.values(ISSUE_STATUS)}
              submitting={updatingIssue}
              onCancel={onCloseUpdateIssue}
              onSubmit={handleEditIssueSubmit}
            />
          }
          errors={(errorDepartments || errorUsers || updateIssueErr) && [errorDepartments, errorUsers, updateIssueErr]}
        />
      )}
    </>
  );
}

export default Detail;
