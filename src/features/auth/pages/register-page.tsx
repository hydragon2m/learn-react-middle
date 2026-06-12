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
import { CodingAnimation } from '../components/coding-animation';

export function RegisterPage() {
  const { t } = useTranslation();

  return (
    <main className="relative flex flex-1 items-center justify-center p-4 md:p-8 overflow-hidden bg-gradient-to-tr from-slate-50 via-zinc-100 to-indigo-50/50 dark:from-zinc-950 dark:via-slate-900 dark:to-zinc-950 transition-colors duration-300">
      {/* Dynamic light effects/blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Lottie animation placed directly above the card with breathing room */}
        <div className="w-36 h-36 md:w-44 md:h-44 drop-shadow-md select-none pointer-events-none mb-6">
          <CodingAnimation />
        </div>

        <Card className="w-full border border-white/20 dark:border-white/10 shadow-2xl bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl">
          <CardHeader className="text-center space-y-1.5 pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {t('auth.register_title')}
            </CardTitle>
            <CardDescription>{t('auth.register_subtitle')}</CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <Button
              asChild
              variant="outline"
              className="w-full cursor-pointer bg-background/80 backdrop-blur-sm"
            >
              <Link to={ROUTE_PATH.LOGIN}>{t('auth.back_to_login')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
