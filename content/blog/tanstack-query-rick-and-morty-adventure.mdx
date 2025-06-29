---
title: "TanStack Query + Rick and Morty Adventure"
datePublished: Sun Jun 22 2025 17:00:15 GMT+0000 (Coordinated Universal Time)
cuid: cmc7wyfdw000502jzdg567wnl
slug: tanstack-query-rick-and-morty-adventure
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750611573909/e472c2da-0b33-4f12-8d78-a92fceb0528c.png
tags: tanstack-query

---

If you've ever struggled with managing server state in React applications, the **TanStack Query library** (formerly known as React Query) is here to save the day. It revolutionizes data fetching, caching, query invalidation, and so much more. And to make this blog a delightful learning experience, we're using everyone’s favorite multiverse heroes from the **Rick and Morty API** to showcase its mighty powers.

---

#### **Why TanStack Query?**

Managing server state is challenging because server-side data:

* Lives remotely and can change without your knowledge.
    
* Involves asynchronous APIs for fetching, updating, and deleting data.
    
* Risks becoming out-of-date in your app.
    

**TanStack Query** swoops in with robust tools to handle these hurdles while improving performance, simplifying code, and enhancing user experience.

Now, let's Rick-roll (pun intended) through its features with examples straight from the interdimensional Rick and Morty adventure!

---

### **The Magic of** `useQuery`

At the heart of TanStack Query is the `useQuery` hook. This allows you to seamlessly fetch data from REST APIs, like the Rick and Morty API, while handling loading, errors, and caching.

Imagine you want to fetch a list of Rick and Morty characters:fig,a

```typescript
import { useQuery } from '@tanstack/react-query';

function RickAndMortyCharacters() {
  const { data, isPending, isError } = useQuery({
    queryFn: () => fetch("https://rickandmortyapi.com/api/character").then(res => res.json()),
    queryKey: ["characters"]
  });

  if (isPending) return <p>Loading characters...</p>;
  if (isError) return <p>Oh no! There was an error fetching data.</p>;

  return (
    <ul>
      {data.results.map(character => (
        <li key={character.id}>{character.name}</li>
      ))}
    </ul>
  );
}
```

With just a few lines, you've fetched, displayed, and cached the character data—all without manually tracking loading or error states!

---

### **Caching: The Portal That Keeps You Ahead**

One of TanStack Query's standout features is the caching mechanism. Queries store their data locally, saving bandwidth and improving performance. Plus, you can customize cache behavior using the `staleTime` option.

Example: Keep character data fresh for 5 minutes:

```typescript
useQuery({ queryFn: fetchCharacterData, queryKey: ["characters"], staleTime: 300000 });
```

This ensures you won't unnecessarily refetch data within the specified window.

---

### **You Gotta "Invalidate" to Stay Wubba Lubba Dub Dub!**

In Rick's terms: "need accurate data? Invalidate, Morty!" Use `invalidateQueries` to ensure your UI reflects recent changes.

Scenario: After favoriting Rick, invalidate the list of characters:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

const { mutate } = useMutation(favoriteCharacter, {
  onSuccess: () => {
    queryClient.invalidateQueries(["characters"]);
  },
});
```

With this setup, your app will re-fetch the characters list post-mutation. No need to refresh the page manually!

---

### **Mutations: Making Changes Like Evil Morty**

The `useMutation` hook simplifies data-modifying operations. Consider submitting an intergalactic vote:

```typescript
const { mutate, isPending } = useMutation(voteCharacter);

function handleVote(characterId) {
  mutate(characterId);
}
```

In true TanStack fashion, you get cool features like rollback on errors or success notifications for free!

---

### **Prefetching: "Get Schwifty" with a Smoother UX**

Want users to feel like the data was always there? Use `prefetchQuery` to fetch content before they need it.

For example, when a user hovers over a Rick-specific button:

```typescript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

function HoverPrefetch() {
  return (
    <button
      onMouseEnter={() =>
        queryClient.prefetchQuery(['character', rickId], () =>
          fetchCharacterById(rickId)
        )
      }
    >
      Hover to Load Rick
    </button>
  );
}
```

---

### **Dynamic Query Options: Infinite Timelines, Infinite Fun**

Use dynamic query options for server-driven interactions like pagination. If you want to fetch episodes paginated:

```typescript
useQuery({ queryFn: () =>
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`).then(res =>
      res.json()
    ),
    queryKey: ["episodes", page]
);
```

---

### **The Power of Learning**

Mastering **TanStack Query** equips you not only to manage server state with ease but also to build fast, efficient React applications. By leveraging techniques like caching, invalidation, and prefetching, you can craft an unparalleled user experience.

If Morty can do it, so can you. Start your multiverse React Query journey now, and let TanStack Query guide your adventures! 🌀

[**Official TanStack Query Docs**](https://tanstack.com/query/latest/docs/framework/react/overview)  
[**The Rick and Morty API**](https://rickandmortyapi.com/)