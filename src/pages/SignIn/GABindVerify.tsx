import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import GANavbar from './GANavbar';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUs from './ContactUs';
import TextInput from '../../components/TextInput';
import { useSendValidateCodeMutation } from '../../api/user/verify';

export default function GABindVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const sendValidateCodeMutation = useSendValidateCodeMutation();
  const valid = z.object({
    securityCode: z.string().nonempty(),
    googleCaptcha: z.string().nonempty(),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const queryClient = useQueryClient();

  const sendValidCode = async () => {
    /* 验证账号 */
    const { account } = location.state;
    if (!account) return;
    sendValidateCodeMutation.mutate({
      account,
    });
  };

  const submit = async (data: FormValid) => {
    const { account, areaCodeId } = location.state;
    if (!account) return;
    const formatData = {
      googleCode: data.googleCaptcha,
      isReset: false,
      userEmailCode: '',
      userEmail: '',
      userMobile: '',
      userMobileCode: '',
    };
    // 手机验证
    if (areaCodeId) {
      formatData.userMobile = account;
      formatData.userMobileCode = data.securityCode;
    } else {
      formatData.userEmail = account;
      formatData.userEmailCode = data.securityCode;
    }
    try {
      const resp = await axios.post('/user/userSecurity/verificationMethod', formatData);
      const ticker = resp?.data as string;
      const loginResp = await axios.post('/auth/ariesToken/login', {
        account,
        ticker,
      });
      const token = loginResp.data as string;
      /* 存储 token，刷新接口 */
      localStorage.setItem('TOKEN', token);
      await queryClient.invalidateQueries();
      navigate('/status');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[38px]">
      <div className="gradient-bg2 flex max-w-[1200px] w-full min-h-[800px] flex-col overflow-clip  rounded-xl">
        <GANavbar
          title="Bind Google Authentication"
          description="Google Authenticator is a dynamic password tool, which works similar to SMS dynamic verification. After
          binding, it generates a dynamic verification code every 30 seconds, which can be used for security
          verification for login, modifying security settings and other operations."
        />
        <div className="item-center flex w-[418px] flex-col self-center pt-[64px]">
          <form onSubmit={handleSubmit(submit)}>
            <div className="text-shadow-block font-blod gradient-text1 text-center font-title text-[32px] leading-[36px]">
              Verify identity
            </div>
            <div className="mt-16 flex flex-col gap-4">
              <div className="font-blod text-[#c2d7c7]">Email verification code</div>
              <TextInput
                placeholder="Please enter the verification code"
                {...register('securityCode')}
                suffix={(
                  <div
                    className="cursor-pointer font-bold gradient-text1 text-[20px] px-2"
                    onClick={sendValidCode}
                  >
                    Send
                  </div>
                  )}
              />
              <div className="text-[14px] leading-[16px] text-[#708077]">
                To ensure the security of your funds and account, please enter the verification code received in your
                Aries trust company@Gmail.com email.
              </div>
              <div className="font-blod text-[#c2d7c7]">Google Captcha</div>
              <TextInput
                {...register('googleCaptcha')}
                placeholder="Please enter the verification code"
              />
            </div>
            <div className="mt-[40px] flex flex-row gap-4">
              <Button size="medium" block>
                Cancel
              </Button>
              <Button size="medium" block type="submit">
                Next
              </Button>
            </div>
          </form>
        </div>
        <div className="flex-auto" />
        <div className="mt-12 flex flex-col items-center gap-9 self-stretch px-8 pb-16">
          <Divide />
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
