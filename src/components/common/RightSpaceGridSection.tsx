import React from "react";

interface RightSpaceGridSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const RightSpaceGridSection: React.FC<RightSpaceGridSectionProps> = ({
  children,
  className = "",
  id,
}) => {
  return (
    <section
      className={`relative pr-6 pl-6 sm:pr-4 sm:pl-0 lg:pl-0 lg:pr-8 xl:pl-0 xl:pr-0  ${className}`}
      id={id}
    >
      <div
        className="
        grid
        grid-cols-[1fr_minmax(auto,theme(maxWidth.full))_1fr]
        sm:grid-cols-[1fr_minmax(auto,var(--container-2xl))_1fr]
        md:grid-cols-[1fr_minmax(auto,var(--container-3xl))_1fr]
        lg:grid-cols-[1fr_minmax(auto,var(--container-5xl))_1fr]
        xl:grid-cols-[1fr_minmax(auto,var(--container-7xl))_1fr]
        mx-auto px-0 md:pl-0 md:pr-4 lg:pr-8 lg:pl-0 xl:pr-0 xl:pl-0"
      >
        <div className="col-span-2">{children}</div>
      </div>
    </section>
  );
};

export default RightSpaceGridSection;
