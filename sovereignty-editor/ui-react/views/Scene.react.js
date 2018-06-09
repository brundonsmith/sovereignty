
class Scene extends React.Component {
  
  get projectEntry() {
    return `file://${this.model.projectDir}/web/index.html`
  }
  
  constructor(props) {
    super(props);
    
    this.model = new Model(this, {
      editorMode: true,
      projectDir: null,
      gameData: null
    });
    
    window.store.addSubscriber((store) => {
      this.model.projectDir = store.projectDir;
    })
    
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('panels-resize', this.handleResize);
  }
  
  render() {
    return (
      <div className="component-scene" ref={(el) => this.rootElement = el}>
        {this.model.editorMode
          ? <iframe
              ref={this.handleIframeRef} />
          : <webview
              src={this.model.projectEntry}
              ref={this.handleWebviewRef} />}
      </div>
    )
  }
  
  handleResize = () => {
    if(this.rootElement) {
      let { width, height } = this.rootElement.getBoundingClientRect();
      this.game.activeScene.activeCamera.aspect = width / height;
  		this.game.activeScene.activeCamera.updateProjectionMatrix();
  		this.game.renderer.setSize(width, height);
    }
  }
  
  handleIframeRef = (el) => {
    console.log('iframe ref:')
    console.log(el)
    this.iframeElement = el;
    
    if(el) {
      el.contentDocument.body.style.margin = '0';
    }
  }
  
  handleWebviewRef = (el) => {
    this.webviewElement = el;
    
    if(el) {
      el.addEventListener('console-message', this.handleWebviewMessage)
    }
  }
  
  handleWebviewMessage = (e) => {
    switch(e.level) {
      case 2:
        console.error(e.message)
        break;
      case 1:
        console.warn(e.message)
        break;
      default:
        console.log(e.message)
    }
  }
}
