import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return <button onClick={handleGoBack}>Go Back</button>;
}

export default BackButton;
