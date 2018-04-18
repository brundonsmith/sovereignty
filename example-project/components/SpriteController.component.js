
class SpriteController extends Component {

  update(timeDelta) {
    if(Input.keyDown('ArrowLeft')) {
      this.transform.position.x -= 5 * timeDelta / 1000
    }
    if(Input.keyDown('ArrowRight')) {
      this.transform.position.x += 5 * timeDelta / 1000
    }
  }

}
