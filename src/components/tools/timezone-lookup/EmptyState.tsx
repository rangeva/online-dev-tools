
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { useI18n } from "@/i18n/context";

const EmptyState = () => {
  const { t } = useI18n();

  return (
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <div className="text-center text-muted-foreground">
          <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>{t('timezone.emptyState')}</p>
          <p className="text-sm mt-1">{t('timezone.emptyStateDetail')}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
