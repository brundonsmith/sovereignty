
class Hierarchy extends React.Component {

  constructor(props) {
    super(props);

    this.model = new Model(this, {
      gameData: null
    })

    window.ipcRenderer.on('project-loaded', (e, data) => {
      let { gameData } = JSON.parse(data);

      gameData.scenes = gameData.scenes.map(scene => Object.assign(JSON.parse(scene.contents), {name: scene.name}));

      this.model.gameData = gameData;
    })
    window.ipcRenderer.on('project-built', (e, arg) => {
      console.log('Built: ' + arg)
      this.model.projectName = arg;
    })
  }

  render() {
    return (
      <div className="component-hierarchy">
        {this.model.gameData ?
          <div className="hierarchy">
            <HierarchyLevel entries={this.model.gameData.scenes} />
          </div>
        : null}
      </div>
    )
  }
}

class HierarchyLevel extends React.Component {

  static get propTypes() {
    return {
      entries: PropTypes.array
    }
  }

  constructor(props) {
    super(props);

    this.model = new Model(this, {
      expandedEntries: []
    })
  }

  render() {
    return (
      <div className="component-hierarchy-level">
        {this.props.entries.map((entry, index) => {
          let children = entry.children || entry.objects;

          return (
            <div className="entry" key={index}>
              <div className="entry-heading">

                {children ?
                  <span className="caret" onClick={() => this.toggleExpand(index)}>
                    {this.model.expandedEntries.includes(index) ? 'v' : '>'}
                  </span>
                : null}

                {entry.name}

              </div>

              {children ?
                <HierarchyLevel entries={children} />
              : null}

            </div>
          )
        })}
      </div>
    )
  }

  toggleExpand(index) {
    if(this.model.expandedEntries.includes(index)) {
      this.model.expandedEntries.splice(this.model.expandedEntries.indexOf(index), 1);
    } else {
      this.model.expandedEntries.push(index);
    }
  }
}
