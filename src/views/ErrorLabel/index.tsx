import React from 'react';

export default function ErrorLabel({ errorMessage }: {errorMessage?: string}) {
  return <div className="pl-1 text-[#ECA741] text-[14px]">{errorMessage}</div>;
}
