import clsx from 'clsx';

type StarIconIntent = 'half' | 'full' | 'outline';

interface StarIconProps {
  intent?: StarIconIntent;
}

const fillColors: { [key in StarIconIntent]: string } = {
  full: '#3b82f6',
  half: 'url(#half-fill-gradient)',
  outline: 'url(#outline-fill-gradient)',
};

export const StarIcon: React.FC<StarIconProps> = ({ intent = 'outline' }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 1024 1024"
    className={clsx({
      'text-blue-500': intent === 'full' || intent === 'half',
      'text-grey-300': intent === 'outline',
    })}
    height="1.3em"
    width="1.3em"
    xmlns="http://www.w3.org/2000/svg"
  >
    {intent === 'half' && (
      <defs>
        <linearGradient
          id="half-fill-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="51%" stopColor="#3b82f6" />
          <stop offset="49%" stopColor="transparent" />
        </linearGradient>
      </defs>
    )}

    {intent === 'outline' && (
      <defs>
        <linearGradient
          id="outline-fill-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    )}

    <path
      stroke="currentColor"
      strokeWidth="40"
      strokeLinejoin="round"
      strokeLinecap="round"
      d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"
      fill={fillColors[intent]}
    />
  </svg>
);
