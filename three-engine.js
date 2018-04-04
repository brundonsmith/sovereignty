/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/*! exports provided: WebGLRenderTargetCube, WebGLRenderTarget, WebGLRenderer, ShaderLib, UniformsLib, UniformsUtils, ShaderChunk, FogExp2, Fog, Scene, Sprite, LOD, SkinnedMesh, Skeleton, Bone, Mesh, LineSegments, LineLoop, Line, Points, Group, VideoTexture, DataTexture, CompressedTexture, CubeTexture, CanvasTexture, DepthTexture, Texture, CompressedTextureLoader, DataTextureLoader, CubeTextureLoader, TextureLoader, ObjectLoader, MaterialLoader, BufferGeometryLoader, DefaultLoadingManager, LoadingManager, JSONLoader, ImageLoader, ImageBitmapLoader, FontLoader, FileLoader, Loader, LoaderUtils, Cache, AudioLoader, SpotLightShadow, SpotLight, PointLight, RectAreaLight, HemisphereLight, DirectionalLightShadow, DirectionalLight, AmbientLight, LightShadow, Light, StereoCamera, PerspectiveCamera, OrthographicCamera, CubeCamera, ArrayCamera, Camera, AudioListener, PositionalAudio, AudioContext, AudioAnalyser, Audio, VectorKeyframeTrack, StringKeyframeTrack, QuaternionKeyframeTrack, NumberKeyframeTrack, ColorKeyframeTrack, BooleanKeyframeTrack, PropertyMixer, PropertyBinding, KeyframeTrack, AnimationUtils, AnimationObjectGroup, AnimationMixer, AnimationClip, Uniform, InstancedBufferGeometry, BufferGeometry, Geometry, InterleavedBufferAttribute, InstancedInterleavedBuffer, InterleavedBuffer, InstancedBufferAttribute, Face3, Object3D, Raycaster, Layers, EventDispatcher, Clock, QuaternionLinearInterpolant, LinearInterpolant, DiscreteInterpolant, CubicInterpolant, Interpolant, Triangle, Math, Spherical, Cylindrical, Plane, Frustum, Sphere, Ray, Matrix4, Matrix3, Box3, Box2, Line3, Euler, Vector4, Vector3, Vector2, Quaternion, Color, ImmediateRenderObject, VertexNormalsHelper, SpotLightHelper, SkeletonHelper, PointLightHelper, RectAreaLightHelper, HemisphereLightHelper, GridHelper, PolarGridHelper, FaceNormalsHelper, DirectionalLightHelper, CameraHelper, BoxHelper, Box3Helper, PlaneHelper, ArrowHelper, AxesHelper, Shape, Path, ShapePath, Font, CurvePath, Curve, ShapeUtils, WebGLUtils, WireframeGeometry, ParametricGeometry, ParametricBufferGeometry, TetrahedronGeometry, TetrahedronBufferGeometry, OctahedronGeometry, OctahedronBufferGeometry, IcosahedronGeometry, IcosahedronBufferGeometry, DodecahedronGeometry, DodecahedronBufferGeometry, PolyhedronGeometry, PolyhedronBufferGeometry, TubeGeometry, TubeBufferGeometry, TorusKnotGeometry, TorusKnotBufferGeometry, TorusGeometry, TorusBufferGeometry, TextGeometry, TextBufferGeometry, SphereGeometry, SphereBufferGeometry, RingGeometry, RingBufferGeometry, PlaneGeometry, PlaneBufferGeometry, LatheGeometry, LatheBufferGeometry, ShapeGeometry, ShapeBufferGeometry, ExtrudeGeometry, ExtrudeBufferGeometry, EdgesGeometry, ConeGeometry, ConeBufferGeometry, CylinderGeometry, CylinderBufferGeometry, CircleGeometry, CircleBufferGeometry, BoxGeometry, BoxBufferGeometry, ShadowMaterial, SpriteMaterial, RawShaderMaterial, ShaderMaterial, PointsMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshToonMaterial, MeshNormalMaterial, MeshLambertMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshBasicMaterial, LineDashedMaterial, LineBasicMaterial, Material, Float64BufferAttribute, Float32BufferAttribute, Uint32BufferAttribute, Int32BufferAttribute, Uint16BufferAttribute, Int16BufferAttribute, Uint8ClampedBufferAttribute, Uint8BufferAttribute, Int8BufferAttribute, BufferAttribute, ArcCurve, CatmullRomCurve3, CubicBezierCurve, CubicBezierCurve3, EllipseCurve, LineCurve, LineCurve3, QuadraticBezierCurve, QuadraticBezierCurve3, SplineCurve, REVISION, MOUSE, CullFaceNone, CullFaceBack, CullFaceFront, CullFaceFrontBack, FrontFaceDirectionCW, FrontFaceDirectionCCW, BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, FrontSide, BackSide, DoubleSide, FlatShading, SmoothShading, NoColors, FaceColors, VertexColors, NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending, AddEquation, SubtractEquation, ReverseSubtractEquation, MinEquation, MaxEquation, ZeroFactor, OneFactor, SrcColorFactor, OneMinusSrcColorFactor, SrcAlphaFactor, OneMinusSrcAlphaFactor, DstAlphaFactor, OneMinusDstAlphaFactor, DstColorFactor, OneMinusDstColorFactor, SrcAlphaSaturateFactor, NeverDepth, AlwaysDepth, LessDepth, LessEqualDepth, EqualDepth, GreaterEqualDepth, GreaterDepth, NotEqualDepth, MultiplyOperation, MixOperation, AddOperation, NoToneMapping, LinearToneMapping, ReinhardToneMapping, Uncharted2ToneMapping, CineonToneMapping, UVMapping, CubeReflectionMapping, CubeRefractionMapping, EquirectangularReflectionMapping, EquirectangularRefractionMapping, SphericalReflectionMapping, CubeUVReflectionMapping, CubeUVRefractionMapping, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, NearestFilter, NearestMipMapNearestFilter, NearestMipMapLinearFilter, LinearFilter, LinearMipMapNearestFilter, LinearMipMapLinearFilter, UnsignedByteType, ByteType, ShortType, UnsignedShortType, IntType, UnsignedIntType, FloatType, HalfFloatType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShort565Type, UnsignedInt248Type, AlphaFormat, RGBFormat, RGBAFormat, LuminanceFormat, LuminanceAlphaFormat, RGBEFormat, DepthFormat, DepthStencilFormat, RGB_S3TC_DXT1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGB_PVRTC_4BPPV1_Format, RGB_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_PVRTC_2BPPV1_Format, RGB_ETC1_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_10x10_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, LoopOnce, LoopRepeat, LoopPingPong, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, ZeroCurvatureEnding, ZeroSlopeEnding, WrapAroundEnding, TrianglesDrawMode, TriangleStripDrawMode, TriangleFanDrawMode, LinearEncoding, sRGBEncoding, GammaEncoding, RGBEEncoding, LogLuvEncoding, RGBM7Encoding, RGBM16Encoding, RGBDEncoding, BasicDepthPacking, RGBADepthPacking, CubeGeometry, Face4, LineStrip, LinePieces, MeshFaceMaterial, MultiMaterial, PointCloud, Particle, ParticleSystem, PointCloudMaterial, ParticleBasicMaterial, ParticleSystemMaterial, Vertex, DynamicBufferAttribute, Int8Attribute, Uint8Attribute, Uint8ClampedAttribute, Int16Attribute, Uint16Attribute, Int32Attribute, Uint32Attribute, Float32Attribute, Float64Attribute, ClosedSplineCurve3, SplineCurve3, Spline, AxisHelper, BoundingBoxHelper, EdgesHelper, WireframeHelper, XHRLoader, BinaryTextureLoader, GeometryUtils, ImageUtils, Projector, CanvasRenderer, SceneUtils, LensFlare */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/***/ }),

