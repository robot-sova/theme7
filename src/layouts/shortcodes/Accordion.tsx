import React, { useState } from "react";

const Accordion = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`accordion ${show && "active"} ${className}`}>
      <button className="accordion-header" onClick={() => setShow(!show)}>
        {title}
        <div className="accordion-icon w-[.8em] h-[.8em] relative">
          <div className="w-[2px] h-full absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white opacity-100 accordion-icon-active"></div>
          <div className="w-[2px] h-full absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rotate-90"></div>
        </div>
      </button>
      <div className="accordion-content">{children}</div>
    </div>
  );
};

export default Accordion;
