
import { useParams, Navigate } from "react-router-dom";
import { getLanguageFromPath, reverseToolNameMapping } from "@/utils/multilingualRouting";
import { useLocation } from "react-router-dom";
import Index from "./Index";

const ToolPage = () => {
  const { toolId } = useParams();
  const location = useLocation();
  
  // Get the actual tool ID from the URL (could be translated)
  const { toolId: actualToolId } = getLanguageFromPath(location.pathname);
  const finalToolId = actualToolId || toolId;
  
  // List of valid tool IDs for SEO purposes
  const validToolIds = [
    "word-counter", "text-diff", "case-converter", "regex-tester",
    "add-prefix-suffix", "line-break-manager", "find-replace", 
    "remove-duplicate-lines", "remove-empty-lines", "remove-extra-spaces",
    "html-minifier", "html-beautifier", "html-to-markdown", "html-to-jsx",
    "html-previewer", "html-to-plain-text", "html-entity-coder", "html-wysiwyg-editor",
    "url-encoder", "base64-encoder", "jwt-decoder", 
    "date-time-converter", "integer-base-converter", "roman-numeral-converter",
    "base64-string-encoder", "color-converter", "text-to-nato-alphabet",
    "text-to-ascii-binary", "text-to-unicode", "yaml-to-json-converter", "yaml-to-toml",
    "json-to-yaml-converter", "json-to-toml-converter", "list-converter",
    "epoch-converter", "iso-generator", "cron-editor", "timezone-lookup", "json-formatter", "xml-formatter",
    "yaml-converter", "hash-generator", "htpasswd-generator", "strong-password-generator",
    "uuid-generator", "lorem-generator", "fake-data-generator", "color-palette-generator", 
    "html-color-codes", "qr-code-generator", "wifi-qr-generator", 
    "camera-recorder", "painting-drawing-tool", "image-format-converter", "toml-to-json-converter", "toml-to-yaml-converter", "xml-to-json-converter",
    "json-to-xml-converter", "markdown-to-html-converter", "random-phone-generator", "random-email-generator",
    "temperature-converter", "credential-format-detector", "tokenizer", "website-rank-tracker"
  ];

  if (!finalToolId || !validToolIds.includes(finalToolId)) {
    return <Navigate to="/" replace />;
  }

  return <Index />;
};

export default ToolPage;
