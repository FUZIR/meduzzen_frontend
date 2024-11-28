import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Typography } from '@mui/material';
import Header from '../../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchCompanyById } from '../../features/thunks/companiesThunks.js';
import { selectCompaniesState, selectUserId } from '../../stores/selectors.js';
import { withTranslation } from 'react-i18next';
import { isUserOwner } from '../../utils/isUserOwner.js';
import DeleteCompanyModal from '../../components/modals/DeleteCompanyModal.jsx';
import { Requests } from '../../api/Requests.js';
import axios from '../../api/Axios.js';
import ChangeCompanyInfoModal from '../../components/modals/ChangeCompanyInfoModal.jsx';
import { isCompanyMember } from '../../utils/isCompanyMember.js';
import { fetchUserRequests } from '../../features/thunks/requestsThunks.js';

function CompanyInfo({ t }) {
  const requests = new Requests(axios);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = parseInt(useSelector(selectUserId));
  const { id } = useParams();
  const companyId = parseInt(id);
  const { currentCompany: company, loading } = useSelector(selectCompaniesState);
  const [isOpenDeleteCompanyModal, setIsOpenDeleteCompanyModal] = useState(false);
  const [isOpenChangeCompanyInfoModal, setIsOpenChangeCompanyInfoModal] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleOpenDeleteCompanyModal = () => setIsOpenDeleteCompanyModal(true);
  const handleCloseDeleteCompanyModal = () => setIsOpenDeleteCompanyModal(false);

  const handleOpenChangeCompanyInfoModal = () => setIsOpenChangeCompanyInfoModal(true);
  const handleCloseChangeCompanyInfoModal = () => setIsOpenChangeCompanyInfoModal(false);

  useEffect(() => {
    dispatch(fetchCompanyById({ companyId: companyId }));
  }, [dispatch]);

  const onDeleteCompany = (id) => {
    requests.deleteCompany(id);
    setIsOpenDeleteCompanyModal(false);
    navigate('/companies/');
  };

  const handleRequest = async () => {
    await requests.createRequests({ user: userId, company: companyId });
    dispatch(fetchUserRequests());
    setIsRequestSent(true);
  };

  if (loading === 'pending') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size="3rem" />
      </Box>
    );
  }

  if (!company) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">Company not found</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Header />
      <ChangeCompanyInfoModal companyId={companyId} isOpen={isOpenChangeCompanyInfoModal}
                              onClose={handleCloseChangeCompanyInfoModal} currentCompany={company} />
      <DeleteCompanyModal isOpen={isOpenDeleteCompanyModal} handleClose={handleCloseDeleteCompanyModal}
                          onDeleteCompany={() => onDeleteCompany(companyId)} />
      <Container maxWidth={'md'} sx={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            component="img"
            height="300"
            image={company.image_path}
            alt={`${company.name}`}
          />
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {company.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('company_description')}: {company.description}
            </Typography>
            {company.members.length > 0 && (
              <Typography variant="body1" color="text.secondary">
                {t('company_members_count')}: {company.members.length}
              </Typography>
            )}
            <Typography variant="body1" color="text.secondary">
              {t('company_email')}: {company.company_email}
            </Typography>
            {company.company_address && (
              <Typography variant="body1" color="text.secondary">
                {t('company_address')}: {company.company_address}
              </Typography>
            )}
            {company.company_site && (
              <Typography variant="body1" color="text.secondary">
                {t('company_website')}:
                <a href={company.company_site} target="_blank" rel="noopener noreferrer">
                  {company.company_site}
                </a>
              </Typography>
            )}
            <Typography variant="body1" color="text.secondary">
              {t('company_owner')}: {
              company.owner.first_name && company.owner.last_name
                ? `${company.owner.first_name || ''} ${company.owner.last_name || ''}`.trim()
                : company.owner.username}
            </Typography>
            {!isCompanyMember(company, userId) && !isUserOwner(userId, company.owner.id) && (
              <Button variant="outlined" color="primary" sx={{ mt: 1 }}
                      onClick={handleRequest}
                      disabled={isRequestSent}>{isRequestSent ? t('company_request_sent') : t('company_send_request')}
              </Button>
            )}
            {isUserOwner(userId, company.owner.id) &&
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <Button variant="contained" color="primary" sx={{ mt: 1 }}
                          onClick={handleOpenChangeCompanyInfoModal}>{t('company_change_info_button')}
                  </Button>
                  <Button variant="contained" color="primary" sx={{ mt: 1 }}
                          component={Link} to={`/companies/${companyId}/details`}>{t('company_owner_info_button')}
                  </Button>
                  <Button variant="outlined" color="error" sx={{ mt: 1 }}
                          onClick={handleOpenDeleteCompanyModal}>{t('company_delete_button')}
                  </Button>
                </Box>
              </CardContent>
            }
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default withTranslation()(CompanyInfo);