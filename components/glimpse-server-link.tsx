import { GlimpseLink } from '@/components/glimpse-link';
import { glimpse } from '@/lib/glimpse';

export async function GlimpseServerLink({ href, children }: { href: string, children: React.ReactNode }) {
    const glimpseData = await glimpse(href);

    if (!glimpseData) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return (
        <GlimpseLink href={href} glimpseData={glimpseData}>
            {children}
        </GlimpseLink>
    );
};

