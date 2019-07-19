
class SpriteController extends SOVEREIGNTY.Component {

  update(timeDelta) {
    if(SOVEREIGNTY.Input.keyDown('ArrowLeft')) {
      this.transform.position.x -= 5 * timeDelta / 1000
    }
    if(SOVEREIGNTY.Input.keyDown('ArrowRight')) {
      this.transform.position.x += 5 * timeDelta / 1000
    }
  }

}
