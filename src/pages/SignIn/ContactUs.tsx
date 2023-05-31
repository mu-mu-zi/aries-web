import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextButton from '../../components/TextButton';

export default function ContactUs() {
  const navigate = useNavigate();
  const { trustId } = useParams();
  const { t } = useTranslation();

  return (
    <TextButton
      onClick={() => navigate(trustId ? `/contactCustomer/${trustId}` : '/contactCustomer', {
        state: {
          trustId: trustId && Number(trustId),
        },
      })}
    >
      {t('Contact Us')}
    </TextButton>
  );
}
