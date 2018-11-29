import React, {Fragment} from 'react';

const ReputationProfileView = (props) => {
  const {profileData, profilePicture} = props;
  const reputations = profileData.reputation;

  return (
    <Fragment>
      <div id="main-content">
        <div className="content cont-reputation" id="content">
          <div className="background dark" style={{backgroundImage: `url(${profilePicture})`}}/>
          <div className="content-header">
            <div className="level-name">Level {profileData.level} {profileData.raceName} {profileData.className}</div>
            <div className="nav-name"><img src="/images/reputations.svg" alt=""/>REPUTATIONS</div>
          </div>
          <section className="row no-gutters sec-reput">
            <h1>BATTLE FOR AZEROTH</h1>

            {reputations.map((reputation) => {
              if (reputation.bfaRep === true && reputation.standingName !== 'Hated') {
                return (
                  <div className="row no-gutters" key={reputation.id}>
                    <div className="bar-name col-3"><span>{reputation.name}</span></div>
                    <div className="col-md-6 col-sm-7 col-7">
                      <div className="bar">
                        <div className={`strip ${reputation.standingNameLower}`}
                             style={{width: `${reputation.progressWidth}`}}/>
                        {(reputation.standingName !== 'Exalted') ?
                          <div className="power"><span>{reputation.value}</span> <span>/</span>
                            <span>{reputation.max}</span></div> : <div/>}
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-2 col-2"><span
                      className={`${reputation.standingNameLower}`}>{reputation.standingName}</span></div>
                  </div>
                );
              } else {
                return "";
              }
            })}
          </section>
          <section className="row no-gutters sec-reput">
            <h1>PRIOR EXPANSIONS</h1>

            {reputations.map((reputation) => {
              if (("bfaRep" in reputation) === false && reputation.standingName !== 'Hated') {
                return (
                  <div className="row no-gutters" key={reputation.id}>
                    <div className="bar-name col-3"><span>{reputation.name}</span></div>
                    <div className="col-md-6 col-sm-7 col-7">
                      <div className="bar">
                        <div className={`strip ${reputation.standingNameLower}`}
                             style={{width: `${reputation.progressWidth}`}}/>
                        {(reputation.standingName !== 'Exalted') ?
                          <div className="power"><span>{reputation.value}</span> <span>/</span>
                            <span>{reputation.max}</span></div> : <div/>}
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-2 col-2"><span
                      className={`${reputation.standingNameLower}`}>{reputation.standingName}</span></div>
                  </div>
                );
              } else {
                return "";
              }
            })}

          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default ReputationProfileView;