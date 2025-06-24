
import { useParams, Navigate } from "react-router-dom";
import Index from "./Index";

const CategoryPage = () => {
  const { category } = useParams();
  
  // List of valid categories for SEO purposes
  const validCategories = [
    "text", "html", "encoding", "date", "data", "security", "generators"
  ];

  if (!category || !validCategories.includes(category)) {
    return <Navigate to="/" replace />;
  }

  return <Index />;
};

export default CategoryPage;
