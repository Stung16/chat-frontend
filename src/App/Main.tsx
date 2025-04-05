import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import LanguageProvider from '@/contexts/Translation/Translation.provider';
import LoadingProvider from '@/contexts/Loaing/Loading.provider';
import Loading from '@/components/loadings/Loading';
import IndexRouter from '@/router/IndexRouter';
import { JSX } from 'react';
export default function Main(): JSX.Element {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <LoadingProvider>
          <IndexRouter />
          <Loading />
          <Toaster
            richColors
            position={'top-right'}
          />
        </LoadingProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
