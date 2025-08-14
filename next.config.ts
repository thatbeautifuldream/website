import { withContentCollections } from "@content-collections/next";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  redirects: async () => {
    return [
      {
        source: "/resume",
        destination: "https://resume.milind.app",
        permanent: true,
      },
      {
        source: "/json",
        destination: "https://json.milind.app",
        permanent: true,
      },
      {
        source: "/notes",
        destination: "https://notes.milind.app",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://linkedin.com/in/mishramilind",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/thatbeautifuldream",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://x.com/milindmishra_",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://instagram.com/thatbeautifuldream",
        permanent: true,
      },
    ];
  },
};

export default withPayload(withContentCollections(nextConfig));
