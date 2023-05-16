import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios/index';
import ModalContainer from '../../../views/ModalContainer';
import ModalNav from '../../../views/ModalContainer/ModalNav';
import Button from '../../../components/Button';
import Divide from '../../../components/Divide';
import ContactUs from '../../SignIn/ContactUs';

export default function ApprovalOpinion() {
  const valid = z.object({
    note: z.string().nonempty(),
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

  };

  return (
    <ModalContainer>
      <ModalNav title="Approval opinion" />
      <div className="flex flex-col mt-4">
        <form onSubmit={handleSubmit(submit)}>
          {/* todo: 这里的表单输入框缺少内阴影，文字颜色 */}
          <div className="flex flex-col gap-8">
            <div className="py-4 rounded-xl bg-[#3B5649]">
              <label>
                <div className="flex flex-col gap-2 px-6">
                  <div className="flex flex-row gap-1">
                    {/* <div className="text-[16px] font-bold gradient-text1">*</div> */}
                    <div className="text-[#99AC9B] font-bold text-[20px]">Approval opinion (optional)</div>
                  </div>
                  <textarea
                    {...register('note')}
                    className="w-full text-[16px] placeholder:text-[#708077] h-[120px] bg-transparent py-4 outline-none rounded-xl resize-none"
                    placeholder="In order to better handle investment instructions, please express your opinions as completely as possible."
                  />
                </div>
              </label>
            </div>
            <div className="self-center">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}
