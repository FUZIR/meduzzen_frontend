import ModalForm from './ModalForm.jsx';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCompanyById } from '../../features/thunks/companiesThunks.js';
import { useTranslation } from 'react-i18next';
import axios from '../../api/Axios.js';
import { Requests } from '../../api/Requests.js';

function ChangeCompanyInfoModal({ isOpen, onClose, companyId, currentCompany }) {
  const dispatch = useDispatch();
  const requests = new Requests(axios);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const [company, setCompany] = React.useState({
    name: currentCompany?.name || '',
    description: currentCompany?.description || '',
    company_email: currentCompany?.company_email || '',
    company_site: currentCompany?.company_site || '',
    company_address: currentCompany?.company_address || '',
    image_path: currentCompany?.image_path || '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const updatedFields = {};
    Object.keys(company).forEach((key) => {
      if (company[key] !== currentCompany[key]) {
        updatedFields[key] = company[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      setError(t('update_info_no_fields_error'));
      return;
    }

    try {
      const updateResponse = await requests.patchCompanyInfo(companyId, updatedFields);
      if (updateResponse.status !== 200) {
        const errorData = await updateResponse.json();
        if (errorData.company_email) {
          setError(errorData.company_email[0]);
        } else {
          setError(t('update_info_error'));
        }
        return;
      }
      dispatch(fetchCompanyById({ companyId }));
      onClose();
    } catch (e) {
      if (e.response && e.response.data) {
        const errorData = e.response.data;
        if (errorData.company_email) {
          setError(errorData.company_email[0]);
        } else {
          setError(e.message);
        }
      } else {
        setError(t('update_info_error'));
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title={t('change_company_info_title')}
      onSubmit={handleSubmit}
    >
      <FormControl fullWidth>
        <FormLabel htmlFor="name">{t('change_company_info_name')}</FormLabel>
        <TextField
          size="small"
          id="name"
          name="name"
          required
          value={company.name || ''}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="description">{t('change_company_info_description')}</FormLabel>
        <TextField
          size="small"
          id="description"
          name="description"
          required
          value={company.description || ''}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="company_email">{t('change_company_info_email')}</FormLabel>
        <TextField
          size="small"
          id="company_email"
          name="company_email"
          required
          value={company.company_email || ''}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="company_site">{t('change_company_info_site')}</FormLabel>
        <TextField
          size="small"
          id="company_site"
          name="company_site"
          value={company.company_site || ''}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="company_address">{t('change_company_info_address')}</FormLabel>
        <TextField
          size="small"
          id="company_address"
          name="company_address"
          value={company.company_address || ''}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel htmlFor="image_path">{t('change_company_info_image')}</FormLabel>
        <TextField
          size="small"
          id="image_path"
          name="image_path"
          value={company.image_path || ''}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
    </ModalForm>
  );
}

export default ChangeCompanyInfoModal;
