
# Sovereignty
A Unity-inspired-yet-hackable game engine written in JavaScript. Uses [three.js](https://github.com/mrdoob/three.js/) for graphics and [cannon.js](https://github.com/schteppe/cannon.js) for physics.

*This project is in the very early stages and isn't recommended yet for more than experimentation.*

## Motivation and philosophy
The Unity engine has some great ideas, but is plagued by some significant problems:
- It has an unintuitive and buggy Editor interface
- It's closed-source and unable to be modified beyond basic extensions
- Game data is obscured from the user in difficult-to-work-with formats. Even when serialized to YAML, it's reliant on the Editor to maintain well-formedness (the prevalent use of internal file and object IDs, for example)

That said, it also has some great ideas:
- Scene > GameObject > Component pattern is intuitive, simple, and very flexible
- Everything about a project except custom logic - configuration, scenes, objects - is represented as static data, rather than code
- The Prefab system allows for easy reuse of that static data
- Easy cross-platform builds

This project aims to, as much as possible, solve the issues while maintaining or expanding upon the desirable features.

## General structure
The engine consists of two main pieces - the library and the runner - which are combined with a third piece - your project - to create a standalone game. The runner is optional.

#### 1. The Library
This is the core of the engine (`src/library/`). **You can use only this, if you are building for a web page or if you have a custom target platform/configuration.** It exposes two classes: `Game` and `Component`. Your custom components will extend `Component`. To start the game, you will create a new instance of `Game` and pass it your project data (more details in the "The Project" section below), and then call `game.start()`, optionally specifying an HTML element in which to mount your game.

#### 2. The Runner (optional)
The "runner" (`src/runner/`) exists to make it easier to build standalone desktop apps. Given your project entry point (the place where your project data is exported), it creates an Electron window, loads, and bootstraps your project inside of it. Eventually there may be a separate runner for mobile devices.

#### 3. The Project
This is the part you write. All that Sovereignty cares about is that it's a JavaScript (or JSON) object which contains the things the engine is looking for. Obviously for a real project you'll want to split things up into multiple files and do a build with something like webpack, but you aren't required to.

Here's the base structure:
```javascript
{
  game: { ... },
  scenes: [ ... ],
  prefabs: [ ... ],
  components: [ ... ]
}
```

**That's the whole game.**

- **game**: A single configuration object which sets global properties like title, resolution, FPS, etc.
- **scenes**: The meat of your game, each scene is a distinct, infinite space (think of them as levels) which contains a collection of `GameObject`s.
- **prefabs**: A collection of `GameObject`s that you want to share between scenes, use multiple times, or just store as separate files for organization purposes. Objects inside scenes can extend a prefab, and even override specific aspects of them to create variations.
- **components**: These encompass all of your custom programming (scripting) logic. They are the only things exported from a project that are not static data. Each custom component is a class that extends `Component` and can interact with its object's other components and/or other objects in the scene, via "hooks" (methods), to create custom behavior.

True documentation for these structures is forthcoming. For now, you can look under `example-project/` to see examples of most of what's been implemented.

## Roadmap
#### In progress/planned
- Object lookup
- Audio support
- Particle effects
- Materials/Shaders
- Gamepad support
- Unified Vector and Quaternion (threejs and cannonjs have their own implementations of each...)
- Automatic wireframes for visualizing colliders
- Prefab inheritance
- Making standalone builds
- Documentation, especially for configuration-object data structures
- Full exported TypeScript types for exported classes
- Networking features

#### Moonshot features
- Full editor UI, likely written in React
- Mobile builds using Cordova or something similar

#### Unity features not to expect
- Game console support - Sovereignty relies on JavaScript and WebGL, and it's unlikely game consoles will ever support those for games
- Realtime Global Illumination - This was a feat even for Unity. That said, if three.js ever adds support for it it would be easy to add support to the engine.
