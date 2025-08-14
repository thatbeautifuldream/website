import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

const FONT_REGEX = /src: url\((.+)\) format\('(opentype|truetype)'\)/;

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength).trim()}...`;
};

const loadGoogleFont = async (font: string, text: string, weights: string) => {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weights}&text=${encodeURIComponent(text)}`;

  try {
    const css = await (await fetch(url)).text();
    const resource = css.match(FONT_REGEX);

    if (resource) {
      const response = await fetch(resource[1]);
      if (response.status === 200) {
        return await response.arrayBuffer();
      }
    }
  } catch {
    // Font loading failed, will throw error below
  }

  throw new Error('failed to load font data');
};

export const GET = async (request: NextRequest) => {
  const title = request.nextUrl.searchParams.get('title');
  const description = request.nextUrl.searchParams.get('description');
  const hasOnlyTitle = title && !description;
  const truncatedTitle = title ? truncateText(title, 50) : '';
  const truncatedDescription = description
    ? truncateText(description, 180)
    : '';

  // Combine all text for more efficient font loading
  const allText = `${truncatedTitle}${truncatedDescription}milindmishra.comPersonalBlog&Portfolio`;

  return new ImageResponse(
    <div
      style={{
        background:
          'linear-gradient(135deg, #1e1e2e 0%, #313244 25%, #45475a 50%, #585b70 75%, #6c7086 100%)',
      }}
      tw="flex flex-col justify-between w-full h-full p-16"
    >
      {hasOnlyTitle ? (
        <div tw="flex flex-col w-full max-w-[1000px]">
          <h1
            style={{ fontWeight: 800 }}
            tw="text-[96px] leading-[100px] tracking-tighter m-0 text-[#cdd6f4]"
          >
            {truncatedTitle}
          </h1>
        </div>
      ) : (
        <div tw="flex flex-col w-full max-w-[1000px]">
          <h1
            style={{ fontWeight: 800 }}
            tw="text-[72px] leading-[76px] tracking-tighter m-0 text-[#cdd6f4] mb-8"
          >
            {truncatedTitle}
          </h1>
          {truncatedDescription && (
            <p
              style={{ fontWeight: 400 }}
              tw="text-[38px] leading-[46px] tracking-tight text-[#a6adc8] m-0 max-w-[900px]"
            >
              {truncatedDescription}
            </p>
          )}
        </div>
      )}

      <div tw="flex items-center justify-between w-full">
        <div tw="flex items-center px-8 py-4 bg-[#181825] rounded-full border border-[#313244]">
          <p
            style={{ fontWeight: 500 }}
            tw="text-[32px] leading-[36px] tracking-tight text-[#cdd6f4] m-0"
          >
            milindmishra.com
          </p>
        </div>
        <div
          style={{ fontWeight: 400 }}
          tw="flex items-center text-[#cdd6f4] text-[24px]"
        >
          <p tw="m-0">Personal Blog & Portfolio</p>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: await loadGoogleFont(
            'Geist',
            allText,
            '400;700;800'
          ),
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Geist',
          data: await loadGoogleFont(
            'Geist',
            allText,
            '400;700;800'
          ),
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Geist',
          data: await loadGoogleFont(
            'Geist',
            allText,
            '400;700;800'
          ),
          style: 'normal',
          weight: 800,
        },
      ],
    }
  );
};
