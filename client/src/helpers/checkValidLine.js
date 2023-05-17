export const checkLine = (line) => {
  const last = line.length - 1;
  return line[0][0] === line[last][0] && line[0][1] === line[last][1];
};
