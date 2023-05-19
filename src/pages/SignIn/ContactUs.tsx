import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ContactUs() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="underline gradient-text1 text-center font-title cursor-pointer" onClick={() => navigate('/contactCustomer')}>
      {t('Contact Us')}
    </div>
  );
}
