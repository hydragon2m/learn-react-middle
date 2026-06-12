import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ROUTE_PATH } from '@/app/router/route-path';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

import { loginApi } from '../api/auth.api';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
import { useAuthStore } from '../stores/auth.store';
import { CodingAnimation } from '../components/coding-animation';

function getLoginErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message;

    if (typeof responseMessage === 'string' && responseMessage.trim()) {
      return responseMessage;
    }
  }

  return fallbackMessage;
}

export function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setAuth({
        user: data.user,
        accessToken: data.accessToken,
      });

      toast.success(t('auth.login_success'));
      navigate(ROUTE_PATH.HOME, { replace: true });
    },
    onError: (error) => {
      toast.error(getLoginErrorMessage(error, t('auth.login_failed')));
    },
  });

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values);
  }

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
              {t('auth.login_title')}
            </CardTitle>
            <CardDescription>{t('auth.login_subtitle')}</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.email')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="email"
                          placeholder={t('auth.email_placeholder')}
                          className="bg-background/80 backdrop-blur-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.password')}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="current-password"
                          placeholder={t('auth.password_placeholder')}
                          className="bg-background/80 backdrop-blur-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full cursor-pointer mt-2"
                  type="submit"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending && <Loader2 className="size-4 animate-spin" />}
                  {loginMutation.isPending ? t('auth.logging_in') : t('auth.login')}
                </Button>
              </form>
            </Form>

            <div className="mt-6 border-t pt-4 text-center text-sm text-muted-foreground border-border/20">
              {t('auth.no_account')}{' '}
              <Link
                to={ROUTE_PATH.REGISTER}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {t('auth.register')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
