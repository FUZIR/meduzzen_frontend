import React, { useState } from 'react';
import ModalForm from './ModalForm.jsx';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import axios from '../../api/Axios.js';
import { Requests } from '../../api/Requests.js';
import { useTranslation, withTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

function CreateCompanyModal({ isOpen, onClose }) {
  const requests = new Requests(axios);
  const { t } = useTranslation();
  const [company, setCompany] = useState({
    name: '',
    description: '',
    company_email: '',
    image_path: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompany((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const fields = {};
    Object.keys(company).forEach((key) => {
      fields[key] = company[key];
    });

    try {
      const createResponse = await requests.createCompany(fields);
      if (createResponse.status === 201) {
        onClose();
      } else {
        const errorData = await createResponse.json();
        if (errorData.name) {
          setError(errorData.name[0]);
        } else if (errorData.description) {
          setError(errorData.description[0]);
        } else if (errorData.company_email) {
          setError(errorData.company_email[0]);
        } else {
          setError(t('create_company_error'));
        }
      }

    } catch (e) {
      if (e.response && e.response.data) {
        const errorData = e.response.data;
        if (errorData.name) {
          setError(errorData.name[0]);
        } else if (errorData.description) {
          setError(errorData.description[0]);
        } else if (errorData.company_email) {
          setError(errorData.company_email[0]);
        } else {
          setError(e.message);
        }
      } else {
        setError(t('create_company_error'));
      }
    }
  };
  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title={t('create_company_title')} onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <FormLabel htmlFor="name">{t('change_company_info_name')}</FormLabel>
        <TextField
          size="small"
          id="name"
          name="name"
          required
          value={company.name}
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
          value={company.description}
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
          value={company.company_email}
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel htmlFor="image_path">{t('change_company_info_image')}</FormLabel>
        <TextField
          size="small"
          id="name"
          name="name"
          value={company.image_path}
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

export default withTranslation()(CreateCompanyModal);