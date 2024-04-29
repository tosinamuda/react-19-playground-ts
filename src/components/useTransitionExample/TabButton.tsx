import { PropsWithChildren } from "react";

type TabButtonProps = PropsWithChildren<{
  isActive: boolean;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}>
const TabButton: React.FC<TabButtonProps> = ({ children, isActive, onClick }) => {
  if (isActive) {
    return <div className='text-blue-600 font-bold'>{children}</div>;
  }
  return (
    <button
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
};
export default TabButton;
