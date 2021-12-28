import React from 'react';
import { useQuery } from 'react-query';
import { formatDistance } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export default function Comments({ issueNumber }) {
  const repoName = 'facebook/create-react-app';
  const {
    isLoading,
    isSuccess,
    data: comments,
  } = useQuery(['comments', issueNumber], fetchComments);

  function fetchComments() {
    return fetch(
      `https://api.github.com/repos/${repoName}/issues/${issueNumber}/comments`
    ).then(response => response.json());
  }
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <>
          {comments.map(comment => (
            <div className="comment-container" key={comment.id}>
              <a href={comment.user.url}>
                <img
                  src={comment.user.avatar_url}
                  alt="avatar"
                  className="avatar"
                />
              </a>
              <div className="comment">
                <div className="comment-heading">
                  <a href={comment.user.url}>{comment.user.login}</a> commented{' '}
                  {formatDistance(new Date(comment.created_at), new Date(), {
                    addSuffix: true,
                  })}
                </div>
                <div className="comment-body markdown-body">
                  <ReactMarkdown children={comment.body} />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
