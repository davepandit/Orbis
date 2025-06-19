import { Spinner } from "flowbite-react";

const SpinnerAnimation = ({ size = "xl", color = "failure" }) => {
  return (
    // the color is set to failure because i want to match ot with the red theme nothing else😅
    <div className="text-center">
      <Spinner
        color={color}
        aria-label="Something is getting cooked"
        size={size}
      />
    </div>
  );
};

export default SpinnerAnimation;
