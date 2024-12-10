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
import { Requests } from '../../api/requests.js';
import axios from '../../api/axios.js';
import ChangeCompanyInfoModal from '../../components/modals/ChangeCompanyInfoModal.jsx';
import { isCompanyMember } from '../../utils/isCompanyMember.js';
import { fetchUserRequests } from '../../features/thunks/requestsThunks.js';
import { isAdminUser } from '../../utils/isAdminUser.js';
import CreateQuizModal from '../../components/modals/CreateQuizModal.jsx';

function CompanyInfo({ t }) {
  const requests = new Requests(axios);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = parseInt(useSelector(selectUserId));
  const { id } = useParams();
  const companyId = parseInt(id);
  const currentUser = useSelector(selectUserId);
  const { currentCompany: company, loading } = useSelector(selectCompaniesState);
  const [isOpenDeleteCompanyModal, setIsOpenDeleteCompanyModal] = useState(false);
  const [isOpenChangeCompanyInfoModal, setIsOpenChangeCompanyInfoModal] = useState(false);
  const [isOpenCreateQuizModal, setIsOpenCreateQuizModal] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [admins, setAdmins] = useState([]);

  const handleOpenDeleteCompanyModal = () => setIsOpenDeleteCompanyModal(true);
  const handleCloseDeleteCompanyModal = () => setIsOpenDeleteCompanyModal(false);

  const handleOpenChangeCompanyInfoModal = () => setIsOpenChangeCompanyInfoModal(true);
  const handleCloseChangeCompanyInfoModal = () => setIsOpenChangeCompanyInfoModal(false);

  const handleOpenCreateQuizModal = () => setIsOpenCreateQuizModal(true);
  const handleCloseCreateQuizModal = () => setIsOpenCreateQuizModal(false);

  useEffect(() => {
    dispatch(fetchCompanyById({ companyId: companyId }));
    requests.getAdmins(companyId).then((response) => {
      setAdmins(response.data);
    });
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

  const handleCreateQuiz = async (data) => {
    await requests.createCompanyQuiz(data);
    setIsOpenCreateQuizModal(false);
  };

  const handleExportCompanyResults = async (companyId) => {
    await requests.getCompanyResultsCsv(companyId);
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
      <CreateQuizModal isOpen={isOpenCreateQuizModal} onClose={handleCloseCreateQuizModal} companyId={companyId}
                       onSubmit={(data) => handleCreateQuiz(data)} />
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
            {isUserOwner(userId, company.owner.id) ? (
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ flex: 1, minWidth: '120px' }}
                    onClick={handleOpenChangeCompanyInfoModal}
                  >
                    {t('company_change_info_button')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ flex: 1, minWidth: '120px' }}
                    component={Link}
                    to={`/companies/${companyId}/details`}
                  >
                    {t('company_owner_info_button')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ flex: 1, minWidth: '120px' }}
                    component={Link}
                    to={`/company_quizzes/${companyId}/`}
                  >{t('quizzes_header')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ flex: 1, minWidth: '120px' }}
                    onClick={handleOpenCreateQuizModal}
                  >
                    {t('create_quiz_button')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ flex: 1, minWidth: '120px' }}
                    onClick={() => handleExportCompanyResults(companyId)}
                  >
                    {t('profile_export_results_button')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ flex: 1, minWidth: '120px' }}
                    onClick={handleOpenDeleteCompanyModal}
                  >
                    {t('company_delete_button')}
                  </Button>
                </Box>
              </CardContent>
            ) : isAdminUser(userId, admins) ? (
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ flex: 1, minWidth: '120px' }}
                    onClick={handleOpenCreateQuizModal}
                  >
                    {t('create_quiz_button')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ flex: 1, minWidth: '120px' }}
                    onClick={() => handleExportCompanyResults(companyId)}
                  >
                    {t('profile_export_results_button')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ flex: 1, minWidth: '120px' }}
                    component={Link}
                    to={`/company_quizzes/${companyId}/`}
                  >{t('quizzes_header')}
                  </Button>
                </Box>
              </CardContent>
            ) : isCompanyMember(company, currentUser) && (
              <Button
                variant="contained"
                color="primary"
                sx={{ flex: 1, minWidth: '120px' }}
                component={Link}
                to={`/company_quizzes/${companyId}/`}
              >{t('quizzes_header')}
              </Button>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default withTranslation()(CompanyInfo);