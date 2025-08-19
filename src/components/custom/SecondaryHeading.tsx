import React from 'react'

interface SecondaryHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SecondaryHeading: React.FC<SecondaryHeadingProps> = ({ children, className }) => {
  return (
    <h2 className={`text-2xl md:text-3xl lg:text-4xl font-medium leading-tight ${className || ''}`}>
      {children}
    </h2>
  )
}

export default SecondaryHeading