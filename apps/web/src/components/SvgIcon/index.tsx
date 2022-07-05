import React from 'react';

import { IconType, IconBaseProps } from 'react-icons';

import {
  FaRegUserCircle,
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaGithub,
  FaSearch,
  FaUserAlt,
  FaListUl,
  FaUsers,
} from 'react-icons/fa';

import { AiFillHeart, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import {
  BsFillChatLeftFill,
  BsPlusLg,
  BsHouse,
  BsFillBellFill,
  BsFillCollectionFill,
} from 'react-icons/bs';

import { MdMovie } from 'react-icons/md';

import { FiX } from 'react-icons/fi';

import { HiMenu, HiMail, HiLockClosed } from 'react-icons/hi';

import { IoIosJournal } from 'react-icons/io';

export type SvgIconType =
  | 'FaRegUserCircle'
  | 'FaChevronRight'
  | 'FaChevronLeft'
  | 'FaChevronDown'
  | 'FaChevronUp'
  | 'FaUserAlt'
  | 'FaSearch'
  | 'FaGithub'
  | 'FaListUl'
  | 'FaUsers'
  | 'FaPlay'
  | 'FiX'
  | 'AiFillHeart'
  | 'AiFillStar'
  | 'AiOutlineStar'
  | 'BsFillCollectionFill'
  | 'BsFillChatLeftFill'
  | 'BsFillBellFill'
  | 'BsPlusLg'
  | 'BsHouse'
  | 'MdMovie'
  | 'HiMenu'
  | 'HiMail'
  | 'HiLockClosed'
  | 'IoIosJournal';

export interface SvgIconProps extends IconBaseProps {
  iconType: SvgIconType;
}

type SvgIconsType = {
  [key in SvgIconType]: IconType;
};

const icons: SvgIconsType = {
  FaRegUserCircle,
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
  FaUserAlt,
  FaSearch,
  FaGithub,
  FaListUl,
  FaUsers,
  FaPlay,

  FiX,

  AiFillHeart,
  AiFillStar,
  AiOutlineStar,

  BsFillCollectionFill,
  BsFillChatLeftFill,
  BsFillBellFill,
  BsPlusLg,
  BsHouse,

  MdMovie,

  HiMenu,
  HiMail,
  HiLockClosed,

  IoIosJournal,
};

const SvgIcon: React.FC<SvgIconProps> = ({ iconType, size, ...rest }) => {
  const Icon = icons[iconType];
  if (!Icon) {
    return null;
  }

  return <Icon size={size} {...rest} />;
};

export default SvgIcon;