/***/ "./src/CameraComponent.ts":
/*!********************************!*\
  !*** ./src/CameraComponent.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\nconst Component_1 = __importDefault(__webpack_require__(/*! ./Component */ \"./src/Component.ts\"));\nclass CameraComponent extends Component_1.default {\n    get threeCamera() {\n        return this.camera;\n    }\n    constructor(config) {\n        super(config);\n        this.camera = new three_1.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\n        this.camera.position.z = 5;\n    }\n}\nexports.default = CameraComponent;\n\n\n//# sourceURL=webpack:///./src/CameraComponent.ts?");

/***/ }),

/***/ "./src/Component.ts":
/*!**************************!*\
  !*** ./src/Component.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Component {\n    constructor(config) {\n    }\n    start(scene) {\n    }\n    update(timeDelta) { }\n}\nexports.default = Component;\n\n\n//# sourceURL=webpack:///./src/Component.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\nconst GameScene_1 = __importDefault(__webpack_require__(/*! ./GameScene */ \"./src/GameScene.ts\"));\nconst GameObject_1 = __importDefault(__webpack_require__(/*! ./GameObject */ \"./src/GameObject.ts\"));\nconst CameraComponent_1 = __importDefault(__webpack_require__(/*! ./CameraComponent */ \"./src/CameraComponent.ts\"));\nconst MeshComponent_1 = __importDefault(__webpack_require__(/*! ./MeshComponent */ \"./src/MeshComponent.ts\"));\nclass Game {\n    constructor(config) {\n        this.activeScene = 0;\n        this.scenes = [];\n        this.renderer = new three_1.WebGLRenderer();\n        this.lastUpdate = Date.now();\n        config.sceneConfigs.forEach(c => this.createScene(c));\n        config.prefabConfigs.forEach(c => Game.prefabs.push(new GameObject_1.default(c)));\n        config.componentTypes.forEach(c => Game.componentTypes.push(c));\n        this.renderer.setSize(window.innerWidth, window.innerHeight);\n        document.body.appendChild(this.renderer.domElement);\n    }\n    createScene(config) {\n        var newScene = new GameScene_1.default(config);\n        this.scenes.push(newScene);\n        return newScene;\n    }\n    start() {\n        var updateLoop = () => {\n            requestAnimationFrame(updateLoop);\n            this.update();\n            this.render();\n        };\n        updateLoop();\n    }\n    update() {\n        this.scenes[this.activeScene].update(Date.now() - this.lastUpdate);\n    }\n    render() {\n        this.scenes[this.activeScene].render(this.renderer);\n    }\n}\nGame.prefabs = [];\nGame.componentTypes = [CameraComponent_1.default, MeshComponent_1.default];\nexports.default = Game;\n\n\n//# sourceURL=webpack:///./src/Game.ts?");

