import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ModalContainer from '../../../views/ModalContainer';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';

export default function CreatingCommand({ onClose }: {
  onClose?(): void
}) {
  const { trustId } = useParams();
  const { t } = useTranslation();
  const valid = z.object({
    investmentSuggestion: z.string().nonempty(),
    investmentTime: z.string().nonempty(),
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

  const submit = async (data: FormValid) => {
    await axios.post('/trust/trust/investment/addTrustInvestment', {
      trustId: Number(trustId),
      ...data,
    }).then((resp) => {
      queryClient.invalidateQueries(['trust', 'investment']);
      onClose?.();
    });
  };

  return (
    <ModalContainer>
      <ModalNav title={t('Investment instructions')} onClose={onClose} />
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(submit)}>
          {/* todo: 这里的表单输入框缺少内阴影，文字颜色 */}
          <div className="flex flex-col gap-8">
            <div className="py-4 rounded-xl">
              <label>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-1">
                    <div className="text-[16px] font-bold gradient-text1">*</div>
                    <div className="text-[#99AC9B] font-bold text-[20px]">{t('Investment Recommendation')}</div>
                  </div>
                  <textarea
                    {...register('investmentSuggestion')}
                    className="w-full text-[16px] placeholder:text-[#708077] h-[320px] bg-[#3B5649] py-4 px-6 outline-none rounded-xl resize-none"
                    placeholder={t(`To better handle investment instructions, please describe them as completely as possible, including the following:
1.Investment objective: specify the target and purpose of the trust assets to be invested, such as capital appreciation or income growth.
2.Investment target: determine the specific investment targets, such as stocks, bonds, real estate, etc.
3.Investment scope: determine the scope and limitations of the investment, such as investment regions, industries, risk levels, etc.
4.Investment strategy: develop an investment strategy, such as diversified investment, portfolio adjustment, dynamic asset allocation, etc.
5.Investment risk: determine risk management measures for investment, such as using hedging tools to reduce market risk, establishing risk control systems, etc.
6.Investment returns: determine the distribution method and proportion of investment returns, such as reinvestment of returns, proportional distribution, etc.
7.Investment term: determine the investment term and subsequent processing methods, such as long-term holding, regular adjustment, early exit, etc.`) ?? ''}
                  />
                </div>
              </label>
            </div>
            <div>
              <input
                type="text"
                className="w-full h-[48px] rounded-xl bg-[#3B5649] placeholder:text-[#708077] text-[16px] px-6 outline-none"
                placeholder={t('Investment time') ?? ''}
                {...register('investmentTime')}
              />
            </div>
            <div className="self-center">
              <Button type="submit">{t('Submit')}</Button>
            </div>
            <div className="flex flex-col mt-9 gap-[46px]">
              <Divide />
              <ContactUs />
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}
