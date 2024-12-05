import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Container, Pagination, PaginationItem, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { fetchCompanyQuizzes } from '../features/thunks/quizzesThunks.js';
import { selectCompaniesState, selectQuizzesState, selectUserId } from '../stores/selectors.js';
import { useTranslation } from 'react-i18next';
import QuizInfoCard from '../components/QuizInfoCard.jsx';
import { Requests } from '../api/Requests.js';
import axios from '../api/Axios.js';
import ChangeQuizModal from '../components/modals/ChangeQuizModal.jsx';
import { isAdminUser } from '../utils/isAdminUser.js';
import { isUserOwner } from '../utils/isUserOwner.js';
import { fetchCompanyById } from '../features/thunks/companiesThunks.js';
import Header from '../components/Header.jsx';

function CompanyQuizzes() {
  const { t } = useTranslation();
  const requests = new Requests(axios);
  const dispatch = useDispatch();
  const { id } = useParams();
  const company_id = parseInt(id);
  const { currentCompany } = useSelector(selectCompaniesState);
  const currentUserId = useSelector(selectUserId);
  const { entities: quizzes, count, loading } = useSelector(selectQuizzesState);
  const quizzesPerPage = 6;
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(count / quizzesPerPage);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isOpenChangeQuizModal, setIsOpenChangeQuizModal] = useState(false);
  const [admins, setAdmins] = useState([]);

  const handleOpenChangeQuizModal = (quiz) => {
    setSelectedQuiz(quiz);
    setIsOpenChangeQuizModal(true);
  };

  const handleCloseChangeQuizModal = () => {
    setIsOpenChangeQuizModal(false);
  };

  const handleQuizDelete = async (quiz_id) => {
    await requests.deleteCompanyQuiz(quiz_id);
    dispatch(fetchCompanyQuizzes({ company_id, page }));
  };

  const handleSubmit = async (quiz_id, data) => {
    await requests.updateCompanyQuiz(quiz_id, data);
    dispatch(fetchCompanyQuizzes({ company_id, page }));
  };

  useEffect(() => {
    dispatch(fetchCompanyQuizzes({ company_id, page }));
    dispatch(fetchCompanyById({ companyId: company_id }));
    requests.getAdmins(company_id).then((response) => {
      setAdmins(response.data);
    });
  }, [dispatch, company_id, page]);

  if (loading === 'pending') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size="3rem" />
      </Box>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="textSecondary">{t('quizzes_error')}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <ChangeQuizModal
        quiz={selectedQuiz}
        isOpen={isOpenChangeQuizModal}
        onClose={handleCloseChangeQuizModal}
        onSubmit={(data) => handleSubmit(selectedQuiz.id, data)}
      />
      <Container maxWidth="xl">
        <Container maxWidth="md">
          <Typography variant="h3" color="primary" align="center" gutterBottom>
            {t('quizzes_header')}
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {quizzes.map((quiz) => (
              <QuizInfoCard
                id={quiz.id}
                title={quiz.title}
                description={quiz.description}
                key={quiz.id}
                onQuizDelete={() => handleQuizDelete(quiz.id)}
                onQuizUpdate={() => handleOpenChangeQuizModal(quiz)}
                isAdmin={() => isAdminUser(currentUserId, admins)}
                isOwner={() => isUserOwner(currentUserId, currentCompany.owner?.id)}
              />
            ))}
          </Box>
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, marginBottom: 3 }}
            count={pageCount}
            page={page}
            onChange={(event, value) => setPage(value)}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Container>
      </Container>
    </Box>
  );
}

export default CompanyQuizzes;
