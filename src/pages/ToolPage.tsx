
import { useParams, Navigate } from "react-router-dom";
import Index from "./Index";

const ToolPage = () => {
  const { toolId } = useParams();
  
  // List of valid tool IDs for SEO purposes
  const validToolIds = [
    "word-counter", "text-diff", "case-converter", "regex-tester",
    "add-prefix-suffix", "line-break-manager", "find-replace", 
    "remove-duplicate-lines", "remove-empty-lines", "remove-extra-spaces",
    "html-minifier", "html-beautifier", "html-to-markdown", "html-to-jsx",
    "html-previewer", "html-to-plain-text", "html-entity-coder",
    "url-encoder", "base64-encoder", "jwt-decoder", 
    "date-time-converter", "integer-base-converter", "roman-numeral-converter",
    "base64-string-encoder", "color-converter", "text-to-nato-alphabet",
    "epoch-converter", "iso-generator", "cron-editor", "json-formatter", "xml-formatter",
    "yaml-converter", "hash-generator", "htpasswd-generator", "strong-password-generator",
    "uuid-generator", "lorem-generator", "fake-data-generator", "color-palette-generator", 
    "html-color-codes", "qr-code-generator", "wifi-qr-generator", 
    "camera-recorder"
  ];

  if (!toolId || !validToolIds.includes(toolId)) {
    return <Navigate to="/" replace />;
  }

  return <Index />;
};

export default ToolPage;
