import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

const FONT_REGEX = /src: url\((.+)\) format\('(opentype|truetype)'\)/;

const loadGoogleFont = async (font: string, text: string, weights: string) => {
    const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weights}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const resource = css.match(FONT_REGEX);

    if (resource) {
        const response = await fetch(resource[1]);
        if (response.status === 200) {
            return await response.arrayBuffer();
        }
    }

    throw new Error('failed to load font data');
};

export const GET = async (request: NextRequest) => {
    const title = request.nextUrl.searchParams.get('title');
    const description = request.nextUrl.searchParams.get('description');

    const avatarSrc = 'https://avatars.githubusercontent.com/u/28717686?v=4';

    return new ImageResponse(
        <div
            style={{
                background: 'linear-gradient(135deg, #1e1e2e 0%, #313244 25%, #45475a 50%, #585b70 75%, #6c7086 100%)',
            }}
            tw="flex flex-col justify-between items-start w-full h-full p-12"
        >

            <div tw="flex flex-col">
                <h1 tw="max-w-[48rem] text-[64px] font-bold leading-[69px] tracking-tighter m-0 text-[#cdd6f4]">
                    {title}
                </h1>
                {description && (
                    <p tw="max-w-[30rem] text-[24px] font-normal leading-[32px] tracking-tight text-[#a6adc8] mt-4 mb-0">
                        {description}
                    </p>
                )}
            </div>

            <div tw="flex items-center">
                {/** biome-ignore lint/performance/noImgElement: avatar image */}
                <img
                    alt="avatar"
                    height={72}
                    src={avatarSrc}
                    tw="overflow-hidden rounded-full"
                    width={72}
                />
                <p tw="max-w-[48rem] text-[64px] font-normal leading-[69px] tracking-tighter ml-4 text-[#cdd6f4]">Milind Mishra</p>
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'Bricolage+Grotesque',
                    data: await loadGoogleFont('Bricolage+Grotesque', title ?? '', '700'),
                    style: 'normal',
                    weight: 700,
                },
                {
                    name: 'Bricolage+Grotesque',
                    data: await loadGoogleFont('Bricolage+Grotesque', description ?? '', '400'),
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    );
};
