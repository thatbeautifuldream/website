export type TYouTubeVideosResponse = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Array<{
    kind: string;
    etag: string;
    id: {
      kind: string;
      videoId: string;
    };
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          width: number;
          height: number;
        };
        medium: {
          url: string;
          width: number;
          height: number;
        };
        high: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
      liveBroadcastContent: string;
      publishTime: string;
    };
  }>;
};

export const videos: TYouTubeVideosResponse = {
  kind: "youtube#searchListResponse",
  etag: "rkbHOnRCe4ywP87s7okOoHRNNmk",
  nextPageToken: "CBkQAA",
  regionCode: "IN",
  pageInfo: { totalResults: 41, resultsPerPage: 25 },
  items: [
    {
      kind: "youtube#searchResult",
      etag: "P9hc2ARcieYneqnswkopUD9hsCw",
      id: { kind: "youtube#video", videoId: "F0YUxTTNP-E" },
      snippet: {
        publishedAt: "2025-05-30T21:57:01Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "AI on your Terminal | Gemini Bash Script",
        description:
          "Find more about the project here https://github.com/thatbeautifuldream/gemini-ai-bash-script.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/F0YUxTTNP-E/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/F0YUxTTNP-E/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/F0YUxTTNP-E/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2025-05-30T21:57:01Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "AksAGNZqPSP5-_W88nd_IoBvE7U",
      id: { kind: "youtube#video", videoId: "QizAc177RDU" },
      snippet: {
        publishedAt: "2025-05-28T00:46:30Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "React Developer Mock Interview - 3 | LinkedIn Learning (AI Role Play)",
        description:
          "Feedback from LinkedIn Learning AI Role Play * Technical Knowledge: Demonstrated a strong understanding of React concepts, ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/QizAc177RDU/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/QizAc177RDU/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/QizAc177RDU/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2025-05-28T00:46:30Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "4yEt2d9SywL-tR1pWas2fi7PQjg",
      id: { kind: "youtube#video", videoId: "61KPsIB00i0" },
      snippet: {
        publishedAt: "2025-05-26T04:30:04Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "React Developer AI Mock Interview Short",
        description:
          "Watch the entire video at https://www.youtube.com/watch?v=9w5ZOPX_ZDM.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/61KPsIB00i0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/61KPsIB00i0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/61KPsIB00i0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2025-05-26T04:30:04Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "bGQKuy3djvLZPcoIdXQGSRUcx48",
      id: { kind: "youtube#video", videoId: "kijhf9bWy5w" },
      snippet: {
        publishedAt: "2025-05-26T01:15:35Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "React Developer Mock Interview - 2 | LinkedIn Learning (AI Role Play)",
        description:
          "Feedback from LinkedIn Learning AI Role Play * Technical Knowledge: Demonstrated a solid understanding of React ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/kijhf9bWy5w/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/kijhf9bWy5w/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/kijhf9bWy5w/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2025-05-26T01:15:35Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "7XV7UEEGHTlJR9Z4KuDefQt0nfg",
      id: { kind: "youtube#video", videoId: "9w5ZOPX_ZDM" },
      snippet: {
        publishedAt: "2025-05-25T06:11:33Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "React Developer Mock Interview - 1 | LinkedIn Learning (AI Role Play)",
        description:
          "This was a fun experiment of me trying out LinkedIn's AI Role Play Feature. Feedback from LinkedIn Learning Strengths ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/9w5ZOPX_ZDM/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/9w5ZOPX_ZDM/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/9w5ZOPX_ZDM/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2025-05-25T06:11:33Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "t-o58XXJNMUhPrDjDP_UkkEV6U4",
      id: { kind: "youtube#video", videoId: "N_HFmQv_V6o" },
      snippet: {
        publishedAt: "2025-03-09T01:04:50Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "Hands-Free Typing! Voice Input Using Web Speech API 🎙️ (Live Demo &amp; Code)",
        description:
          "I built a quick POC that enables voice input for any text box using the Web Speech API, directly from the browser! I personally used ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/N_HFmQv_V6o/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/N_HFmQv_V6o/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/N_HFmQv_V6o/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2025-03-09T01:04:50Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "6frXHoEZmNoVp4NHpfR-yZIFGig",
      id: { kind: "youtube#video", videoId: "kRqi9MxoK7M" },
      snippet: {
        publishedAt: "2025-02-11T12:01:52Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "Fun Redesign for Developer Portfolio | milindmishra.com",
        description:
          "Included a side by side layout on the desktop with copy and animations on the left and profile card on the right •⁠ ⁠Added a chat ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/kRqi9MxoK7M/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/kRqi9MxoK7M/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/kRqi9MxoK7M/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2025-02-11T12:01:52Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "sm0-mvQPGlgekHvWPlhxl2h5yvM",
      id: { kind: "youtube#video", videoId: "GFtFve-K_V0" },
      snippet: {
        publishedAt: "2024-12-18T15:40:18Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "Proxy to render Github Images on sideprojects.directory",
        description:
          "This is a quick update on my side project, sideprojects.directory Pushed feature fixes for project readme that now supports html ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/GFtFve-K_V0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/GFtFve-K_V0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/GFtFve-K_V0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-12-18T15:40:18Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "EWP5J7Wne5swKOl7azdIK8ZU6po",
      id: { kind: "youtube#video", videoId: "PzDGT3z6c-Y" },
      snippet: {
        publishedAt: "2024-12-16T12:21:44Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "Feature update for Profile and Repository Views @sideprojects.directory",
        description:
          "Quick walkthrough over Profile and Project view feature. I also am a part of Peerlist Project Spotlight this week, Help me win!",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/PzDGT3z6c-Y/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/PzDGT3z6c-Y/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/PzDGT3z6c-Y/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-12-16T12:21:44Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "Z-NxbsVfiFd_y2XJI1FfHrelfi0",
      id: { kind: "youtube#video", videoId: "vQE1zS_TkBA" },
      snippet: {
        publishedAt: "2024-12-14T01:19:31Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "Fun Easter Egg Update on side projects page @ sideprojects.directory",
        description:
          "Quick update on fun feature addition to side projects page https://sideprojects.directory.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/vQE1zS_TkBA/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/vQE1zS_TkBA/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/vQE1zS_TkBA/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-12-14T01:19:31Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "0OOm4sPZdF6XypcW49-k-S4yP_U",
      id: { kind: "youtube#video", videoId: "KRHvdjrD5fE" },
      snippet: {
        publishedAt: "2024-12-13T06:45:48Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "Beta Launch: Showcase Your Side Projects Platform for Developers @sideprojects.directory",
        description:
          "Introducing the beta launch of https://sideprojects.directory, a dedicated space for developers to share and discover incredible ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/KRHvdjrD5fE/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/KRHvdjrD5fE/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/KRHvdjrD5fE/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-12-13T06:45:48Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "yndN_L6oTwCKCkmF9JzyZyN8uTs",
      id: { kind: "youtube#video", videoId: "TFgC73sxorY" },
      snippet: {
        publishedAt: "2024-12-13T06:20:13Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "Full-Stack Real-Time System Monitoring Project with Go, React &amp; Typescript",
        description:
          "In this walkthrough, we explore our System Monitoring project built with Go, TypeScript. Overview of the system that monitors CPU, ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/TFgC73sxorY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/TFgC73sxorY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/TFgC73sxorY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-12-13T06:20:13Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "isuqEWG9_qARe1H9qyokiKZNjIg",
      id: { kind: "youtube#video", videoId: "ZAo1DCuc1Dw" },
      snippet: {
        publishedAt: "2024-12-08T19:55:22Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "Server Sent Events / Event Streaming using Go",
        description:
          "Quick code walkthrough showing a simple event streaming API using Go. What I'm building: A basic server that streams words ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/ZAo1DCuc1Dw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/ZAo1DCuc1Dw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/ZAo1DCuc1Dw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-12-08T19:55:22Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "kZ5JOkylGmASLLib6vNtkuDKjAM",
      id: { kind: "youtube#video", videoId: "0JDhiH-W6CY" },
      snippet: {
        publishedAt: "2024-10-28T08:42:17Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "TODO FIXME Scanner Walkthrough",
        description:
          "todo-fixme-scanner A command-line tool to scan your project for TODO and FIXME comments, helping you keep track of pending ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/0JDhiH-W6CY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/0JDhiH-W6CY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/0JDhiH-W6CY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-10-28T08:42:17Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "l6g14XdHq06XZsDzHS1pgedN3Jg",
      id: { kind: "youtube#video", videoId: "sGjYqXtwa20" },
      snippet: {
        publishedAt: "2024-10-04T20:35:04Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "JSON Viewer now supports input from Search Params!",
        description:
          "JSON Visualizer is a powerful and user-friendly tool designed to make working with JSON data simple and efficient. It allows ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/sGjYqXtwa20/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/sGjYqXtwa20/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/sGjYqXtwa20/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-10-04T20:35:04Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "uR2Hd-Fp6hVkNJ96aOhcM05DU_Q",
      id: { kind: "youtube#video", videoId: "ROT-LdAdq5s" },
      snippet: {
        publishedAt: "2024-10-04T00:48:20Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "JSON Viewer Supports Dark Mode Now",
        description:
          "JSON Visualizer is a powerful and user-friendly tool designed to make working with JSON data simple and efficient. It allows ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/ROT-LdAdq5s/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/ROT-LdAdq5s/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/ROT-LdAdq5s/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-10-04T00:48:20Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "1uNqr-8V7sIC8Es7c3UmgklkJMo",
      id: { kind: "youtube#video", videoId: "r9linZSEmPE" },
      snippet: {
        publishedAt: "2024-09-30T01:16:47Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "JSON Visualizer | See Your JSONs, Simplified.",
        description:
          "JSON Visualizer is a powerful and user-friendly tool designed to make working with JSON data simple and efficient. It allows ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/r9linZSEmPE/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/r9linZSEmPE/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/r9linZSEmPE/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-09-30T01:16:47Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "6ODrz0SZ0VMq18rpmEmoCwGLcEw",
      id: { kind: "youtube#video", videoId: "hdUDVpMYL4w" },
      snippet: {
        publishedAt: "2024-09-26T15:54:48Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "Install Breadcrumbs components in a new Next.js App using shadcn cli",
        description:
          "To install breadcrumbs in a new project : npx shadcn init https://breadcrumbs.milind.live/registry.json To add it in your existing ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/hdUDVpMYL4w/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/hdUDVpMYL4w/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/hdUDVpMYL4w/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-09-26T15:54:48Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "e93HWlPq222yR4NXv5Jwu5XS9D8",
      id: { kind: "youtube#video", videoId: "3ZdkyZswyHA" },
      snippet: {
        publishedAt: "2024-08-12T00:07:56Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "Wchat | App to help you send WhatsApp message without the hassle of saving phone number",
        description:
          "Try it out here https://wchat.makkhanlabs.com We're live on Peerlist Spolight Upvote us! https://peerlist.io/milind/project/wchat.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/3ZdkyZswyHA/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/3ZdkyZswyHA/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/3ZdkyZswyHA/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-08-12T00:07:56Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "pl3ysgaWmW4ylvc3e6jkAaYOVl8",
      id: { kind: "youtube#video", videoId: "zIJtAMGe6v0" },
      snippet: {
        publishedAt: "2024-04-08T04:45:42Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "Locus Connect",
        description:
          "This landing page is made using Next.js, Tailwind CSS, Framer Motion.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/zIJtAMGe6v0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/zIJtAMGe6v0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/zIJtAMGe6v0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-04-08T04:45:42Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "aEPrvGt6Yp0KmHU9XY8NJM-SO_I",
      id: { kind: "youtube#video", videoId: "Uz_vbowRpsA" },
      snippet: {
        publishedAt: "2024-04-08T04:37:38Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "AI Roadmap Generator",
        description:
          "Curate Learning Roadmaps with AI Enter a topic and let the AI generate a roadmap for you https://www.airoadmapgenerator.com ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Uz_vbowRpsA/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Uz_vbowRpsA/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Uz_vbowRpsA/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-04-08T04:37:38Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "uKVzbE0PzHtdVZ2n-587kAYQD_s",
      id: { kind: "youtube#video", videoId: "iWU9-Rjve1c" },
      snippet: {
        publishedAt: "2024-02-12T12:05:55Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "Memories from 🇹🇼",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/iWU9-Rjve1c/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/iWU9-Rjve1c/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/iWU9-Rjve1c/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-02-12T12:05:55Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "RbR8qdvMkI1boTn6LmJrOuacTeg",
      id: { kind: "youtube#video", videoId: "bz3mJneAwQM" },
      snippet: {
        publishedAt: "2024-01-31T07:52:16Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "Download Realtime Updated Resume | Scripting | Bun | TypeScript | Puppeteer",
        description:
          "Here is the respository for the script, uses bun so you need to install it on your system if you dont have it already.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/bz3mJneAwQM/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/bz3mJneAwQM/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/bz3mJneAwQM/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2024-01-31T07:52:16Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "e_AyHNbSQ6Izi5AXpUF7IBxLTA4",
      id: { kind: "youtube#video", videoId: "fElqbiMaVrI" },
      snippet: {
        publishedAt: "2023-08-01T17:37:53Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title:
          "Building React Spinner Component | Loading State with React Spinners",
        description:
          "In this tutorial, we'll create a versatile React Spinner Component using the powerful BeatLoader from the react-spinners library.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/fElqbiMaVrI/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/fElqbiMaVrI/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/fElqbiMaVrI/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2023-08-01T17:37:53Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "Tn1SbxAbRhev1AplMTH3i1HmM3c",
      id: { kind: "youtube#video", videoId: "Wrepir5PI_c" },
      snippet: {
        publishedAt: "2023-07-12T00:32:59Z",
        channelId: "UCMG4BahZvx70a8fsRcczVpA",
        title: "Milind Mishra | Official Introduction | July 2023",
        description:
          "This video is about my introduction and project experience as of 12-07-2023. I have been reaching out to people for job ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Wrepir5PI_c/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Wrepir5PI_c/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Wrepir5PI_c/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Milind Mishra",
        liveBroadcastContent: "none",
        publishTime: "2023-07-12T00:32:59Z",
      },
    },
  ],
};
