import type { IconType, IconBaseProps } from 'react-icons';

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
  AiFillEye,
  AiOutlineEye,
  AiFillClockCircle,
} from 'react-icons/ai';

import {
  BsFillChatLeftFill,
  BsPlusLg,
  BsHouse,
  BsFillBellFill,
  BsFillCollectionFill,
  BsFillPinFill,
  BsFlagFill,
} from 'react-icons/bs';

import { MdMovie, MdOutlineSort } from 'react-icons/md';

import { FiX, FiCheck } from 'react-icons/fi';

import { HiMenu, HiMail, HiLockClosed } from 'react-icons/hi';

import { IoIosJournal, IoIosSend } from 'react-icons/io';

import { IoList, IoFilter } from 'react-icons/io5';

import { CgSpinner } from 'react-icons/cg';

import { TbMovie } from 'react-icons/tb';

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
  | 'FiCheck'
  | 'AiFillHeart'
  | 'AiFillStar'
  | 'AiOutlineEye'
  | 'AiFillEye'
  | 'AiOutlineHeart'
  | 'AiOutlineClockCircle'
  | 'AiOutlineStar'
  | 'AiOutlinePlusCircle'
  | 'AiOutlineCalendar'
  | 'AiFillClockCircle'
  | 'BsFillCollectionFill'
  | 'BsFillChatLeftFill'
  | 'BsFlagFill'
  | 'BsFillBellFill'
  | 'BsFillPinFill'
  | 'BsPlusLg'
  | 'BsHouse'
  | 'MdMovie'
  | 'MdOutlineSort'
  | 'HiMenu'
  | 'HiMail'
  | 'HiLockClosed'
  | 'IoIosJournal'
  | 'IoIosSend'
  | 'IoList'
  | 'IoFilter'
  | 'CgSpinner'
  | 'TbMovie';

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
  FiCheck,

  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineStar,
  AiOutlinePlusCircle,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiFillEye,
  AiOutlineEye,
  AiFillClockCircle,

  BsFillCollectionFill,
  BsFillChatLeftFill,
  BsFillBellFill,
  BsFillPinFill,
  BsFlagFill,
  BsPlusLg,
  BsHouse,

  MdMovie,
  MdOutlineSort,

  HiMenu,
  HiMail,
  HiLockClosed,

  IoIosJournal,
  IoIosSend,

  IoList,
  IoFilter,

  CgSpinner,

  TbMovie,
};

const SvgIcon: React.FC<SvgIconProps> = ({ iconType, size, ...rest }) => {
  const Icon = icons[iconType];
  if (!Icon) {
    return null;
  }

  return <Icon size={size} {...rest} />;
};

export default SvgIcon;
