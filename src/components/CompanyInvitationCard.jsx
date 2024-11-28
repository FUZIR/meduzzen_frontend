import React from 'react';
import CancelCard from './CancelCard.jsx';

function CompanyInvitationCard({ userName, status, onCancel }) {
  return (
    <CancelCard title={userName} status={status} handleCancel={onCancel} labels={{
      title: 'company_invitation_card_title',
      cancelButton: 'card_cancel_button',
    }} />
  );
}

export default CompanyInvitationCard;