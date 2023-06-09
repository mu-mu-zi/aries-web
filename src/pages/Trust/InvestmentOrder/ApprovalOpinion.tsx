import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import ModalContainer from '../../../views/ModalContainer';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import Button from '../../../components/Button';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';
import { IInvestmentApproveRecode, IInvestmentOrderRecode } from '../../../interfaces/trust';
import { useValidators } from '../../../utils/zod';

export default function ApprovalOpinion({ onClose, record }: {
  onClose?(): void,
  record: IInvestmentApproveRecode
}) {
  const { zodRequired } = useValidators();
  const valid = z.object({
    note: zodRequired(),
  });
  type FormValid = z.infer<typeof valid>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
    setValue,
  } = useForm<FormValid>({
    resolver: zodResolver(valid),
  });
  const queryClient = useQueryClient();
  // const { t } = useTranslation();
  const intl = useIntl();

  const submit = async (data: FormValid) => {
    await axios.request({
      url: '/trust/trust/investment/approval/record/audit',
      method: 'get',
      params: {
        approvalRecordId: record.id,
        remark: data.note,
      },
    });
    onClose?.();
    queryClient.invalidateQueries(['trust']);
  };

  useEffect(() => setValue('note', record.approvalRemark), [record]);

  return (
    <ModalContainer>
      <ModalNav
        title={intl.formatMessage({ defaultMessage: 'Approval opinion' })}
        onClose={onClose}
      />
      <div className="flex flex-col mt-4">
        <form onSubmit={handleSubmit(submit)}>
          {/* todo: 这里的表单输入框缺少内阴影，文字颜色 */}
          <div className="flex flex-col gap-8">
            <div className="py-4 rounded-xl bg-[#3B5649]">
              <label>
                <div className="flex flex-col gap-2 px-6">
                  <div className="flex flex-row gap-1">
                    {/* <div className="text-[16px] font-bold gradient-text1">*</div> */}
                    <div className="text-[#99AC9B] font-bold text-[20px]">
                      <FormattedMessage defaultMessage="Approval opinion (optional)" />
                    </div>
                  </div>
                  <textarea
                    maxLength={100}
                    {...register('note')}
                    className="w-full text-[16px] placeholder:text-[#708077] h-[120px] bg-transparent py-4 outline-none rounded-xl resize-none"
                    placeholder={intl.formatMessage({ defaultMessage: 'In order to better handle investment instructions, please express your opinions as completely as possible.' })}
                  />
                </div>
              </label>
            </div>
            <div className="self-center">
              <Button type="submit">
                <FormattedMessage defaultMessage="Submit" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}
