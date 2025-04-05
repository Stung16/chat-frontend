import useLoading from '@/hooks/useLoading';
import { cn } from '@/lib/utils';

function Loading() {
  const { loading } = useLoading();

  return (
    <div
      className={cn(
        'bg-primary fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300',
        loading ? 'visible opacity-30' : 'invisible opacity-0',
      )}
    >
      <div className='border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-white border-l-white' />
    </div>
  );
}

export default Loading;
