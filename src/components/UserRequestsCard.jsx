import React from 'react';
import CancelCard from './CancelCard.jsx';

function UserRequestsCard({ companyName, status, handleCancel }) {
  return (
    <CancelCard handleCancel={handleCancel} status={status} title={companyName} labels={{
      title: 'user_requests_card_title',
      cancelButton: 'card_cancel_button',
    }} />
  );
}

export default UserRequestsCard;