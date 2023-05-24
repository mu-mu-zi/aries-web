export const CallFormat = (
  name?: string,
  gender?: boolean, // 男
) => {
  if (gender) {
    return `Dear Mrs. ${name}`;
  }
  return `Dear Mr. ${name}`;
};
