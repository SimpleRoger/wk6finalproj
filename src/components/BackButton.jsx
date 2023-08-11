import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';


function BackButton() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  return (
    <button onClick={handleGoBack} class = "back__button">
        <FaArrowLeft /> 
    </button>
  );
}

export default BackButton;
