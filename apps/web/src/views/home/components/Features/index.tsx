import FeatureLink from './components';

import Card from '../../../../components/Card';

const Features: React.FC = () => (
  <Card>
    <Card.Header title="Features you will love" marginBottom />

    <Card.Body>
      <ul className="grid gap-2 lg:grid-cols-2">
        <FeatureLink
          href="/"
          iconType="AiFillEye"
          color="green"
          text="Keep track of every film youve ever watched (or just start from the day you join)"
        />

        <FeatureLink
          href="/"
          iconType="AiFillHeart"
          color="orange"
          text="Show some love for your favorite movies, lists and reviews by liking, commenting and reviewing"
        />

        <FeatureLink
          href="/"
          iconType="IoList"
          color="purple"
          text="Write and share reviews, and follow friends and other members to read theirs"
        />

        <FeatureLink
          href="/"
          iconType="AiFillStar"
          color="green"
          text="Rate each film on a ten-star scale (with halves) to record and share your reaction"
        />

        <FeatureLink
          href="/"
          iconType="AiOutlineCalendar"
          color="orange"
          text="Keep a diary of your film watching"
        />

        <FeatureLink
          href="/"
          iconType="AiFillHeart"
          color="purple"
          text="Compile and share lists of films on any topic and keep a watchlist of films to see"
        />
      </ul>
    </Card.Body>
  </Card>
);

export default Features;
