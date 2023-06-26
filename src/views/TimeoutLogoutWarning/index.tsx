import { FormattedMessage } from 'react-intl';
import icon from '../../assets/icon/statusWarning.svg';
import Button from '../../components/Button';
import Divide from '../../components/Divide';

export default function TimeoutLogoutWarning({ onOk }: { onOk?(): void }) {
  return (
    <div className="gradient-bg2 flex w-[480px] flex-col items-center gap-4 rounded-xl py-8 shadow-block">
      <img src={icon} alt="" className="w-[44px]" />
      <div className="text-[14px] text-[#708077]">
        <FormattedMessage defaultMessage="Session timeout. Please log in again to continue using the account" />
      </div>
      <div className="">
        <Button onClick={onOk}>
          <FormattedMessage defaultMessage="I know" />
        </Button>
      </div>
    </div>
  );
}
