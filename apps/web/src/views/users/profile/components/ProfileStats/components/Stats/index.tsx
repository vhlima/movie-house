import Link from '../../../../../../../components/Link';

import type { LinkProps } from '../../../../../../../components/Link';

interface StatsProps {
  text: string;
  number: number;
  link: LinkProps;
}

const Stats: React.FC<StatsProps> = ({ number, text, link }) => (
  <Link
    className="flex flex-col items-center border-r border-grey-700 px-2 first-of-type:pl-0 last-of-type:pr-0 last-of-type:border-0"
    {...link}
  >
    <span className="text-grey-100 font-bold">{number}</span>
    <span className="text-grey-200">{text}</span>
  </Link>
);

export default Stats;