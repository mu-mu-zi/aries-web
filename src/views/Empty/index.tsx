import Logo from '../../components/Logo';

export default function Empty({
  title,
}: {
  title?: string
}) {
  return (
    <div className="grid place-items-center min-h-[160px]">
      <div className="text-[#C2D7C7F6] text-center"><Logo /></div>
      {title && <div className="text-[#708077] text-[16px] text-center">{title}</div>}
    </div>
  );
}
