import React from 'react';
import womanAvatar from '../../assets/icon/large_avatar_woman.svg';
import manAvatar from '../../assets/icon/man.svg';

export default function LargeAvatar({ isMale, nickname }: {
    isMale: boolean,
    nickname?: string
}) {
  return (
    <img src={isMale ? manAvatar : womanAvatar} width="216px" alt={nickname} />
  );
}
