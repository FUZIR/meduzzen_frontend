import React from 'react';
import BaseCard from './BaseCard';

function CompanyRequestCard({ userName, status, onAccept, onReject }) {
  return (
    <BaseCard
      title={userName}
      status={status}
      onAccept={onAccept}
      onReject={onReject}
      labels={{
        title: 'company_request_card_title',
        acceptButton: 'invitation_card_accept_button',
        rejectButton: 'invitation_card_reject_button',
      }}
    />
  );
}

export default CompanyRequestCard;