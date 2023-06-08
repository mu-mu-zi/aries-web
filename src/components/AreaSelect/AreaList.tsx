import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import ModalContainer from '../../views/ModalContainer';
import ModalNav from '../../views/ModalContainer/ModalNav';
import { useAreaCodeListQuery } from '../../api/base/areaCode';
import { IAreaCode } from '../../interfaces/base';
import TextInput from '../TextInput';
import Empty from '../../views/Empty';

export default function AreaList({ data, onSelect, onClose }: {
  data: IAreaCode[]
  onSelect?(area: IAreaCode): void
  onClose?(): void
}) {
  const intl = useIntl();
  const [filterList, setFilterList] = useState(data);
  const { formatMessage } = useIntl();

  return (
    <ModalContainer>
      <ModalNav title="AreaCode" onClose={onClose} />
      <div className="mb-4">
        <TextInput
          block
          className=""
          placeholder={formatMessage({ defaultMessage: 'Search' })}
          onChange={(e) => {
            if (e.target.value === '') {
              setFilterList(data);
            } else {
              setFilterList(data.filter((x) => x.code.includes(e.target.value) || x.name.toLowerCase().includes(e.target.value.toLowerCase())));
            }
          }}
        />
      </div>
      <div className="flex flex-col mx-[-32px] h-[320px] overflow-y-auto">
        {filterList.length === 0 && (
          <div className="h-full grid place-items-center">
            <Empty title={intl.formatMessage({ defaultMessage: 'No result' })} />
          </div>
        )}
        {filterList.map((x) => (
          <div
            key={x.id}
            className="flex items-center gap-4 py-2 px-8 cursor-pointer text-[#C2D7C7F6] text-[20px] hover:bg-[#3B5649]"
            onClick={() => {
              onSelect?.(x);
              onClose?.();
            }}
          >
            <img src={x.img} width="22px" alt={x.name} />
            <div className="flex-auto">{x.name}</div>
            <div>{`+${x.code}`}</div>
          </div>
        ))}
      </div>
    </ModalContainer>
  );
}
