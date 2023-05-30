import icon from '../../assets/icon/statusWarning.svg';
import Button from '../../components/Button';
import Divide from '../../components/Divide';
import ContactUsFooter from '../../views/ContactUsFooter';
import ContactUs from '../SignIn/ContactUs';

export default function Warning({ onOk }: {
  onOk?(): void
}) {
  return (
    <div className="gradient-bg2 rounded-xl w-[480px] flex flex-col gap-4 items-center py-8 shadow-block">
      <img src={icon} alt="" className="w-[44px]" />
      <div className="text-[#708077] text-[14px]">You do not yet have the identity of a trustee party.</div>
      <div className=""><Button onClick={onOk}>I know</Button></div>
      <div className="mt-4 flex flex-col items-center gap-4">
        <Divide />
        <ContactUs />
      </div>
    </div>
  );
}
