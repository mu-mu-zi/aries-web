import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import ModalContainer from '../../../views/ModalContainer';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';
import ContactUsFooter from '../../../views/ContactUsFooter';
import TextField from '../../../components/TextField';
import { useValidators } from '../../../utils/zod';

export default function CreatingCommand({ onClose }: {
  onClose?(): void
}) {
  const { trustId } = useParams();
  // const { t } = useTranslation();
  const intl = useIntl();
  const { zodMinStr } = useValidators();
  const valid = z.object({
    investmentSuggestion: zodMinStr(),
    investmentTime: zodMinStr(5),
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

  // const submit = async (data: FormValid) => {
  //   await axios.post('/trust/trust/investment/addTrustInvestment', {
  //     trustId: Number(trustId),
  //     ...data,
  //   }).then((resp) => {
  //     onClose?.();
  //     queryClient.invalidateQueries(['trust']);
  //   });
  // };

  const addTrustInvestmentMutation = useMutation({
    mutationFn: (data: FormValid) => axios.post('/trust/trust/investment/addTrustInvestment', {
      trustId: Number(trustId),
      ...data,
    }),
    onSuccess: async () => {
      onClose?.();
      await queryClient.invalidateQueries(['trust']);
    },
  });

  return (
    <ModalContainer>
      <ModalNav
        title={intl.formatMessage({ defaultMessage: 'Investment instructions' })}
        onClose={onClose}
      />
      <div className="flex flex-col">
        <form onSubmit={handleSubmit((data) => addTrustInvestmentMutation.mutate(data))}>
          {/* todo: 这里的表单输入框缺少内阴影，文字颜色 */}
          <div className="flex flex-col gap-8">
            <div className="py-4 rounded-xl">
              <label>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-1">
                    <div className="text-[16px] font-bold gradient-text1">*</div>
                    <div className="text-[#99AC9B] font-bold text-[20px]">
                      <FormattedMessage defaultMessage="Investment Recommendation" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 bg-[#3B5649] rounded-xl py-4 px-6">
                    <textarea
                      {...register('investmentSuggestion')}
                      maxLength={1000}
                      className="w-full text-[16px] placeholder:text-[#708077] h-[320px] bg-[#3B5649] outline-none resize-none"
                      placeholder={intl.formatMessage({
                        defaultMessage: 'To ensure better handling of investment instructions, please provide as much detail as possible, including:\r\n\r\nInvestment Objective: Specify the investment objective for the designated trust assets, such as capital preservation, steady appreciation, or pursuit of returns\r\n\r\nInvestment Strategy: Clearly define the strategy, goals, and amount for this investment. For example, it could involve converting a portion of one asset class in the trust into another asset class, investing in a specific term deposit or bank financial product, etc',
                      })}
                    />
                    {errors.investmentSuggestion?.message && <div className="text-[#ECA741] text-[14px]">{errors.investmentSuggestion?.message}</div>}
                  </div>
                </div>
              </label>
            </div>
            <div>
              <TextField
                type="text"
                // className="w-full h-[48px] rounded-xl bg-[#3B5649] placeholder:text-[#708077] text-[16px] px-6 outline-none"
                placeholder={intl.formatMessage({ defaultMessage: 'Investment Timeline: Clearly indicate when you would like this investment to be executed, allowing sufficient time for the trustee to complete all necessary operations in advance' })}
                maxLength={50}
                {...register('investmentTime')}
                error={errors.investmentTime?.message}
              />
            </div>
            <div className="self-center">
              <Button type="submit" disabled={addTrustInvestmentMutation.isLoading}>
                <FormattedMessage defaultMessage="Submit" />
              </Button>
            </div>
            <div className="flex flex-col mt-9 gap-[46px]">
              {/* <Divide /> */}
              {/* <ContactUs /> */}
              <ContactUsFooter />
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}
