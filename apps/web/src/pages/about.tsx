import type { NextPage } from 'next';

import { motion, AnimatePresence } from 'framer-motion';

import {
  FaReact,
  // FaTypescript,
  // FaNext,
  // FaApollo,
  // FaYup,
  // FaFormik,
  // FaReactIcons,
} from 'react-icons/fa';
import { createElement } from 'react';

const technologies = [
  {
    icon: FaReact,
    name: 'React',
  },
  {
    icon: FaReact,
    name: 'TypeScript',
  },
  {
    icon: FaReact,
    name: 'Next.js',
  },
  {
    icon: FaReact,
    name: 'Apollo Client',
  },
  {
    icon: FaReact,
    name: 'Yup',
  },
  {
    icon: FaReact,
    name: 'Formik',
  },
  {
    icon: FaReact,
    name: 'React Icons',
  },
];

const AboutPage: NextPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h1 className="text-5xl font-bold text-grey-100">About Me</h1>
    <p className="mt-4 text-lg leading-loose text-grey-200">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
      tristique, ipsum vitae placerat commodo, tellus lacus hendrerit nulla,
      eget laoreet purus neque vitae libero. Aliquam at enim pellentesque,
      rutrum purus vitae, tempor orci. Fusce fringilla, tellus ut consectetur
      facilisis, lacus sapien laoreet ipsum, et egestas sapien erat eu enim. Sed
      ac dui sem. Sed euismod sapien eget diam viverra, non condimentum libero
      tempus.
    </p>
    <h2 className="mt-8 text-xl font-bold text-grey-200">Technologies Used</h2>
    <ul className="mt-4 flex flex-wrap">
      <AnimatePresence>
        {technologies.map((technology, index) => (
          <motion.li
            key={technology.name}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="mt-4 p-4 border border-grey-700 rounded-lg"
          >
            {createElement(technology.icon, {
              className: 'inline-block w-8 h-8 fill-current text-grey-300',
            })}
            <span className="ml-2 text-grey-200">{technology.name}</span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  </motion.div>
);

export default AboutPage;
