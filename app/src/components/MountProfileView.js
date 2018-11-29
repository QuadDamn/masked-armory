import React, {Component, Fragment} from 'react';

class MountProfileView extends Component {

  getMountLink(mountSpellId) {
    return `https://wowhead.com/?spell=${mountSpellId}`;
  }

  getMountImage(displayId) {
    return `https://render-us.worldofwarcraft.com/npcs/zoom/creature-display-${displayId}.jpg`;
  }

  render() {
    const {profileData, profilePicture} = this.props;
    const mounts = profileData.mounts;

    return (
      <Fragment>
        <div id="main-content">
          <div className="content cont-mounts" id="content">
            <div className="background dark" style={{backgroundImage: `url(${profilePicture})`}}/>
            <div className="content-header">
              <div className="level-name">Level {profileData.level} {profileData.raceName} {profileData.className}</div>
              <div className="nav-name"><img src="/images/mounts.svg" alt=""/>MOUNTS</div>
            </div>
            <div className="row mounts">
              {mounts.map((mount) => {
                return <div className="mount col-md-3 col-sm-4 col-6" key={mount.mountId}>
                  <div className={`mount-image mount-img-quality-${mount.qualityId}`}
                       style={{backgroundImage: `url(${this.getMountImage(mount.displayId)})`}}>
                    <a href={this.getMountLink(mount.spellId)}/>
                  </div>
                  <span>{mount.name}</span>
                </div>
              })};
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MountProfileView;