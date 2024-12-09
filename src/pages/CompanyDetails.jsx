import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import Header from '../components/Header.jsx';
import CompanyRequestCard from '../components/CompanyRequestCard.jsx';
import axios from '../api/Axios.js';
import { useDispatch, useSelector } from 'react-redux';
import { Requests } from '../api/Requests.js';
import { fetchCompanyRequests } from '../features/thunks/requestsThunks.js';
import { selectCompaniesState, selectInvitationsState, selectRequestsState } from '../stores/selectors.js';
import { useParams } from 'react-router-dom';
import { resetRequestsState } from '../features/request/requestSlice.js';
import CompanyInvitationCard from '../components/CompanyInvitationCard.jsx';
import { fetchCompanyInvitations } from '../features/thunks/invitationsThunks.js';
import { resetInvitationState } from '../features/invitation/invitationSlice.js';
import { fetchCompanyById } from '../features/thunks/companiesThunks.js';
import { useTranslation } from 'react-i18next';
import { isAdminUser } from '../utils/isAdminUser.js';

function CompanyDetails() {
  const { t } = useTranslation();
  const requests = new Requests(axios);
  const dispatch = useDispatch();
  const { id } = useParams();
  const companyId = parseInt(id);
  const { entities: companyRequests } = useSelector(selectRequestsState);
  const { entities: companyInvites } = useSelector(selectInvitationsState);
  const { currentCompany: company } = useSelector(selectCompaniesState);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    dispatch(fetchCompanyRequests({ companyId }));
    dispatch(fetchCompanyInvitations({ companyId }));
    dispatch(fetchCompanyById({ companyId }));

    requests.getAdmins(companyId).then((data) => {
      setAdmins(data);
    });

    return () => {
      dispatch(resetRequestsState());
      dispatch(resetInvitationState());
    };
  }, [dispatch, companyId]);

  const handleRequestAccept = async (requestsId, companyId) => {
    await requests.requestAccept({ id: requestsId });
    dispatch(fetchCompanyRequests(companyId));
  };

  const handleRequestReject = async (requestsId, companyId) => {
    await requests.requestReject({ id: requestsId });
    dispatch(fetchCompanyRequests(companyId));
  };

  const handleInvitationRevoke = async (invitationId, companyId) => {
    await requests.invitationRevoke({ id: invitationId });
    dispatch(fetchCompanyInvitations({ companyId }));
  };

  const handleRemoveUser = async (userId, companyId) => {
    await requests.removeUser({ user: userId, company: companyId });
    dispatch(fetchCompanyById({ companyId }));
  };

  const handleAppointAdmin = async (userId, companyId) => {
    await requests.appointAdmin({ user: userId, company: companyId });
    const data = await requests.getAdmins(companyId);
    setAdmins(data);
  };

  const handleRemoveAdmin = async (userId, companyId) => {
    await requests.removeAdmin({ user: userId, company: companyId });
    const data = await requests.getAdmins(companyId);
    setAdmins(data);
  };

  const handleExportUserResults = async (userId, companyId) => {
    await requests.getUserResultsByIdCsv(userId, companyId);
  };
  return (
    <Box sx={{ p: 3 }}>
      <Header />
      <Typography variant="h4" align={'center'} color={'primary'} gutterBottom>
        {t('company_details_title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('company_details_requests_title')}
      </Typography>
      <Stack spacing={2}>
        {companyRequests.length > 0 ? (
          companyRequests.map((req) => (
            <CompanyRequestCard
              key={req.id}
              status={req.status}
              userName={req.user.first_name && req.user.last_name ? `${req.user.first_name} ${req.user.last_name}` : req.user.username}
              onReject={() => handleRequestReject(req.id, companyId)}
              onAccept={() => handleRequestAccept(req.id, companyId)}
            />
          ))
        ) : (
          <Typography>{t('company_details_requests_error')}</Typography>
        )}
      </Stack>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        {t('company_details_invitations_title')}
      </Typography>
      <Stack spacing={2}>
        {companyInvites.length > 0 ? (
          companyInvites.map((invite) => (
            <CompanyInvitationCard
              key={invite.id}
              status={invite.status}
              userName={invite.user.first_name && invite.user.last_name ? `${invite.user.first_name} ${invite.user.last_name}` : invite.user.username}
              onCancel={() => handleInvitationRevoke(invite.id, companyId)}
            />
          ))
        ) : (
          <Typography>{t('company_details_invitations_error')}</Typography>
        )}
      </Stack>
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        {t('company_details_members_title')}
      </Typography>
      <Stack spacing={2}>
        {company?.members?.length > 0 ? (
          company.members.map((member) => (
            <Card key={member.id} sx={{
              display: 'flex',
              justifyContent: 'space-between',
              border: isAdminUser(member.id, admins.data) ? '1px solid green' : '0px',
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={member.avatar} sx={{ mr: 2 }} />
                <Typography
                  variant="body1">{member.first_name && member.last_name ? `${member.first_name} ${member.last_name}` : member.username}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="primary"
                        onClick={() => handleExportUserResults(member.id, companyId)}>
                  {t('company_details_export_user_results_button')}
                </Button>
                {isAdminUser(member.id, admins.data) ?
                  (
                    <Button variant="outlined" color="error" onClick={() => handleRemoveAdmin(member.id, companyId)}>
                      {t('company_details_remove_admin_member_button')}
                    </Button>
                  ) :
                  (<Button variant="outlined" color="success" onClick={() => handleAppointAdmin(member.id, companyId)}>
                    {t('company_details_make_admin_member_button')}
                  </Button>)
                }
                <Button variant="outlined" color="error" onClick={() => handleRemoveUser(member.id, companyId)}>
                  {t('company_details_remove_member_button')}
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>{t('company_details_members_error')}</Typography>
        )}
      </Stack>
    </Box>
  );

}

export default CompanyDetails;