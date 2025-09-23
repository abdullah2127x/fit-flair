import React from 'react'

interface SecondaryHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SecondaryHeading: React.FC<SecondaryHeadingProps> = ({ children, className }) => {
  return (
    <h2 className={`text-lg md:text-xl lg:text-2xl font-bold leading-tight ${className || ''}`}>
      {children}
    </h2>
  )
}

export default SecondaryHeading