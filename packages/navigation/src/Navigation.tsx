import * as React from "react";

type NavigationProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
};

const Navigation = ({ title, children }: NavigationProps): JSX.Element => {
  return (
    <nav>
      {title}
      {children}
    </nav>
  );
};

export default Navigation;
