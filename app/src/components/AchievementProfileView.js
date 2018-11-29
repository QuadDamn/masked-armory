import React, {Fragment} from 'react';

const AchievementProfileView = (props) => {
  const {profileData, profilePicture} = props;
  const achievementCounts = profileData.achievementCounts;
  const obtainedAchievements = profileData.obtainedAchievements;
  const totalAchievements = profileData.totalAchievements;
  const totalAchievementsProgressWidth = profileData.totalAchievementsProgressWidth;
  const featsOfStrength = profileData.featsLegacy.feats;
  const legacy = profileData.featsLegacy.legacy;
  const headersToIgnore = ['Legacy', 'Feats of Strength'];

  return (
    <Fragment>
      <div id="main-content">
        <div className="content cont-achievment" id="content">
          <div className="background dark" style={{backgroundImage: `url(${profilePicture})`}}/>
          <div className="content-header">
            <div className="level-name">Level {profileData.level} {profileData.raceName} {profileData.className}</div>
            <div className="nav-name"><img src="/images/achievements.svg" alt=""/>ACHIEVEMENTS</div>
          </div>
          <div className="completed">
            <h2>COMPLETED</h2>
            <div className="row no-gutters">
              <div className="col-md-1 col-0"/>
              <div className="col-md-10 col-12">
                <div className="bar">
                  <div className="strip skyblue" style={{width: `${totalAchievementsProgressWidth}`}}/>
                  <div className="power"><span>{obtainedAchievements}</span> <span>/</span>
                    <span>{totalAchievements}</span></div>
                </div>
              </div>
              <div className="col-md-1 col-0"/>
            </div>
          </div>
          <div className="row no-gutters row-eq-height">
            <div className="col-lg-3 col-md-3 col-sm-2 col-0"/>
            <div className="col-lg-3 col-md-3 col-sm-4 col-6">
              <div className="legacy">
                <div className="legacy-img"><img src="/images/legacy.svg" alt=""/></div>
                <h3>LEGACY</h3>
                <span>{legacy.achievementCount}</span></div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 col-6">
              <div className="legacy">
                <div className="legacy-img"><img src="/images/Feats_of_Strength.svg" alt=""/></div>
                <h3>FEATS OF STRENGTH</h3>
                <span>{featsOfStrength.achievementCount}</span></div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-2 col-0"/>
          </div>
          <section className="row no-gutters achievments">

            {achievementCounts.map((category) => {
              if (!headersToIgnore.includes(category.headerName)) {
                return (
                  <div className="col-md-4 col-sm-6 col-12" key={category.headerName}>
                    <h5>{category.headerName}</h5>
                    <div className="bar">
                      <div className="strip full" style={{width: `${category.progressWidth}`}}/>
                      <div className="power"><span>{category.achievementCount}</span>

                        {(category.headerName !== 'Expansion Features') ? <span>&nbsp;/&nbsp;</span> : ""}

                        <span>{category.achievementTotalCount}</span></div>
                    </div>
                  </div>
                );
              } else {
                return "";
              }
            })}

          </section>
          <div className="row leg no-gutters">
            <div className="col-md-6 col-12">
              <div className="legacy-rect">
                <h1>LEGACY</h1>

                {legacy.achievementDetails.map((ach) => {
                  return (
                    <div className="topic" key={ach.id}>
                      <h4>{ach.title}</h4>
                      <p>{ach.description}</p>
                    </div>
                  )
                })}

              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="legacy-rect">
                <h1>FEATS OF STRENGTH</h1>
                {featsOfStrength.achievementDetails.map((ach) => {
                  return (
                    <div className="topic" key={ach.id}>
                      <h4>{ach.title}</h4>
                      <p>{ach.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AchievementProfileView;