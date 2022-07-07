import React from 'react';

import Link from '../../../../components/Link';

import ListItem from '../../../../components/ListItem';

import LikeAndComment from '../../../../components/LikeAndComment';

import Interaction from '../Interaction';

const Commentary: React.FC = () => {
  const header = (
    <>
      <Link className="group ml-1" href="/">
        <span className="text-gray-100 font-semibold group-hover:text-grey-200">
          karsten
        </span>
      </Link>

      <span className="text-grey-200 text-sm ml-auto">3hrs ago</span>
    </>
  );

  return (
    <ListItem>
      <Interaction
        header={header}
        text="after seeing all the shit that gru has put them through im shocked the minions havent unionized yet"
      >
        <LikeAndComment likes={0} commentaries={0} onLike={() => ({})} />
      </Interaction>
    </ListItem>
  );
};

export default Commentary;
