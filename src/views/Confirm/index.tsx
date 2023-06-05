import warningIcon from '../../assets/icon/statusWarning.svg';
import Button from '../../components/Button';
import ContactUsFooter from '../ContactUsFooter';
import Divide from '../../components/Divide';

export default function Confirm({
  title,
  onOk,
  onCancel,
}: {
  title: string,
  onOk?(): void,
  onCancel?(): void,
}) {
  return (
    <div className="gradient-bg2 rounded-xl w-[480px] flex flex-col py-8">
      <div className="flex flex-col items-center gap-4 mb-8 px-16">
        <img src={warningIcon} width="44px" alt="" />
        <div className="text-center text-[#708077] text-[14px]">{title}</div>
        <div className="grid grid-cols-2 gap-4">
          {onCancel && <Button size="medium" onClick={onCancel}>Cancel</Button>}
          <Button size="medium" onClick={onOk}>Ok</Button>
        </div>
      </div>
      <Divide />
    </div>
  );
}
