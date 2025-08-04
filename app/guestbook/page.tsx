import type { Metadata } from 'next';
import { Guestbook } from '@/components/guestbook';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';

const title = 'Guestbook';
const description = 'Sign my guestbook and leave a message!';

export const metadata: Metadata = createMetadata({
    title,
    description,
    image: `https://milindmishra.com/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
});

export default function GuestbookPage() {
    return (
        <>
            <Section className="gap-0">
                <h1>{title}</h1>
                <p className="text-foreground-lighter">
                    Leave a message and let me know you were here! Share your thoughts,
                    feedback, or just say hello.
                </p>
            </Section>
            <Section delay={0.2}>
                <Guestbook />
            </Section>
        </>
    );
}
