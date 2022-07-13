import { IconType, IconBaseProps } from 'react-icons';

import {
  FaRegUserCircle,
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
  FaPencilAlt,
  FaPlay,
  FaGithub,
  FaSearch,
  FaUserAlt,
  FaListUl,
  FaUsers,
} from 'react-icons/fa';

import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillStar,
  AiOutlineStar,
  AiOutlinePlusCircle,
  AiOutlineCalendar,
  AiOutlineClockCircle,
} from 'react-icons/ai';

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

import { IoEye, IoList, IoEyeOutline } from 'react-icons/io5';

import { CgSpinner } from 'react-icons/cg';

export type SvgIconType =
  | 'FaRegUserCircle'
  | 'FaChevronRight'
  | 'FaChevronLeft'
  | 'FaChevronDown'
  | 'FaChevronUp'
  | 'FaPencilAlt'
  | 'FaUserAlt'
  | 'FaSearch'
  | 'FaGithub'
  | 'FaListUl'
  | 'FaUsers'
  | 'FaPlay'
  | 'FiX'
  | 'AiFillHeart'
  | 'AiFillStar'
  | 'AiOutlineHeart'
  | 'AiOutlineClockCircle'
  | 'AiOutlineStar'
  | 'AiOutlinePlusCircle'
  | 'AiOutlineCalendar'
  | 'BsFillCollectionFill'
  | 'BsFillChatLeftFill'
  | 'BsFillBellFill'
  | 'BsPlusLg'
  | 'BsHouse'
  | 'MdMovie'
  | 'HiMenu'
  | 'HiMail'
  | 'HiLockClosed'
  | 'IoIosJournal'
  | 'IoEye'
  | 'IoList'
  | 'IoEyeOutline'
  | 'CgSpinner';

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
  FaPencilAlt,
  FaUserAlt,
  FaSearch,
  FaGithub,
  FaListUl,
  FaUsers,
  FaPlay,

  FiX,

  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineStar,
  AiOutlinePlusCircle,
  AiOutlineCalendar,
  AiOutlineClockCircle,

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

  IoEye,
  IoList,
  IoEyeOutline,

  CgSpinner,
};

const SvgIcon: React.FC<SvgIconProps> = ({ iconType, size, ...rest }) => {
  const Icon = icons[iconType];
  if (!Icon) {
    return null;
  }

  return <Icon size={size} {...rest} />;
};

export default SvgIcon;
