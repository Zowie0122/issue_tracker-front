import React from "react";
import { useSearchParams } from "react-router-dom";

// 3 tabs, received(default), posted, all(all issues from the company)
// if with queries in the url, fetch the result with queries
// link to issue page to get details

type Props = {
  tag?: string;
};
function Issues({ tag = "all" }: Props) {
  console.log(tag);
  return <div>Issues List</div>;
}

export default Issues;
