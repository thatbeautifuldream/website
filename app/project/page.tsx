import { ProjectGrid } from '@/components/projects';
import { Section } from '@/components/section';
import { PROJECTS } from '@/lib/data/projects';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const page = {
    title: 'Project',
    description: `A collection of Milind's projects.`,
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: '/images/opengraph-image.png',
});


const ProjectPage = () => (
  <>
    <Section delay={0.1}>
      <ProjectGrid projects={PROJECTS} />
    </Section>
  </>
);

export default ProjectPage;