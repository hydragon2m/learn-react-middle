import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTE_PATH } from '@/app/router/route-path';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export function RegisterPage() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">{t('auth.register_title')}</CardTitle>
          <CardDescription>{t('auth.register_subtitle')}</CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <Button asChild variant="outline" className="w-full">
            <Link to={ROUTE_PATH.LOGIN}>{t('auth.back_to_login')}</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
