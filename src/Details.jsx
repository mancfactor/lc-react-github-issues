import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import Comments from './Comments';
import ReactMarkdown from 'react-markdown';

export default function Details() {
  const fakeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const repoName = 'facebook/create-react-app';
  const params = useParams();
  const {
    isLoading,
    isSuccess,
    data: issue,
  } = useQuery(['issue', params.id], fetchIssue);

  function fetchIssue() {
    return fetch(
      `https://api.github.com/repos/${repoName}/issues/${params.id}`
    ).then(response => response.json());
  }
  return (
    <div className="comments-container">
      {isLoading && <div>Loading...</div>}

      {isSuccess && (
        <>
          <h2>
            {issue.title} <span>#{issue.number}</span>
          </h2>
          <div className="issue-details">
            <a href={issue.user.url}>{issue.user.login}</a> opened this issue{' '}
            {formatDistance(new Date(issue.created_at), new Date(), {
              addSuffix: true,
            })}
          </div>
          <div className="issue">
            <div className="issue-body markdown-body">
              <ReactMarkdown children={issue.body} />
            </div>
          </div>
        </>
      )}

      {isSuccess && <Comments issueNumber={issue.number} />}
    </div>
  );
}
