import React from "react";
import { useParams } from "react-router-dom";
// issue detail with comments
// add comment via pop up
// sort comment by created_at timestamp
function Issue() {
  const { id } = useParams();
  return <div>Issue {id} detail with comments</div>;
}

export default Issue;