/***/ }),

/***/ "./src/GameObject.ts":
/*!***************************!*\
  !*** ./src/GameObject.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Game_1 = __importDefault(__webpack_require__(/*! ./Game */ \"./src/Game.ts\"));\nconst Component_1 = __importDefault(__webpack_require__(/*! ./Component */ \"./src/Component.ts\"));\nclass GameObject {\n    constructor(config) {\n        this.components = [];\n        Object.entries(config.components).forEach(entry => {\n            var componentConstructor = Game_1.default.componentTypes.find(type => type.name === entry[0] || type.name === entry[0] + 'Component');\n            if (componentConstructor) {\n                this.components.push(new componentConstructor(entry[1]));\n            }\n        });\n        console.log(this.components);\n    }\n    createComponent(config) {\n        var newComponent = new Component_1.default(config);\n        this.components.push(newComponent);\n        return newComponent;\n    }\n    start(scene) {\n        console.log('GameObject.start()');\n        this.components.forEach(component => component.start(scene));\n    }\n    update(timeDelta) {\n        this.components.forEach(component => component.update(timeDelta));\n    }\n    // https://github.com/Microsoft/TypeScript/issues/5236\n    getComponent(type) {\n        return this.components.find(component => component instanceof type);\n    }\n}\nexports.default = GameObject;\n\n\n//# sourceURL=webpack:///./src/GameObject.ts?");

