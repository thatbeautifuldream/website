import { allPages } from 'content-collections';
import type { Metadata } from 'next';
import { Link } from '@/components/link';
import { Section } from '@/components/section';
import { Timeline } from '@/components/timeline';
import { createMetadata } from '@/lib/metadata';

const page = allPages.find((p) => p._meta.fileName === 'work.mdx');

if (!page) {
  throw new Error('Work page not found');
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/og?title=${encodeURIComponent(page.title)}&description=${encodeURIComponent(page.description)}`,
});

const WorkPage = () => (
  <>
    <Section className="gap-0" delay={0.04}>
      <h1>{page.title}</h1>
      <p className="text-foreground-lighter">{page.description}</p>
    </Section>

    <article className="space-y-8">
      <Section delay={0.1}>
        <h2>
          <span className="mr-2 select-none text-border">##</span>
          Roles
        </h2>
        <p className="text-foreground-lighter text-sm leading-relaxed">
          My professional journey across startups, research, and product
          development.
        </p>
      </Section>

      <Section delay={0.16}>
        <Timeline />
      </Section>

      <Section delay={0.46}>
        <h2>
          <span className="mr-2 select-none text-border">##</span>
          Experience
        </h2>
      </Section>

      <Section delay={0.52}>
        <p className="text-foreground-lighter text-sm leading-relaxed">
          I&apos;m currently a Product Engineer at{' '}
          <Link href="https://getmerlin.in">Merlin AI by Foyer</Link>, where
          I&apos;m driving product engineering initiatives focused on seamless
          AI integration and next-gen chat experiences. I&apos;ve shipped
          features like ChatGPT Imports UI for 10,000+ users, launched
          project-based chat history pages that increased session retention by
          15%, and revamped the Model Selector boosting adoption by 80%.
        </p>
      </Section>

      <Section delay={0.58}>
        <p className="text-foreground-lighter text-sm leading-relaxed">
          Before joining Merlin AI, I was a Software Engineer at{' '}
          <Link href="https://getsaral.com">SARAL - The Influencer OS</Link>,
          where I built core features and internal tools that improved
          efficiency and decision-making for influencer campaigns. I delivered a
          revamped dashboard that reduced onboarding time by 30% and engineered
          multi-select drag-and-drop features that increased ops efficiency by
          40%.
        </p>
      </Section>

      <Section delay={0.64}>
        <p className="text-foreground-lighter text-sm leading-relaxed">
          Prior to that, I was the Founding Product Engineer at{' '}
          <Link href="https://proofofskill.org">Proof-of-Skill Protocol</Link>,
          where I developed UI flows and we launched a decentralized skill
          validation protocol revolutionizing unbiased, transparent candidate
          evaluation for tech hiring. I led MVP development, designed
          voting-based consensus flows for 150+ validators, and built proctored
          assessment workflows that cut time-to-interview by 50%.
        </p>
      </Section>

      <Section delay={0.7}>
        <p className="text-foreground-lighter text-sm leading-relaxed">
          Earlier in my career, I worked as a Research Assistant at{' '}
          <Link href="https://www.nycu.edu.tw/">
            National Yang Ming Chiao Tung University
          </Link>{' '}
          in Taiwan, where I built and optimized indoor positioning system
          interfaces for cutting-edge IoT research. I enhanced UWB positioning
          accuracy from 20cm to under 10cm and enabled 3D real-time
          visualization for production-ready factories and research labs.
        </p>
      </Section>

      <Section delay={0.76}>
        <p className="text-foreground-lighter text-sm leading-relaxed">
          I also spent time as a Software Engineer at{' '}
          <Link href="https://www.locusconnect.com/">Locus Connect</Link> in
          Taiwan, developing core 3D visualization and internal infrastructure
          tools for proprietary IoT positioning solutions. I produced frontends
          for 3D positioning platforms and maintained internal services
          achieving 99.9% uptime.
        </p>
      </Section>

      <Section delay={0.82}>
        <p className="text-foreground-lighter text-sm leading-relaxed">
          I&apos;ve had the pleasure of working with various organizations in
          different capacities - as a UX Designer at{' '}
          <Link href="https://www.ineuron.ai/">iNeuron.ai</Link> where I
          designed intuitive user experiences and managed design systems, and
          as a Technical Writer at{' '}
          <Link href="https://www.plusklass.com/">Plusklass</Link> where I
          authored technical content for learning modules.
        </p>
      </Section>

      <Section delay={0.88}>
        <p className="text-foreground-lighter text-sm leading-relaxed">
          I&apos;ve also been fortunate to work on a freelance basis, delivering
          AI-powered products for hiring and skills validation, building
          recruiter analytics platforms, and engineering AI-powered quiz systems
          with modern tech stacks.
        </p>
      </Section>

      <Section delay={0.94}>
        <p className="text-foreground-lighter text-sm leading-relaxed">
          Including work with Vercel AI SDK, OpenAI APIs, Next.js, React,
          TypeScript, and various cloud infrastructure solutions across multiple
          client projects and open-source contributions.
        </p>
      </Section>
    </article>
  </>
);

export default WorkPage;
