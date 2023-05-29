import React, { useEffect, useMemo, useState } from 'react';
import AreaList from './AreaList';
import icon from '../../assets/icon/arrow_down.svg';
import Modal from '../Modal';
import { useAreaCodeListQuery } from '../../api/base/areaCode';
import { IAreaCode } from '../../interfaces/base';

export default function AreaSelect({ defaultId, onSelected }: {
  defaultId?: number
  onSelected?(area: IAreaCode): void
}) {
  const [visible, setVisible] = React.useState(false);
  const areaList = useAreaCodeListQuery();
  const selected = useMemo(() => areaList.data?.data?.find((x) => x.id === defaultId) ?? areaList.data?.data?.[0], [areaList.data?.data, defaultId]);

  useEffect(() => {
    const first = areaList.data?.data?.[0];
    if (first) {
      onSelected?.(first);
    }
  }, [areaList.data?.data]);

  return (
    <>
      <div
        className="flex-shrink-0 min-w-[140px] h-[48px] rounded-xl input-inner-shadow flex gap-2 items-center bg-[#3B5649] cursor-pointer px-6"
        onClick={() => setVisible(true)}
      >
        {/* {selected?.name} */}
        {/* {defaultId} */}
        {selected && <div className="flex-auto gradient-text1 text-[20px] font-bold">{`+${selected?.code}`}</div>}
        <img src={icon} width="32px" height="32px" alt="" />
      </div>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <AreaList
          data={areaList.data?.data ?? []}
          onSelect={(x) => {
            // setSelected?.(x);
            onSelected?.(x);
            console.log(x);
          }}
          onClose={() => setVisible(false)}
        />
      </Modal>
    </>
  );
}