/***/ }),

/***/ "./src/GameScene.ts":
/*!**************************!*\
  !*** ./src/GameScene.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\nconst GameObject_1 = __importDefault(__webpack_require__(/*! ./GameObject */ \"./src/GameObject.ts\"));\nconst CameraComponent_1 = __importDefault(__webpack_require__(/*! ./CameraComponent */ \"./src/CameraComponent.ts\"));\nclass GameScene {\n    constructor(config) {\n        this.threeScene = new three_1.Scene();\n        this.gameObjects = [];\n        console.log('GameScene.constructor()');\n        config.objects.forEach(objectConfig => this.createGameObject(objectConfig));\n    }\n    createGameObject(config) {\n        var newGameObject = new GameObject_1.default(config);\n        newGameObject.start(this.threeScene);\n        this.gameObjects.push(newGameObject);\n        return newGameObject;\n    }\n    update(timeDelta) {\n        this.gameObjects.forEach((gameObject) => {\n            gameObject.update(timeDelta);\n            var cameraComponent = gameObject.getComponent(CameraComponent_1.default);\n            if (cameraComponent) {\n                this.activeCamera = cameraComponent.threeCamera;\n            }\n        });\n    }\n    render(renderer) {\n        if (this.activeCamera) {\n            renderer.render(this.threeScene, this.activeCamera);\n        }\n    }\n}\nexports.default = GameScene;\n\n\n//# sourceURL=webpack:///./src/GameScene.ts?");

/***/ }),

/***/ "./src/MeshComponent.ts":
/*!******************************!*\
  !*** ./src/MeshComponent.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\nconst Component_1 = __importDefault(__webpack_require__(/*! ./Component */ \"./src/Component.ts\"));\nclass MeshComponent extends Component_1.default {\n    constructor(config) {\n        super(config);\n        this.geometry = new three_1.BoxGeometry(1, 1, 1);\n        this.material = new three_1.MeshBasicMaterial({ color: 0x00ff00 });\n        this.mesh = new three_1.Mesh(this.geometry, this.material);\n    }\n    start(scene) {\n        console.log('MeshComponent.start()');\n        if (this.mesh) {\n            scene.add(this.mesh);\n        }\n    }\n}\nexports.default = MeshComponent;\n\n\n//# sourceURL=webpack:///./src/MeshComponent.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\nconst Game_1 = __importDefault(__webpack_require__(/*! ./Game */ \"./src/Game.ts\"));\nvar game;\nelectron_1.ipcRenderer.once('configuration', (event, configuration) => {\n    console.log(configuration);\n    game = new Game_1.default(configuration);\n    game.start();\n});\n/*\nimport { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';\n\nconst scene = new Scene();\nvar camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );\n\nvar renderer = new WebGLRenderer();\nrenderer.setSize( window.innerWidth, window.innerHeight );\ndocument.body.appendChild( renderer.domElement );\n\nvar geometry = new BoxGeometry( 1, 1, 1 );\nvar material = new MeshBasicMaterial( { color: 0x00ff00 } );\nvar cube = new Mesh( geometry, material );\nscene.add( cube );\n\ncamera.position.z = 5;\n\nfunction animate() {\n    requestAnimationFrame( animate );\n  cube.rotation.x += 0.1;\n  cube.rotation.y += 0.1;\n    renderer.render( scene, camera );\n}\nanimate();\n*/\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ })

/******/ });