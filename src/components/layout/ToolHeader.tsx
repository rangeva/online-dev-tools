
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/i18n/context";
import { tools } from "@/data/toolsData";

interface ToolHeaderProps {
  toolId: string;
}

const ToolHeader = ({ toolId }: ToolHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const selectedTool = tools.find(tool => tool.id === toolId);

  if (!selectedTool) return null;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="border-slate-200 dark:border-slate-700"
        >
          {t('nav.backToTools')}
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center space-x-2">
          <selectedTool.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {selectedTool.name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ToolHeader;
