
const possibleModes = [
  'navigation',
  'explorer',
  'hierarchy',
  'scene',
  'inspector'
]

class Panel extends React.Component {

  static get propTypes() {
    return {
      initialMode: PropTypes.string,
      children: PropTypes.array,
      vertical: PropTypes.bool,
      index: PropTypes.number
    }
  }

  static get defaultProps() {
    return {
      children: []
    }
  }

  constructor(props) {
    super(props);

    this.model = new Model(this, {
      size: 200,
      resizing: false,
      mode: props.initialMode
    })
  }

  render() {
    return (
      <div className={`component-panel index-${this.props.index} ${this.props.vertical ? 'vertical' : 'horizontal'} ${this.props.children.length > 0 ? 'has-children' : ''}`} style={{ flexBasis: this.model.size }}>

        {this.props.index > 1 ?
          <div className="resize-bar" onMouseDown={this.handleResizeMouseDown} />
        : null}

        <div className="contents">

          {this.props.children.length === 0 ?
            <select value={this.model.mode} onChange={(e) => this.model.mode = e.target.value}>
              {possibleModes.map(mode =>
                <option
                  value={mode}
                  label={mode}
                  key={mode} />
              )}
            </select>
          : null}

          { this.model.mode === 'scene' ?
            <Scene />
          : this.model.mode === 'hierarchy' ?
            <Hierarchy />
          : null}

          {this.props.children.map((child, index) =>
            <Panel
              initialMode={child.mode}
              children={child.children}
              vertical={!this.props.vertical}
              index={index}
              key={index} />
          )}

        </div>

        {this.props.index === 0 ?
          <div className="resize-bar" onMouseDown={this.handleResizeMouseDown} />
        : null}

      </div>
    )
  }

  handleResizeMouseDown = (e) => {
    this.model.resizing = true;
    window.addEventListener('mousemove', this.handleWindowMouseMove);
    window.addEventListener('mouseup', this.handleWindowMouseUp);
  }

  handleWindowMouseMove = (e) => {
    if(this.model.resizing) {
      if(this.props.vertical) {
        if(this.props.index === 0) {
          this.model.size += e.movementX;
        } else {
          this.model.size -= e.movementX;
        }
      } else {
        if(this.props.index === 0) {
          this.model.size += e.movementY;
        } else {
          this.model.size -= e.movementY;
        }
      }

      window.dispatchEvent(new Event('panels-resize'))
    }
  }

  handleWindowMouseUp = (e) => {
    this.model.resizing = false;
    window.removeEventListener('mousemove', this.handleWindowMouseMove);
    window.removeEventListener('mouseup', this.handleWindowMouseUp);
  }
}
