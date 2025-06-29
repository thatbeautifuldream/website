---
title: "Getting ready with Framer Motion for React"
datePublished: Sat Jun 14 2025 21:30:34 GMT+0000 (Coordinated Universal Time)
cuid: cmbwr38qx000002ju9i6qht4r
slug: getting-ready-with-framer-motion-for-react
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749936073099/5aec6bcb-4054-443d-ada8-711f41ac3a3b.png
tags: framer-motion, animations-on-the-web

---

Lets dive into the world of animation in React using [**Motion for React**](https://motion.dev/docs/react-quick-start) (previously Framer Motion). Here are the practical insights, code snippets, and a few lessons learned along the way. If you want your UIs to truly come alive, use framer motion to add those tastefull animations!

## **1\. Getting Started: Animating Your First Component**

The `motion` component is the backbone basically, you wrap any element and it gains superpowers. For example:

```javascript
// Animate a div scaling up
<motion.div animate={{ scale: 2 }} />
```

Changing props triggers graceful animations. By default, Framer Motion uses intuitive transitions, but you can **customize** them.

## **2\. Customizing Transitions: Tween vs Spring**

* **Tween:** Basic, uses bezier curves.
    
    ```javascript
    transition={{ type: "tween", ease: "easeInOut" }}
    ```
    
* **Spring:** Fancier, feels more “alive.” You control stiffness/bounciness and damping/friction:
    
    ```javascript
    transition={{ type: "spring", stiffness: 200, damping: 255 }}
    ```
    
    * **Play with these numbers** to experiment with "bounciness" or how quickly things settle.
        
    * Watch out for “overshooting” (when the animation goes past its target and snaps back). This means you may want to tweak these values!
        
* **Physics gotcha:** With springs, you don’t set a fixed duration. The animation’s end is determined by physical properties, not a time value.
    
    * **Rest Delta**: If set too high, your animation can cut off early! Consider lowering to something like 0.01 for smooth results.
        

## **3\. Initial Animation on Mount**

Framer Motion auto-animates components “in” when they mount:

```javascript
<motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} />
```

If you want to **disable** that (so your component just appears), use:

```javascript
<motion.button initial={false} animate={{ scale: 1 }} />
```

This trick is handy for controlling *exactly* when things animate.

## **4\. Layout Animations: Beyond Simple Transitions**

Framer Motion’s **layout** prop animates changes in size and position, performing “magic” with CSS transforms and JavaScript. Just add:

```javascript
<motion.div layout />
```

* The engine manages complex changes, transforming between shapes or positions as your React tree changes.
    
* Motion’s animation engine uses techniques like [**FLIP** (First-Last-Invert-Play)](https://css-tricks.com/animating-layouts-with-the-flip-technique/) to animate between “before” and “after” states.
    

### **Parent ↔️ Child Sync**

If both a parent and child element use *the same* transition settings, their animations will likely sync up well.

## **5\. Working with Unique layoutId and LayoutGroup**

* **layoutId:** Needed when you want to animate specific elements between different parts of the render tree.
    
    * Make sure it’s **globally unique**! If you render multiple components with the same `layoutId`, their animations will get tangled.
        
    * Use:
        
        ```javascript
        const id = React.useId();
        <motion.div layoutId={id} />
        ```
        
* **LayoutGroup:** Group several components together so layouts and animations interact correctly:jsx
    
    ```javascript
    import { LayoutGroup } from "framer-motion"
    
    <LayoutGroup>{/* motion components */}</LayoutGroup>
    ```
    
    Tells Framer Motion these components are part of the same animation universe.
    

## **6\. Handy Animation Props & Gotchas**

* **Border Radius & Animation:** Sometimes animating `borderRadius` can create visual glitches. A fix is to always add `animate` and set `initial` as false.
    
    ```javascript
    animate={{ borderRadius: 12 }} initial={false}
    
    // same as
    // setting properties to initial itself will achieve the same effect
    initial={{ borderRadius: 12 }}
    ```
    
* **Performance:** Cancelling out (disabling) certain animations can be heavy on the client so use them with care.
    

## **7\. A Few Final Insights**

* Everything in Framer Motion translates into CSS transforms under the hood, providing smooth performance.
    
* You can animate size, position, and even custom styles and transforms.
    
* The official [**Motion for React docs**](https://motion.dev/docs/react-quick-start) are an excellent next read, as they cover advanced topics, gestures, scroll animations, exit animations, and more.
    

## **Conclusion**

Framer Motion opens a new dimension for React animation, striking a balance between usability and expressive power. My main advice: **play with the numbers**, understand the physics, read the docs, and don’t be afraid of a few “gotchas” they help you understand the underlying foundations which comes as an opportunity to learn from the best!