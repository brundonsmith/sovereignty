module.exports = {
  game: require('./Game.json'),
  prefabs: [
    require('./prefabs/Box.json'),
    require('./prefabs/BasicCamera.json'),
    require('./prefabs/Floor.json'),
    require('./prefabs/Terrain.json'),
    require('./prefabs/Sprite.json')
  ],
  scenes: [
    require('./scenes/FallingBox.json'),
    require('./scenes/Sidescrolling.json')
  ],
  components: [
    require('./components/Spin'),
    require('./components/SpriteController')
  ],
}
