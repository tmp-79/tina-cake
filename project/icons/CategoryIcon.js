import * as React from "react";

const SvgCategoryIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="CategoryIcon_svg__h-6 CategoryIcon_svg__w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 8h14M5 8a2 2 0 1 1 0-4h14a2 2 0 1 1 0 4M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"
    />
  </svg>
);

export default SvgCategoryIcon;
