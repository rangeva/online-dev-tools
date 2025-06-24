
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";

const SEOBreadcrumbs = () => {
  const { toolId, category } = useParams();

  const toolCategories = [
    { id: "text", name: "Text Tools" },
    { id: "html", name: "HTML Tools" },
    { id: "encoding", name: "Encoding/Decoding" },
    { id: "date", name: "Date & Time" },
    { id: "data", name: "Data & Format" },
    { id: "security", name: "Security" },
    { id: "generators", name: "Generators" },
    { id: "color", name: "Color Tools" }
  ];

  const tools = [
    { id: "word-counter", name: "Word/Character Counter", category: "text" },
    { id: "text-diff", name: "Text Diff Checker", category: "text" },
    { id: "case-converter", name: "Case Converter", category: "text" },
    { id: "regex-tester", name: "Regex Tester", category: "text" },
    { id: "add-prefix-suffix", name: "Add Prefix/Suffix to Lines", category: "text" },
    { id: "line-break-manager", name: "Add/Remove Line Breaks", category: "text" },
    { id: "find-replace", name: "Find and Replace Text", category: "text" },
    { id: "remove-duplicate-lines", name: "Remove Duplicate Lines", category: "text" },
    { id: "remove-empty-lines", name: "Remove Empty Lines", category: "text" },
    { id: "remove-extra-spaces", name: "Remove Extra Spaces", category: "text" },
    { id: "html-minifier", name: "HTML Minifier", category: "html" },
    { id: "html-beautifier", name: "HTML Beautifier", category: "html" },
    { id: "html-to-markdown", name: "HTML to Markdown", category: "html" },
    { id: "html-to-jsx", name: "HTML to JSX", category: "html" },
    { id: "html-previewer", name: "HTML Previewer", category: "html" },
    { id: "html-to-plain-text", name: "HTML to Plain Text", category: "html" },
    { id: "html-entity-coder", name: "HTML Entity Encoder/Decoder", category: "html" },
    { id: "url-encoder", name: "URL Encoder/Decoder", category: "encoding" },
    { id: "base64-encoder", name: "Base64 Encoder/Decoder", category: "encoding" },
    { id: "jwt-decoder", name: "JWT Decoder", category: "encoding" },
    { id: "epoch-converter", name: "Epoch Converter", category: "date" },
    { id: "iso-generator", name: "ISO 8601 Generator", category: "date" },
    { id: "cron-editor", name: "Cron Expression Editor", category: "date" },
    { id: "json-formatter", name: "JSON Formatter & Validator", category: "data" },
    { id: "xml-formatter", name: "XML Formatter", category: "data" },
    { id: "yaml-converter", name: "YAML Converter", category: "data" },
    { id: "hash-generator", name: "Hash Generator", category: "security" },
    { id: "htpasswd-generator", name: "Htpasswd Generator", category: "security" },
    { id: "uuid-generator", name: "UUID Generator", category: "generators" },
    { id: "lorem-generator", name: "Lorem Ipsum Generator", category: "generators" },
    { id: "fake-data-generator", name: "Fake Data Generator", category: "generators" },
    { id: "color-palette-generator", name: "Color Palette Generator", category: "color" },
    { id: "html-color-codes", name: "HTML Color Codes", category: "color" }
  ];

  const currentTool = toolId ? tools.find(tool => tool.id === toolId) : null;
  const currentCategory = category ? toolCategories.find(cat => cat.id === category) : null;

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Developer Toolbox</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {currentCategory && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentCategory.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
        
        {currentTool && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/category/${currentTool.category}`}>
                  {toolCategories.find(cat => cat.id === currentTool.category)?.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentTool.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default SEOBreadcrumbs;
