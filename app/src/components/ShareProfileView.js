import React, {Fragment} from 'react';
import Clipboard from 'react-clipboard.js';

const ShareProfileView = (props) => {
  const {profileData, profileId, profilePicture} = props;

  return (
    <Fragment>
      <div id="main-content">
        <div className="content cont-share" id="content">
          <div className="background dark" style={{backgroundImage: `url(${profilePicture})`}}/>
          <div className="content-header">
            <div className="level-name">Level {profileData.level} {profileData.raceName} {profileData.className}</div>
            <div className="nav-name"><img src="/images/share.svg" alt=""/>SHARE</div>
          </div>
          <div className="share">
            <div className="formus">
              <h2>Copy paste these into forums to easily link to your character:</h2>
              <span>Forums (EpicNPC, OwnedCore, phpBB, vBulletin):</span>
              <p>{`[url=https://www.maskedarmory.com/armory/wow/profile/${profileId}] Anonymous Level
              ${profileData.level} ${profileData.raceName} ${profileData.className} WoW Profile | Masked Armory[/url]`}</p>
              <Clipboard data-clipboard-text={`[url=https://www.maskedarmory.com/armory/wow/profile/${profileId}] Anonymous Level
              ${profileData.level} ${profileData.raceName} ${profileData.className} WoW Profile | Masked Armory[/url]`}>Copy
                Markup</Clipboard>
            </div>
            <div className="link"><span>Direct URL</span>
              <p>{`https://www.maskedarmory.com/armory/wow/profile/${profileId}`}</p>
              <Clipboard data-clipboard-text={`https://www.maskedarmory.com/armory/wow/profile/${profileId}`}>Copy
                Link</Clipboard>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShareProfileView;