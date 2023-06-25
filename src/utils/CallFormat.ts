export const CallFormat = (
  name?: string,
  gender?: boolean,
  dear?: boolean,
) => {
  if (gender) {
    return `${dear ? 'Dear ' : ' '}Ms. ${name}`;
  }
  return `${dear ? 'Dear ' : ' '}Mr. ${name}`;
};
