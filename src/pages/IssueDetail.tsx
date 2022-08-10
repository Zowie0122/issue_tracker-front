import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@mui/material';

import { useGetIssueByIdQuery, useAddCommentMutation, useUpdateIssueMutation } from '../services/issuesApi';
import { useGetSelfQuery, useGetUsersQuery } from '../services/usersApi';
import { useGetDepartmentsQuery } from '../services/departmentsApi';

import Spinner from '../components/Spinner';
import ErrorAlert from '../components/ErrorAlert';
import IssueBlock from '../components/Papers/IssueBlock';
import CommentBlock from '../components/Papers/CommentBlock';
import Dialog from '../components/Dialogs';
import NewComment from '../components/Forms/NewComment';
import EditIssue from '../components/Forms/EditIssue';

import { groupUsersByDepartment } from '../utils/users';
import { ISSUE_STATUS } from '../utils/constants';

function IssueDetail() {
  const { id } = useParams();
  const { data: currentUser } = useGetSelfQuery({});

  const { data: users, isLoading: loadingUsers, error: errorUsers } = useGetUsersQuery({});

  const { data: departments, isLoading: loadingDepartments, error: errorDepartments } = useGetDepartmentsQuery({});

  const { data, isLoading: loadingIssue, error: errorIssue } = useGetIssueByIdQuery({ id });

  const [addComment, { isLoading: savingNewComment, isSuccess: successNewComment, error: errorNewComment }] =
    useAddCommentMutation();

  const [updateIssue, { isLoading: updatingIssue, isSuccess: successUpdateIssue, error: errorUpdateIssue }] =
    useUpdateIssueMutation();

  const [showEditIssue, setShowEditIssue] = useState<boolean>(false);
  const [showNewComment, setShowNewComment] = useState<boolean>(false);
  const [usersGroupedByDepartment, setUsersGroupedByDepartment] = useState<ReturnType<typeof groupUsersByDepartment>>(
    []
  );
  const [addNewCommentErr, setAddNewCommentErr] = useState<typeof errorNewComment>(undefined);
  const [updateIssueErr, setUpdateIssueErr] = useState<typeof errorUpdateIssue>(undefined);

  // prepare for edit form receiver selection
  useMemo(() => {
    if (!loadingUsers && !loadingDepartments)
      setUsersGroupedByDepartment(groupUsersByDepartment(users, departments, currentUser.id));
  }, [loadingUsers, loadingDepartments]);

  // add new comment
  const handleNewCommentSubmit = async (data: { [key: string]: any }) => {
    // TODO: fix the type
    data.issueId = id;
    await addComment(data);
  };

  const onCloseNewComment = () => {
    setShowNewComment(false);
    setAddNewCommentErr(undefined);
  };

  // since redux toolkit RTK doesn't support reset cache yet, use local state to track and reset the error
  // https://stackoverflow.com/questions/68982391/change-a-mutation-value-when-fetching-another-query-rtk-query/68989101#68989101
  useEffect(() => {
    setAddNewCommentErr(errorNewComment);
  }, [errorNewComment]);

  useMemo(() => {
    if (!savingNewComment && successNewComment) setShowNewComment(false);
  }, [savingNewComment]);

  // update issue
  const handleEditIssueSubmit = async (data: { [key: string]: any }) => {
    // TODO: fix the type
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
      {data && data.issue.issuerId === currentUser.id && (
        <Button sx={{ m: 2 }} variant="contained" onClick={() => setShowEditIssue(true)}>
          Edit
        </Button>
      )}
      <IssueBlock issue={data ? data.issue : {}} />
      <Button onClick={() => setShowNewComment(true)}>Add Comment</Button>
      {data && data.comments.map((comment: any, i: number) => <CommentBlock key={i} comment={comment} />)}

      <Dialog
        open={showNewComment}
        onClose={onCloseNewComment}
        title="New Comment"
        content={
          <NewComment
            saving={savingNewComment}
            handleCancel={onCloseNewComment}
            handleSubmit={handleNewCommentSubmit}
          />
        }
        errors={
          (errorDepartments || errorUsers || addNewCommentErr) && [errorDepartments, errorUsers, addNewCommentErr]
        }
      />
      {data && (
        <Dialog
          open={showEditIssue}
          onClose={onCloseUpdateIssue}
          title="Edit Issue"
          content={
            <EditIssue
              issue={{
                title: data.issue.title,
                description: data.issue.description,
                receiverId: data.issue.receiverId,
                dueAt: new Date(data.issue.dueAt),
                status: data.issue.status,
              }}
              usersGroupedByDepartment={usersGroupedByDepartment}
              statusList={Object.values(ISSUE_STATUS)}
              saving={updatingIssue}
              handleCancel={onCloseUpdateIssue}
              handleSubmit={handleEditIssueSubmit}
            />
          }
          errors={(errorDepartments || errorUsers || updateIssueErr) && [errorDepartments, errorUsers, updateIssueErr]}
        />
      )}
    </>
  );
}

export default IssueDetail;
