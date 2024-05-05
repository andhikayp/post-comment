import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import Api from '../../api';
import { Layout } from '../../component/Layout';

const { fetchPostByPostId, fetchCommentsByPostId, fetchUserById } = Api;

const DetailPost = (props) => {
  const { match } = props;
  const { id } = match.params;
  const { data: post, isLoading: isLoadingPost } = useQuery(
    ['post'],
    () => fetchPostByPostId(id),
  );
  const { data: comments, isLoading: isLoadingComments } = useQuery(
    ['comments'],
    () => fetchCommentsByPostId(id),
  );
  const { data: user, isLoading: isLoadingUser } = useQuery(
    ['user'],
    () => fetchUserById(post?.userId || 1),
  );

  const renderComment = (comment) => {
    const { name, body } = comment;

    return (
      <div className="mb-4 d-flex">
        <div className="">
          <Image src="https://www.pngkey.com/png/detail/157-1579943_no-profile-picture-round.png" roundedCircle style={{ width: '50px', height: '50px', marginRight: '16px' }} />
        </div>
        <div className="flex-grow-1">
          <Card>
            <Card.Header>
              <strong>{name}</strong>
            </Card.Header>
            <Card.Body>
              {body}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const commentCount = comments?.length;

    return (
      <div>
        <Card>
          <Card.Body>
            <div className="mb-3">
              {`${post?.body}` || null}
            </div>
            <div>
              <Card>
                <Card.Header>{`Comments (${commentCount})`}</Card.Header>
                <Card.Body>
                  {!isLoadingComments && comments.map(renderComment)}
                </Card.Body>
              </Card>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <Layout
      title={`${post?.title}` || null}
      subtitle={`created by: ${user?.name}`}
      content={renderContent}
      isLoading={isLoadingPost && isLoadingComments}
    />
  );
};

export default DetailPost;
