export const CallFormat = (
  name?: string,
  gender?: boolean, // 男,
  dear?: boolean,
) => {
  if (gender) {
    return `${dear ? 'Dear ' : ' '}Mrs. ${name}`;
  }
  return `${dear ? 'Dear ' : ' '}Mr. ${name}`;
};
