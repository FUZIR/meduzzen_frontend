import React from 'react';
import BaseCard from './BaseCard';

function UserInvitationCard({ companyName, status, onAccept, onReject }) {
  return (
    <BaseCard
      title={companyName}
      status={status}
      onAccept={onAccept}
      onReject={onReject}
      labels={{
        title: 'invitation_card_company',
        acceptButton: 'invitation_card_accept_button',
        rejectButton: 'invitation_card_reject_button',
      }}
    />
  );
}

export default UserInvitationCard;