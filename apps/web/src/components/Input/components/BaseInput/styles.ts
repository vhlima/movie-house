interface InputStyleProps {
  container: string;
  border: string;
  input: string;
}

export type InputStyleType = 'primary' | 'secondary';

// TODO remove border from input styles

export const inputStyles: {
  [key in InputStyleType]: InputStyleProps;
} = {
  primary: {
    container: 'bg-grey-800 border-grey-800',
    border: 'border-grey-800',
    input: 'text-white placeholder-grey-400',
  },
  secondary: {
    container: 'bg-grey-900',
    border: 'border-grey-900',
    input: 'text-white placeholder-grey-400',
  },
};
