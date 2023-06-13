import { FormattedMessage } from 'react-intl';
import icon from '../../assets/icon/statusWarning.svg';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUsFooter from '../../views/ContactUsFooter';
import ContactUs from '../SignIn/ContactUs';

export default function Warning({ onOk }: { onOk?(): void }) {
  return (
    <div className="gradient-bg2 flex w-[480px] flex-col items-center gap-4 rounded-xl py-8 shadow-block">
      <img src={icon} alt="" className="w-[44px]" />
      <div className="text-[14px] text-[#708077]">
        <FormattedMessage defaultMessage="You do not yet have the identity of a trustee party." />
      </div>
      <div className="">
        <Button onClick={onOk}>
          <FormattedMessage defaultMessage="I know" />
        </Button>
      </div>
      <div className="mt-4 flex w-full flex-col items-center gap-4">
        <Divide />
        <ContactUs />
      </div>
    </div>
  );
}
