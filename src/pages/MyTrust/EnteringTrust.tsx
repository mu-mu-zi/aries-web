import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import icon from '../../assets/icon/my_trust_logo.svg';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import bankIcon from '../../assets/icon/coin_bank.svg';
import setterLogo from '../../assets/icon/trust_banhuren.png';
import befLogo from '../../assets/icon/trust_bef.png';
import { Trust } from '../../interfaces/trust';

export default function EnteringTrust({ trust }: {
  trust: Trust
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logo = (type: number) => {
    switch (type) {
      /* 保护人、继位、第二 */
      case 4:
      case 5:
      case 6:
        return setterLogo;
      /* 收益 */
      case 2:
      case 3:
      case 21:
        return befLogo;
      default:
        return icon;
    }
  };

  /*
  * 1-委托人，2-明确受益人，3-非明确受益人，4-保护人，5-继位保护人，6-第二位继位保护人
  * */
  const userType = (type: number) => {
    switch (type) {
      case 1:
        return 'Settlor';
      case 2:
      case 3:
      case 21:
        return 'Beneficiary';
      case 4:
      case 5:
      case 6:
        return 'Protector';
      default:
        return undefined;
    }
  };

  return (
    <div
      className="m-auto gradient-bg1 flex h-[720px] w-[475px] flex-col flex-shrink-0 overflow-clip rounded-xl shadow-block"
    >
      <div className="flex flex-auto flex-col px-12">
        <img className="mt-20 self-center" src={logo(trust.userType)} width="224px" alt="Logo" />
        <div className="gradient-text1 mt-12 text-center font-title text-[32px]">{trust.trustName}</div>
        <div className="gradient-text1 mt-4 text-center font-title font-bold text-[24px]">{`[${userType(trust.userType)}]`}</div>
        <div className="mt-4 text-center font-title text-[20px] text-[#C39770]">
          {moment.unix(trust.createTime / 1000).format('yyyy-MM-DD')}
        </div>
        <div className="flex-auto" />
        <div className="self-center">
          {trust.roleType > 1 && (
            <Button
              size="large"
              onClick={() => {
                if (trust.trustStatus === 2) {
                  navigate(`/trust/${trust.trustId}/dashboard`);
                } else {
                  navigate(`/first/${trust.trustId}/KycVerify`);
                }
              }}
            >
              {t('Entering the trust')}
            </Button>
          )}
        </div>
      </div>
      <div className="mt-[52px]">
        <Divide />
        <div className="flex h-[84px] flex-row items-center justify-around">
          {/* <BottomItem icon={bankIcon} title={t('Bank Account')} onTap={() => navigate(`/trust/${trust.trustId}/dashboard`)} /> */}
          {/* <BottomItem icon={bankIcon} title={t('Exchange Account')} onTap={() => navigate(`/trust/${trust.trustId}/dashboard`)} /> */}
        </div>
      </div>
    </div>
  );
}

function BottomItem({ icon, title, onTap }: { icon: string; title?: string | null; onTap?(): void }) {
  return (
    <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={onTap}>
      <img src={icon} width="32px" />
      <div className="gradient-text1 font-bold text-[14px]">{title}</div>
    </div>
  );
}
