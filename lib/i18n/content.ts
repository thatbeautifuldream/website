import {
  allBlogs,
  allGists,
  allPages,
  allPosts,
  type Blog,
  type Gist,
  type Page,
  type Post,
} from 'content-collections';
import { defaultLocale, type Locale } from './config';

type CollectionEntry = Blog | Gist | Post | Page;

const withLocaleFallback = <T extends CollectionEntry>(
  entries: T[],
  predicate: (entry: T, locale: Locale) => boolean,
  locale: Locale,
) =>
  entries.find((entry) => predicate(entry, locale)) ??
  entries.find((entry) => predicate(entry, defaultLocale));

export const getLocalizedPage = (pageId: string, locale: Locale) =>
  withLocaleFallback(allPages, (page, currentLocale) => {
    return page.locale === currentLocale && page.pageId === pageId;
  }, locale);

export const getLocalizedBlog = (slug: string, locale: Locale) =>
  withLocaleFallback(allBlogs, (blog, currentLocale) => {
    return blog.locale === currentLocale && blog.slug === slug;
  }, locale);

export const getLocalizedPost = (slug: string, locale: Locale) =>
  withLocaleFallback(allPosts, (post, currentLocale) => {
    return post.locale === currentLocale && post.slug === slug;
  }, locale);

export const getLocalizedGist = (slug: string, locale: Locale) =>
  withLocaleFallback(allGists, (gist, currentLocale) => {
    return gist.locale === currentLocale && gist.slug === slug;
  }, locale);

const sortByDateDesc = <T extends { date: Date }>(entries: T[]) =>
  [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());

const uniqueByEntryId = <T extends { entryId: string; locale: string }>(
  entries: T[],
  locale: Locale,
) =>
  Array.from(
    entries.reduce((map, entry) => {
      const existing = map.get(entry.entryId);

      if (!existing || entry.locale === locale) {
        map.set(entry.entryId, entry);
      }

      return map;
    }, new Map<string, T>()).values(),
  );

export const getLocalizedBlogs = (locale: Locale) =>
  uniqueByEntryId(
    sortByDateDesc(
      allBlogs.filter((blog) => blog.locale === locale || blog.locale === defaultLocale),
    ),
    locale,
  );

export const getLocalizedPosts = (locale: Locale) =>
  uniqueByEntryId(
    sortByDateDesc(
      allPosts.filter((post) => post.locale === locale || post.locale === defaultLocale),
    ),
    locale,
  );

export const getLocalizedGists = (locale: Locale) =>
  uniqueByEntryId(
    sortByDateDesc(
      allGists.filter((gist) => gist.locale === locale || gist.locale === defaultLocale),
    ),
    locale,
  );
