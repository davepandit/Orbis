import { Button } from "flowbite-react";

const ModifiedButton = ({ text, size }) => {
  return (
    <Button
      pill
      size={size}
      className="hover:cursor-pointer active:ring-0 focus:ring-0"
    >
      {text}
    </Button>
  );
};

export default ModifiedButton;
