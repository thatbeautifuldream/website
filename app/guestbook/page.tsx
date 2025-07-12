import type { Metadata } from 'next';
import { Guestbook } from '@/components/guestbook';

export const metadata: Metadata = {
    title: 'Guestbook',
    description: 'Sign my guestbook and leave a message!',
};

export default function GuestbookPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="mb-8">
                <h1 className='mb-4 font-bold text-3xl tracking-tight'>Guestbook</h1>
                <p className="text-muted-foreground">
                    Leave a message and let me know you were here! Share your thoughts,
                    feedback, or just say hello.
                </p>
            </div>
            <Guestbook />
        </div>
    );
}
