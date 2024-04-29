import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineDarkMode, MdOutlineEmail, MdOutlineLightMode } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosImages, IoIosInformationCircleOutline } from "react-icons/io";

import styled from "styled-components";

export const IconFaRegUserCircle = styled(FaRegUserCircle)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1.5rem;
  color: gray;
`;

export const IconLuUser2 = styled(LuUser2)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1.5rem;
  color: gray;
`;
export const IconOutlineEmail = styled(MdOutlineEmail)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1.5rem;
  color: gray;
`;
export const IconIoKeyOutline = styled(IoKeyOutline)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1.5rem;
  color: gray;
`;
export const IconFaEye = styled(FaEye)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1.5rem;
  color: gray;
  cursor: pointer;
`;
export const IconFaEyeSlash = styled(FaEyeSlash)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1.5rem;
  color: gray;
  cursor: pointer;
`;

export const IconAiOutlineClose = styled(AiOutlineClose)`
  position: absolute;
  top: ${({ $top }) => $top};
  right: ${({ $right }) => $right};
  left: ${({ $left }) => $left};
  transform: ${({ $transform }) => $transform};
  cursor: pointer;
`;

export const IconIoIosImages = styled(IoIosImages)``;

export const IconIoIosInformationCircleOutline = styled(IoIosInformationCircleOutline)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1.5rem;
  color: gray;
  cursor: pointer;
`;

export const IconMdOutlineDarkMode = styled(MdOutlineDarkMode)`
  position: absolute;
  z-index: 10;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
`;
export const IconMdOutlineLightMode = styled(MdOutlineLightMode)`
  position: absolute;
  z-index: 1000;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
`;
