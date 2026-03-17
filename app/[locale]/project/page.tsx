import { ProjectGrid } from '@/components/projects';
import { Section } from '@/components/section';
import { PROJECTS } from '@/lib/data/projects';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale } from '@/lib/i18n/config';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

type ProjectPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : 'en';
  const dictionary = getDictionary(resolvedLocale);

  return createMetadata({
    title: dictionary.sections.projectTitle,
    description: dictionary.sections.projectDescription,
    image: '/images/opengraph-image.png',
    locale: resolvedLocale,
  });
};

const ProjectPage = async (_props: ProjectPageProps) => (
  <>
    <Section delay={0.1}>
      <ProjectGrid projects={PROJECTS} />
    </Section>
  </>
);

export default ProjectPage;
