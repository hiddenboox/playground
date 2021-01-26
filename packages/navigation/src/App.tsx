import * as React from "react";

const Shell = React.lazy(() => import("shell/Shell"));

export const App = (): JSX.Element => {
  return (
    <React.Suspense fallback="loading...">
      <Shell />
    </React.Suspense>
  );
};
