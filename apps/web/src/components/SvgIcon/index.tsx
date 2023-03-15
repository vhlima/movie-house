import type { IconType, IconBaseProps } from 'react-icons';

import {
  FaTimes,
  FaBars,
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

import { HiMail, HiLockClosed } from 'react-icons/hi';

import { IoIosJournal, IoIosSend } from 'react-icons/io';

import { IoList, IoFilter } from 'react-icons/io5';

import { CgSpinner } from 'react-icons/cg';

import { TbMovie } from 'react-icons/tb';

import { VscPreview } from 'react-icons/vsc';
import clsx from 'clsx';

export type SvgIconType =
  | 'FaTimes'
  | 'FaBars'
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
  | 'HiMail'
  | 'HiLockClosed'
  | 'IoIosJournal'
  | 'IoIosSend'
  | 'IoList'
  | 'IoFilter'
  | 'CgSpinner'
  | 'TbMovie'
  | 'VscPreview';

export interface SvgIconProps extends IconBaseProps {
  iconType: SvgIconType;
}

type SvgIconsType = {
  [key in SvgIconType]: IconType;
};

const icons: SvgIconsType = {
  FaTimes,
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
  FaBars,
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

  HiMail,
  HiLockClosed,

  IoIosJournal,
  IoIosSend,

  IoList,
  IoFilter,

  CgSpinner,

  TbMovie,

  VscPreview,
};

export const SvgIcon: React.FC<SvgIconProps> = ({
  className,
  iconType,
  size,
  ...rest
}) => {
  const Icon = icons[iconType];
  if (!Icon) {
    return null;
  }

  return (
    <Icon
      className={clsx('text-grey-300', className && className)}
      size={size}
      {...rest}
    />
  );
};
