
window.ipcRenderer = require('electron').ipcRenderer

class SovereigntyEditor extends React.Component {

  constructor(props) {
    super(props);

    this.model = new Model(this, {
      gameData: null,
      rootPanel: {
        vertical: true,
        children: [
          {
            mode: 'navigation'
          },
          {
            children: [
              {
                mode: 'hierarchy'
              },
              {
                mode: 'scene'
              },
              {
                mode: 'inspector'
              }
            ]
          },
          {
            mode: 'explorer'
          }
        ]
      }
    })

    window.ipcRenderer.on('project-loaded', (e, data) => {
      let { projectDir, gameData } = JSON.parse(data);

      this.setState({
        gameData: gameData
      })
    })
  }

  render() {
    return (
      <div className="component-sovereignty-editor">
        <Panel
          initialMode={this.model.rootPanel.mode}
          children={this.model.rootPanel.children}
          vertical={this.model.rootPanel.vertical} />
      </div>
    )
  }
}
