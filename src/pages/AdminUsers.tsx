import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  allUsersEntitiesSelector,
  allUsersLoadingSelector,
  allUsersErrorSelector,
} from "../store/slices/users";
import { AppDispatch } from "../store";

// list all the users in a company by default
// show users info in table with columns first name, last name ...
// add and edit button only to admin, detail, add / edit user via pop up
function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector(allUsersEntitiesSelector);
  const loading = useSelector(allUsersLoadingSelector);
  const error = useSelector(allUsersErrorSelector);
  console.log(users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  return (
    <>
      <div>Admin Page-Users list</div>
      <p>{loading && "Loading"}</p>
      <div>
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.id}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AdminUsers;
