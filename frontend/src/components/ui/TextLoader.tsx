import { FiLoader } from "react-icons/fi";

const TextLoader = ({ size = 18, color = "text-backe" }) => {
  return (
    <FiLoader className={`inline-block animate-spin ${color}`} size={size} />
  );
};

export default TextLoader;
