import React, { useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const HoaxView = props => {
  const loggedInUser = useSelector(store => store.username);
  const { hoax } = props;
  const { user, content,  fileAttachment } = hoax;
  const { username, displayName, image } = user;


  

  const ownedByLoggedInUser = loggedInUser === username;

  return (
    <div className="card p-1">
      <div className="d-flex">
        <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle m-1" />
        <div className="flex-fill m-auto pl-2">
          <Link to={`/user/${username}`} className="text-dark">
            <h6 className="d-inline">
              {displayName}@{username}
            </h6>
         
          </Link>
        </div>
        
      </div>
      <div className="pl-5">{content}</div>
      {fileAttachment && (
        <div className="pl-5">
          <img className="img-fluid" src={'images/' + fileAttachment.name} alt={content} />
        </div>
      )}
    </div>
  );
};

export default HoaxView;