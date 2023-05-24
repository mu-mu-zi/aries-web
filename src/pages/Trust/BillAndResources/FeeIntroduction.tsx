import React from 'react';
import Hr from '../../../components/Hr';
import Section, { SectionTitle } from './Section';

export default function FeeIntroduction({ title, description }: {
  title: string,
  description: string[]
}) {
  return (
    <Section>
      <SectionTitle title={title} />
      <Hr />
      <div className="flex flex-col gap-4">
        {description.map((x) => <p className="text-[#99AC9B] text-[16px]" key={x}>{x}</p>)}
      </div>
    </Section>
  );
}
