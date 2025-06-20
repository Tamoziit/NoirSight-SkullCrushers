import {
  MdOutlineVerified,
  MdWarningAmber,
  MdErrorOutline,
} from "react-icons/md";

export const grossAnalysis = [
  {
    color: "text-green-500",
    message: "The Article is <b>Likely Accurate</b>",
  },
  {
    color: "text-yellow-500",
    message: "The Article <b>Might Not be very Accurate</b>",
  },
  {
    color: "text-red-500",
    message: "The Article is <b>Likely Inaccurate</b>",
  },
];

export const flagStyles = {
  consistent: {
    icon: MdOutlineVerified,
    label: "Consistent",
    color: "border-green-500 text-green-500",
  },
  "partially-consistent": {
    icon: MdWarningAmber,
    label: "Partially Consistent",
    color: "border-yellow-500 text-yellow-500",
  },
  inconsistent: {
    icon: MdErrorOutline,
    label: "Inconsistent",
    color: "border-red-500 text-red-500",
  },
};
