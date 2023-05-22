export const CallFormat = (
  name?: string,
  gender?: boolean, // 男
) => {
  if (gender) {
    return `Dear Mr. ${name}`;
  }
  return `Dear Mrs. ${name}`;
};
