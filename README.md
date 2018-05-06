
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
The engine consists of two main pieces - the library and the builder - which are combined with a third piece - your project - to create a standalone game. The builder is optional; its purpose is to allow people to assemble projects with nothing but data and code, without having an intimate understanding of the JavaScript ecosystem's build tools like webpack.

#### 1. The Library
This is the core of the engine (`sovereignty-lib/`). **You can use only this, if you are building for a web page or if you have a custom target platform/configuration.** It exposes three classes: `Game`, `Input`, and `Component`. Your custom components will extend `Component`. To start the game, you will create a new instance of `Game` and pass it your project data (more details in the "The Project" section below), and then call `game.start()`, optionally specifying an HTML element in which to mount your game. `Input` is a helper system for writing more loop-friendly input handling code.

Note that, for maximum flexibility, the built version of the library (`sovereignty-lib/index.js`) will globally declare its public classes on the `window` object, in addition to exporting them module-style. This means you can import it as part of a build, or just drop it in a script tag on your HTML page. The builder handles all this, if you're using it.

#### 2. The Builder (optional)
The "builder" (`sovereignty-builder/`) exists to make it easier to build your project, including standalone desktop apps and eventually mobile apps, without knowledge of JavaScript's famously-complicated build tools. Given your project directory, it produces a `build/` directory within it containing various kinds of builds.

The builder can be run from the command line or as a JavaScript function from node.js code. The command line interface takes the following arguments:

- `--projectDir=./foo/bar/` This is the only required argument. It specifies the directory that contains all your project files.
- `--outputDir=./foo-build/` This optionally lets you specify a destination for build output. Defaults to `<projectDir>/build/`.
- `--linux --win32 --windows --darwin --mas --osx --mac --macos --all` A web-ready build is created by default. Each of these options can specify an additional build target; you can mix and match them. `--all` will create builds for every known target.

#### 3. The Project
This is the part you create. Sovereignty will search this directory and all its subdirectories for the following files:

- `Game.json`: A single configuration object which sets global properties like title, resolution, FPS, etc.
- `*.scene.json`: The meat of your game, each scene is a distinct, infinite space (think of them as levels) which contains a collection of `GameObject`s.
- `*.prefab.json`: Each of these represents a `GameObject` that you want to share between scenes, use multiple times, or just store as separate files for organization purposes. Objects inside scenes can extend a prefab, and even override specific aspects of them to create variations.
- `*.material.json`: Each represents a three.js material. Has two properties: `type` which is the type of material (i.e. for `THREE.MeshStandardMaterial` you'd have `"type": "MeshStandard"`), and `parameters` which is the parameter object passed to the material (see the [docs](https://threejs.org/docs/#api/materials/Material) for more details).
- `*.js`: Every `.js` file is assumed to be a Component. These encompass all of your custom programming (scripting) logic. They are the only things in a project that are not static data. Each custom component is a class that extends `Component` and can interact with its object's other components and/or other objects in the scene, via "hooks" (methods), to create custom behavior.

True documentation for these data structures is forthcoming. For now, you can look under `example-project/` to see examples of most of what's been implemented.

## Roadmap
#### In progress/planned
- Audio support
- `.obj` file import
- Post-processing effects
- Gamepad support
- VR support
- Unified Vector and Quaternion strategy (threejs and cannonjs have their own implementations of each...)
- Making standalone builds (they can currently be built but I can't get them to run yet without crashing)
- Documentation, especially for configuration-object data structures
- Full exported TypeScript types for exported classes
- Networking features

#### Moonshot features
- Full editor UI, likely written in React
- Mobile builds using Cordova or something similar

#### Unity features not to expect
- Game console support - Sovereignty relies on JavaScript and WebGL, and it's unlikely game consoles will ever support those for games
- Realtime Global Illumination - This was a feat even for Unity. That said, if three.js ever adds support for it it would be easy to add support to the engine.
