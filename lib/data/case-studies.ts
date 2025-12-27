export const CASE_STUDIES = {
  "thine-landing": {
    markdown: `# Building Thine’s Scroll Story: How We Found Our Way to Image Sequences

## This Wasn’t the Plan

When we first imagined Thine’s landing page, we weren’t thinking in terms of frames, chunks, or preload queues.

We were thinking in **feeling**.

We wanted the page to *move with you*.  
Not autoplay. Not hijack attention.  
But respond—almost like Thine itself does.

Scroll → progress → story.

Simple idea. Dangerous execution.

---

## Act I: “What If the Browser Just Played the Video?”

Our earliest experiments were… optimistic.

The most obvious solution felt almost *too clean*:
- Export the animation as a video
- Sync video playback to scroll position
- Let the browser do what it’s good at—rendering video

So we tried exactly that.

We wired scroll progress directly to video currentTime.  
Frame-perfect. Smooth. Magical.

For a moment, it worked.

Then reality showed up.

### The First Cracks

- Scroll felt *sticky* on lower-end devices
- Video decoding lagged behind fast scrolls
- Mobile browsers struggled to keep up
- Safari… did Safari things

Worst of all, the browser was *always waiting*:
waiting to decode,
waiting to seek,
waiting to buffer.

Scroll, pause. Scroll, pause.

That wasn’t Thine.

---

## Act II: “Okay, Let’s Outrun the Browser”

If the browser was struggling to decode frames on demand, we asked a dangerous question:

> “What if it doesn’t have to?”

Instead of letting the browser *render* frames,  
what if we **gave it the frames already rendered**?

So we went bold.

We encoded the video into **individual frames** and rendered them directly on scroll.

No seeking.  
No decoding.  
Just images.

And honestly?

It felt incredible.

Scrolling was instant.  
Frames snapped into place.  
The animation felt glued to your finger.

For a while, we thought we’d cracked it.

---

## Act III: Payload Reality Check

Then we checked the numbers.

600+ frames.
High resolution.
Multiple devices.

The payload was… brutal.

- Initial load ballooned
- Network waterfalls looked scary
- Mobile data usage skyrocketed
- Lighthouse politely but firmly disapproved

We had traded runtime performance for **network pain**.

The animation was smooth—but the cost was unacceptable.

That was the low point.

Not because it didn’t work—but because it worked *too expensively*.

---

## Act IV: Compression, ffmpeg, and Hard Lessons

Instead of abandoning the approach, we leaned into it.

If frames were the right idea, they just needed to be **lighter**.

That’s when ffmpeg entered the picture.

We experimented relentlessly:
- Resolution variants
- Aggressive but perceptually safe compression
- Different export pipelines per device class
- Stripping everything that didn’t contribute to visual fidelity

Each iteration shaved kilobytes.
Then megabytes.
Then *entire seconds* off load time.

But even compressed, one thing became clear:

> Frames alone weren’t the problem.  
> **Loading them all at once was.**

---

## Act V: The Breakthrough — Image Sequences, Not Images

The real shift wasn’t technical—it was conceptual.

We stopped thinking in terms of:
> “600 images”

And started thinking in terms of:
> **“A sequence the user will never see all at once.”**

That changed everything.

### What We Realized

- Users only need **a small window of frames** at any given moment
- The first impression matters more than completeness
- Scroll is sequential—our loading strategy should be too

That’s when image **sequences** became our north star.

---

## Act VI: Chunking, Priorities, and Trusting the Scroll

We rebuilt the pipeline around one idea:

> Load just enough to keep the illusion alive.

### What We Did

- Split frames into **small, ordered chunks**
- Loaded only the **critical opening frames** upfront
- Pipelined the rest quietly in the background
- Let scroll position dictate *what matters next*

The browser stopped panicking.
The network calmed down.
The animation stayed butter-smooth.

And most importantly—the experience finally felt *effortless*.

---

## Why Image Sequences Won (For Us)

By the end of this journey, the benefits were undeniable:

- **Zero decoding cost during scroll**
- **Frame-perfect control**
- **Predictable performance across devices**
- **Graceful degradation on slower networks**
- **Freedom to preload intelligently**

Image sequences didn’t just solve a performance problem.  
They gave us **creative control** back.

---

## What This Taught Us

This wasn’t a straight line.

We didn’t “pick the right solution” upfront.  
We *earned* it through friction.

Some hard-won lessons:
- Browsers are fast—but only when you respect their constraints
- Smoothness is as much about **when** you load as **what** you load
- Performance isn’t a checklist—it’s a dialogue with reality
- Sometimes the right architecture reveals itself only after the wrong ones fail

---

## The Ride Was the Point

Looking back, the final solution feels obvious.

At the time, it absolutely wasn’t.

It took optimism, missteps, profiling sessions, payload audits, compression experiments, and a lot of “wait… why is this janky again?” moments.

But that’s the part we’re proud of.

Because the scroll experience on Thine doesn’t just *look* smooth—

It carries the memory of every problem we had to solve to make it feel that way.

And honestly?

We’d take the ride again.
`,
  },
};
