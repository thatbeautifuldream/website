import { ImageZoom } from "@/components/image-zoom";
import { Mdx } from "@/components/mdx";
import { Section } from "@/components/section";
import { createMetadata } from "@/lib/metadata";
import { allPages } from "content-collections";
import type { Metadata } from "next";

const page = allPages.find((p) => p._meta.fileName === "home.mdx");

if (!page) {
  throw new Error("Home page not found");
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/images/opengraph-image.png`,
});

const GITHUB_AVATAR_URL =
  "https://avatars.githubusercontent.com/u/28717686?v=4";

const HomePage = () => (
  <>
    <Section className="flex items-center gap-4" delay={0.1}>
      <ImageZoom>
        {/** biome-ignore lint/performance/noImgElement: Need to use img element to escape Next.js image optimization */}
        <img
          alt=""
          className="size-10 rounded-full transition-all duration-300 hover:scale-110"
          height={40}
          src={GITHUB_AVATAR_URL}
          width={40}
        />
      </ImageZoom>
      <div>
        <p className="font-medium text-foreground leading-normal">
          Milind Mishra
        </p>
        <p className="text-foreground-lighter text-sm leading-normal">
          Product Engineer, currently at{" "}
          <a href="https://getmerlin.in/chat">Merlin AI</a>.
        </p>
      </div>
    </Section>

    <Section delay={0.2}>
      {/* <GitHubContributions
        className="mt-4"
        months={10}
        username="thatbeautifuldream"
      /> */}
      {/* <GitHubContributionGraph /> */}
      {/* <p className="mt-2.5 text-foreground-lighter text-xs">
        Psssst, can you tell when my deep work sprints were?
      </p> */}
      <ImageZoom>
        {/** biome-ignore lint/performance/noImgElement: Need to use img element to escape Next.js image optimization */}
        <img
          alt=""
          src="/images/banner.webp"
        />
      </ImageZoom>
    </Section>

    <article>
      <Section delay={0.3}>
        <Mdx code={page.body} />
      </Section>
    </article>
  </>
);

export default HomePage;
