import React from 'react';
import Divide from '../../components/Divide';
import ContactUs from '../../pages/SignIn/ContactUs';

export default function ContactUsFooter() {
  return (
    <div className="flex flex-col gap-12">
      <Divide />
      <div className="self-center mt-2">
        <ContactUs />
      </div>
    </div>
  );
}
