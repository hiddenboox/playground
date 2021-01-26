import * as React from "react";

const Editor = React.lazy(() => import("./Editor"));
const Navigation = React.lazy(() => import("navigation/Navigation"));

const App = (): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = () => setOpen(!open);
  return (
    <>
      <button onClick={toggleOpen}>
        {open ? "Close Editor" : "Open editor"}
      </button>
      {open ? (
        <React.Suspense fallback="loading...">
          <Navigation title="Ops">
            <Editor />
          </Navigation>
        </React.Suspense>
      ) : null}
    </>
  );
};

export default App;
