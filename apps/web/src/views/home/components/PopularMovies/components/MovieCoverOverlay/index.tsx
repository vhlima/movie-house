import clsx from 'clsx';

import SvgIcon from '../../../../../../components/SvgIcon';

import Typography from '../../../../../../components/Typography';

const MovieCoverOverlay: React.FC = () => {
  const containerStyles = 'flex flex-col items-center p-2';

  return (
    <div className="hidden md:none md:group-hover:block group-hover:opacity-100 transition-opacity opacity-0 absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10 bg-black rounded-md bg-opacity-60 select-none">
      <div className={clsx(containerStyles, 'border-b border-grey-300')}>
        <SvgIcon className="text-success-base" iconType="AiFillEye" size={40} />

        <Typography component="span" color="primary" size="xl">
          675,058
        </Typography>
      </div>

      <div className={containerStyles}>
        <SvgIcon
          className="text-warning-base"
          iconType="AiFillHeart"
          size={40}
        />

        <Typography component="span" color="primary" size="xl">
          675,058
        </Typography>
      </div>
    </div>
  );
};

export default MovieCoverOverlay;
