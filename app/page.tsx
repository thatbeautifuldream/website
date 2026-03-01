import { allPages } from 'content-collections';
import type { Metadata } from 'next';
import { FlippingSubtext } from '@/components/flipping-subtext';
import { Mdx } from '@/components/mdx';
import { ProfileAvatarOrAlbumCover } from '@/components/profile-avatar-or-album-cover';
import { ProfileName } from '@/components/profile-name';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';

const page = allPages.find((p) => p._meta.fileName === 'home.mdx');

if (!page) {
  throw new Error('Home page not found');
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: '/images/opengraph-image.png',
});

const HomePage = () => (
  <>
    <Section className="flex items-center gap-4" delay={0.1}>
      <ProfileAvatarOrAlbumCover />
      <div>
        <ProfileName />
        <FlippingSubtext />
      </div>
    </Section>

    <article>
      <Section delay={0.2}>
        <Mdx code={page.body} />
      </Section>
    </article>
  </>
);

export default HomePage;
