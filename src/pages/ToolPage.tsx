
import { useParams, Navigate } from "react-router-dom";
import Index from "./Index";

const ToolPage = () => {
  const { toolId } = useParams();
  
  // List of valid tool IDs for SEO purposes
  const validToolIds = [
    "word-counter", "text-diff", "case-converter", "regex-tester",
    "html-minifier", "html-beautifier", "html-to-markdown", "html-to-jsx",
    "html-previewer", "html-to-plain-text", "html-entity-coder",
    "url-encoder", "base64-encoder", "jwt-decoder", "epoch-converter",
    "iso-generator", "cron-editor", "json-formatter", "xml-formatter",
    "yaml-converter", "hash-generator", "htpasswd-generator", "uuid-generator", 
    "lorem-generator", "fake-data-generator"
  ];

  if (!toolId || !validToolIds.includes(toolId)) {
    return <Navigate to="/" replace />;
  }

  return <Index />;
};

export default ToolPage;
