import React from 'react';
import womanAvatar from '../../assets/icon/large_avatar_woman.svg';

export default function LargeAvatar({ isMale, nickname }: {
    isMale: boolean,
    nickname?: string
}) {
  return (
    <img src={womanAvatar} width="216px" alt={nickname} />
  );
}
