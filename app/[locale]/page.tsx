import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FlippingSubtext } from "@/components/flipping-subtext";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import { Mdx } from "@/components/mdx";
import { ProfileAvatarOrAlbumCover } from "@/components/profile-avatar-or-album-cover";
import { ProfileName } from "@/components/profile-name";
import { Section } from "@/components/section";
import { getLocalizedPage } from "@/lib/i18n/content";
import { isLocale } from "@/lib/i18n/config";
import { createMetadata } from "@/lib/metadata";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: HomePageProps): Promise<Metadata> => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const page = getLocalizedPage("home", locale);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    image: "/images/opengraph-image.png",
    locale,
  });
};

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const page = getLocalizedPage("home", locale);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Section className="flex items-center gap-4" delay={0.1}>
        <ProfileAvatarOrAlbumCover />
        <div>
          <ProfileName />
          <FlippingSubtext />
        </div>
      </Section>

      <Section delay={0.2}>
        <GitHubContributionGraph className="mt-4" />
      </Section>

      <article>
        <Section delay={0.3}>
          <Mdx code={page.body} />
        </Section>
      </article>
    </>
  );
};

export default HomePage;
