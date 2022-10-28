import React, { useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';
import { useTranslation } from 'react-i18next';

const HoaxView = props => {
  const { hoax , onDeleteHoax} = props;
  const loggedInUser = useSelector(store => store.username);
  const { user, content, fileAttachment, id } = hoax;
  const { username, displayName, image } = user;
  const [modalVisible, setModalVisible] = useState(false);

  

  const pendingApiCall = useApiProgress('delete', `/api/1.0/hoaxes/${id}`, true);

  const { t, i18n } = useTranslation();

  const onClickDelete = async () => {
    await deleteHoax(id);
    onDeleteHoax(id);
  };

  const onClickCancel = () => {
    setModalVisible(false);
  };

  const ownedByLoggedInUser = loggedInUser === username;
   return (
    <>
      <div className="card p-1">
        <div className="d-flex">
          <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle m-1" />
          <div className="flex-fill m-auto pl-2">
            <Link to={`/user/${username}`} className="text-dark">
              <h6 className="d-inline">
                {displayName}@{username}
              </h6>
              <span> - </span>
            
            </Link>
          </div>
          {ownedByLoggedInUser && (
            <button className="btn btn-delete-link btn-sm" onClick={() => setModalVisible(true)}>
              <i className="material-icons">delete_outline</i>
            </button>
          )}
        </div>
        <div className="pl-5">{content}</div>
        {fileAttachment && (
          <div className="pl-5">
            {fileAttachment.fileType.startsWith('image') && (
              <img className="img-fluid" src={'images/attachments/' + fileAttachment.name} alt={content} />
            )}
            {!fileAttachment.fileType.startsWith('image') && <strong>Hoax has unknown attachment</strong>}
          </div>
        )}
      </div>
      <Modal
        visible={modalVisible}
        title={t('Delete Hoax')}
        onClickCancel={onClickCancel}
        onClickOk={onClickDelete}
        message={
          <div>
            <div>
              <strong>{t('Are you sure to delete hoax?')}</strong>
            </div>
            <span>{content}</span>
          </div>
        }
        pendingApiCall={pendingApiCall}
        okButton={t('Delete Hoax')}
      />
    </>
  );
};

export default HoaxView;


// import React from 'react';
// import ProfileImageWithDefault from './ProfileImageWithDefault';
// import { Link } from 'react-router-dom';
// import { format } from 'timeago.js';
// import { useTranslation } from 'react-i18next';


// const HoaxView = props => {
//   const { hoax } = props;
//   const { user, content, timestamp, fileAttachment } = hoax;
//   const { username, displayName, image } = user;

//   const { i18n } = useTranslation();

//   const formatted = format(timestamp, i18n.language);
//   return (
//     <div className="card p-1">
//       <div className="d-flex">
//         <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle m-1" />
//         <div className="flex-fill m-auto pl-2">
//           <Link to={`/user/${username}`} className="text-dark">
//             <h6 className="d-inline">
//               {displayName}@{username}
//             </h6>
//             <span> - </span>
//             <span>{formatted}</span>
//           </Link>
//         </div>
//       </div>
//       <div className="pl-5">{content}</div>
//       {fileAttachment && (
//         <div className="pl-5">
//           <img className="img-fluid" src={'images/' + fileAttachment.name} alt={content} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default HoaxView;