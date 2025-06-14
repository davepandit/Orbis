import { Button } from "flowbite-react";

function App() {
  return (
    <>
      <div>hi there dave here </div>
      <Button
        pill
        size="sm"
        className="hover:cursor-pointer active:ring-0 focus:ring-0"
      >
        Click me
      </Button>
    </>
  );
}

export default App;
