export type InputStyleType = 'primary' | 'secondary';

export const inputStyles: {
  [key in InputStyleType]: string;
} = {
  primary: 'bg-grey-800 border border-grey-800',
  secondary: 'bg-grey-900 border border-grey-900',
};
