import React, {Component, Fragment} from 'react';
import DocumentTitle from "react-document-title";

class MainProfileView extends Component {

  /**
   * Build out the item link and the tooltip query params.
   *
   * @param item
   * @returns {string}
   */
  getItemLink(item) {
    let azeritePowers = '';
    let bonusLists = '';
    let ilvl = '&ilvl=' + item.itemLevel;
    let gemsArray = [];
    let gems = '';
    let enchant = '';

    if (item.azeriteEmpoweredItem) {
      azeritePowers = item.azeriteEmpoweredItem.azeritePowers.map((azeritePower) => {
        return azeritePower.id;
      });

      azeritePowers = '&azerite-powers=' + azeritePowers.join(":");
    }

    if (item.bonusLists) {
      bonusLists = '&bonus=' + item.bonusLists.join(":")
    }

    if (item.tooltipParams.enchant) {
      enchant = '&ench=' + item.tooltipParams.enchant;
    }

    if (item.tooltipParams.gem0) {
      gemsArray.push(item.tooltipParams.gem0);
    }

    if (item.tooltipParams.gem1) {
      gemsArray.push(item.tooltipParams.gem1);
    }

    if (item.tooltipParams.gem2) {
      gemsArray.push(item.tooltipParams.gem2);
    }

    if (gemsArray.length > 0) {
      gems = '&gems=' + gemsArray.join(':');
    }

    return `https://www.wowhead.com/item=${item.id}${bonusLists}${azeritePowers}${ilvl}${enchant}${gems}`;
  }

  /**
   * Get the item image URL.
   *
   * @param item
   * @returns {string}
   */
  getItemImage(item) {
    return `https://wow.zamimg.com/images/wow/icons/large/${item.icon}.jpg`
  }

  /**
   * Build out the professions array.
   *
   * @param professions
   * @returns {Array}
   */
  getProfessions(professions) {
    let professionsToRender = [];

    if (professions[0].name.includes("Kul Tiran") === true) {
      professionsToRender.push(professions[0]);
    } else {
      professionsToRender.push({
        max: 150,
        name: `Kul Tiran ${professions[0].name}`,
        rank: 1
      });
    }

    if (professions[1].name.includes("Kul Tiran") === true) {
      professionsToRender.push(professions[1]);
    } else {
      professionsToRender.push({
        max: 150,
        name: `Kul Tiran ${professions[1].name}`,
        rank: 1
      });
    }

    return professionsToRender;
  }

  render() {
    const {profileData, profilePicture} = this.props;
    const professions = this.getProfessions(profileData.professions.primary);

    return (
      <Fragment>
        <div id="main-content">
          <div className="content cont-main" id="content">
            <div className="background" style={{backgroundImage: `url(${profilePicture})`}}/>
            <div className="content-header">
              <div
                className="level-name">Level {profileData.level} {profileData.raceName} {profileData.className}</div>
              <div className="nav-name"><img src="/images/main.svg" alt=""/>MAIN PROFILE</div>
            </div>
            <div className="row no-gutters">
              <div className="left-items-group">
                <div className="item">
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['head']) ? 'text-quality-' + profileData.items['head'].quality : ''}>{(profileData.items['head']) ? profileData.items['head'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['head']) ? profileData.items['head'].itemLevel : ''}</span>
                    </div>
                  </div>
                  <a href={(profileData.items['head']) ? this.getItemLink(profileData.items['head']) : ""}>
                    <div
                      className={(profileData.items['head']) ? 'item-img img-quality-' + profileData.items['head'].quality : 'item-img'}
                      style={{backgroundImage: `url(${(profileData.items['head']) ? this.getItemImage(profileData.items['head']) : '/images/emptyslots/head.gif'})`}}/>
                  </a></div>
                <div className="item">
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['neck']) ? 'text-quality-' + profileData.items['neck'].quality : ''}>{(profileData.items['neck']) ? profileData.items['neck'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['neck']) ? profileData.items['neck'].itemLevel : ''}</span>
                    </div>
                  </div>
                  <a href={(profileData.items['neck']) ? this.getItemLink(profileData.items['neck']) : ""}>
                    <div
                      className={(profileData.items['neck']) ? 'item-img img-quality-' + profileData.items['neck'].quality : 'item-img'}
                      style={{backgroundImage: `url(${(profileData.items['neck']) ? this.getItemImage(profileData.items['neck']) : '/images/emptyslots/neck.gif'})`}}/>
                  </a></div>
                <div className="item">
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['shoulder']) ? 'text-quality-' + profileData.items['shoulder'].quality : ''}>{(profileData.items['shoulder']) ? profileData.items['shoulder'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['shoulder']) ? profileData.items['shoulder'].itemLevel : ''}</span>
                    </div>
                  </div>
                  <a href={(profileData.items['shoulder']) ? this.getItemLink(profileData.items['shoulder']) : ""}>
                    <div
                      className={(profileData.items['shoulder']) ? 'item-img img-quality-' + profileData.items['shoulder'].quality : 'item-img'}
                      style={{backgroundImage: `url(${(profileData.items['shoulder']) ? this.getItemImage(profileData.items['shoulder']) : '/images/emptyslots/shoulder.gif'})`}}/>
                  </a></div>
                <div className="item">
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['back']) ? 'text-quality-' + profileData.items['back'].quality : ''}>{(profileData.items['back']) ? profileData.items['back'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['back']) ? profileData.items['back'].itemLevel : ''}</span>
                    </div>
                  </div>
                  <a href={(profileData.items['back']) ? this.getItemLink(profileData.items['back']) : ""}>
                    <div
                      className={(profileData.items['back']) ? 'item-img img-quality-' + profileData.items['back'].quality : 'item-img'}
                      style={{backgroundImage: `url(${(profileData.items['back']) ? this.getItemImage(profileData.items['back']) : '/images/emptyslots/back.gif'})`}}/>
                  </a></div>
                <div className="item">
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['chest']) ? 'text-quality-' + profileData.items['chest'].quality : ''}>{(profileData.items['chest']) ? profileData.items['chest'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['chest']) ? profileData.items['chest'].itemLevel : ''}</span>
                    </div>
                  </div>
                  <a href={(profileData.items['chest']) ? this.getItemLink(profileData.items['chest']) : ""}>
                    <div
                      className={(profileData.items['chest']) ? 'item-img img-quality-' + profileData.items['chest'].quality : 'item-img'}
                      style={{backgroundImage: `url(${(profileData.items['chest']) ? this.getItemImage(profileData.items['chest']) : '/images/emptyslots/chest.gif'})`}}/>
                  </a></div>
                <div className="item">
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['shirt']) ? 'text-quality-' + profileData.items['shirt'].quality : ''}>{(profileData.items['shirt']) ? profileData.items['shirt'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['shirt']) ? profileData.items['shirt'].itemLevel : ''}</span>
                    </div>
                  </div>
                  <a href={(profileData.items['shirt']) ? this.getItemLink(profileData.items['shirt']) : ""}>
                    <div
                      className={(profileData.items['shirt']) ? 'item-img img-quality-' + profileData.items['shirt'].quality : 'item-img'}
                      style={{backgroundImage: `url(${(profileData.items['shirt']) ? this.getItemImage(profileData.items['shirt']) : '/images/emptyslots/shirt.gif'})`}}/>
                  </a></div>
                <div className="item">
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['tabard']) ? 'text-quality-' + profileData.items['tabard'].quality : ''}>{(profileData.items['tabard']) ? profileData.items['tabard'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['tabard']) ? profileData.items['tabard'].itemLevel : ''}</span>
                    </div>
                  </div>
                  <a href={(profileData.items['tabard']) ? this.getItemLink(profileData.items['tabard']) : ""}>
                    <div
                      className={(profileData.items['tabard']) ? 'item-img img-quality-' + profileData.items['tabard'].quality : 'item-img'}
                      style={{backgroundImage: `url(${(profileData.items['tabard']) ? this.getItemImage(profileData.items['tabard']) : '/images/emptyslots/tabard.gif'})`}}/>
                  </a></div>
                <div className="item">
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['wrist']) ? 'text-quality-' + profileData.items['wrist'].quality : ''}>{(profileData.items['wrist']) ? profileData.items['wrist'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['wrist']) ? profileData.items['wrist'].itemLevel : ''}</span>
                    </div>
                  </div>
                  <a href={(profileData.items['wrist']) ? this.getItemLink(profileData.items['wrist']) : ""}>
                    <div
                      className={(profileData.items['wrist']) ? 'item-img img-quality-' + profileData.items['wrist'].quality : 'item-img'}
                      style={{backgroundImage: `url(${(profileData.items['wrist']) ? this.getItemImage(profileData.items['wrist']) : '/images/emptyslots/wrist.gif'})`}}/>
                  </a></div>
              </div>
              <div className="right-items-group">
                <div className="item"><a
                  href={(profileData.items['hands']) ? this.getItemLink(profileData.items['hands']) : ""}>
                  <div
                    className={(profileData.items['hands']) ? 'item-img img-quality-' + profileData.items['hands'].quality : 'item-img'}
                    style={{backgroundImage: `url(${(profileData.items['hands']) ? this.getItemImage(profileData.items['hands']) : '/images/emptyslots/hands.gif'})`}}/>
                </a>
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['hands']) ? 'text-quality-' + profileData.items['hands'].quality : ''}>{(profileData.items['hands']) ? profileData.items['hands'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['hands']) ? profileData.items['hands'].itemLevel : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="item"><a
                  href={(profileData.items['waist']) ? this.getItemLink(profileData.items['waist']) : ""}>
                  <div
                    className={(profileData.items['waist']) ? 'item-img img-quality-' + profileData.items['waist'].quality : 'item-img'}
                    style={{backgroundImage: `url(${(profileData.items['waist']) ? this.getItemImage(profileData.items['waist']) : '/images/emptyslots/waist.gif'})`}}/>
                </a>
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['waist']) ? 'text-quality-' + profileData.items['waist'].quality : ''}>{(profileData.items['waist']) ? profileData.items['waist'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['waist']) ? profileData.items['waist'].itemLevel : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="item"><a
                  href={(profileData.items['legs']) ? this.getItemLink(profileData.items['legs']) : ""}>
                  <div
                    className={(profileData.items['legs']) ? 'item-img img-quality-' + profileData.items['legs'].quality : 'item-img'}
                    style={{backgroundImage: `url(${(profileData.items['legs']) ? this.getItemImage(profileData.items['legs']) : '/images/emptyslots/legs.gif'})`}}/>
                </a>
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['legs']) ? 'text-quality-' + profileData.items['legs'].quality : ''}>{(profileData.items['legs']) ? profileData.items['legs'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['legs']) ? profileData.items['legs'].itemLevel : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="item"><a
                  href={(profileData.items['feet']) ? this.getItemLink(profileData.items['feet']) : ""}>
                  <div
                    className={(profileData.items['feet']) ? 'item-img img-quality-' + profileData.items['feet'].quality : 'item-img'}
                    style={{backgroundImage: `url(${(profileData.items['feet']) ? this.getItemImage(profileData.items['feet']) : '/images/emptyslots/feet.gif'})`}}/>
                </a>
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['feet']) ? 'text-quality-' + profileData.items['feet'].quality : ''}>{(profileData.items['feet']) ? profileData.items['feet'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['feet']) ? profileData.items['feet'].itemLevel : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="item"><a
                  href={(profileData.items['finger1']) ? this.getItemLink(profileData.items['finger1']) : ""}>
                  <div
                    className={(profileData.items['finger1']) ? 'item-img img-quality-' + profileData.items['finger1'].quality : 'item-img'}
                    style={{backgroundImage: `url(${(profileData.items['finger1']) ? this.getItemImage(profileData.items['finger1']) : '/images/emptyslots/ring.gif'})`}}/>
                </a>
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['finger1']) ? 'text-quality-' + profileData.items['finger1'].quality : ''}>{(profileData.items['finger1']) ? profileData.items['finger1'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['finger1']) ? profileData.items['finger1'].itemLevel : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="item"><a
                  href={(profileData.items['finger2']) ? this.getItemLink(profileData.items['finger2']) : ""}>
                  <div
                    className={(profileData.items['finger2']) ? 'item-img img-quality-' + profileData.items['finger2'].quality : 'item-img'}
                    style={{backgroundImage: `url(${(profileData.items['finger2']) ? this.getItemImage(profileData.items['finger2']) : '/images/emptyslots/ring.gif'})`}}/>
                </a>
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['finger2']) ? 'text-quality-' + profileData.items['finger2'].quality : ''}>{(profileData.items['finger2']) ? profileData.items['finger2'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['finger2']) ? profileData.items['finger2'].itemLevel : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="item"><a
                  href={(profileData.items['trinket1']) ? this.getItemLink(profileData.items['trinket1']) : ""}>
                  <div
                    className={(profileData.items['trinket1']) ? 'item-img img-quality-' + profileData.items['trinket1'].quality : 'item-img'}
                    style={{backgroundImage: `url(${(profileData.items['trinket1']) ? this.getItemImage(profileData.items['trinket1']) : '/images/emptyslots/trinket.gif'})`}}/>
                </a>
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['trinket1']) ? 'text-quality-' + profileData.items['trinket1'].quality : ''}>{(profileData.items['trinket1']) ? profileData.items['trinket1'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['trinket1']) ? profileData.items['trinket1'].itemLevel : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="item"><a
                  href={(profileData.items['trinket2']) ? this.getItemLink(profileData.items['trinket2']) : ""}>
                  <div
                    className={(profileData.items['trinket2']) ? 'item-img img-quality-' + profileData.items['trinket2'].quality : 'item-img'}
                    style={{backgroundImage: `url(${(profileData.items['trinket2']) ? this.getItemImage(profileData.items['trinket2']) : '/images/emptyslots/trinket.gif'})`}}/>
                </a>
                  <div className="item-info d-none d-md-block">
                    <div className="item-name">
                      <h3><span
                        className={(profileData.items['trinket2']) ? 'text-quality-' + profileData.items['trinket2'].quality : ''}>{(profileData.items['trinket2']) ? profileData.items['trinket2'].name : ''}</span>
                      </h3>
                    </div>
                    <div className="item-level">
                      <span>{(profileData.items['trinket2']) ? profileData.items['trinket2'].itemLevel : ''}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="centered-items-group">
              <div className="item left-item">
                <div className="item-info d-none d-md-block">
                  <div className="item-name">
                    <h3><span
                      className={(profileData.items['mainHand']) ? 'text-quality-' + profileData.items['mainHand'].quality : ''}>{(profileData.items['mainHand']) ? profileData.items['mainHand'].name : ''}</span>
                    </h3>
                  </div>
                  <div className="item-level">
                    <span>{(profileData.items['mainHand']) ? profileData.items['mainHand'].itemLevel : ''}</span>
                  </div>
                </div>
                <a href={(profileData.items['mainHand']) ? this.getItemLink(profileData.items['mainHand']) : ""}>
                  <div
                    className={(profileData.items['mainHand']) ? 'item-img img-quality-' + profileData.items['mainHand'].quality : 'item-img'}
                    style={{backgroundImage: `url(${(profileData.items['mainHand']) ? this.getItemImage(profileData.items['mainHand']) : '/images/emptyslots/mainhand.gif'})`}}/>
                </a></div>
              <div className="item right-item"><a
                href={(profileData.items['offHand']) ? this.getItemLink(profileData.items['offHand']) : ""}>
                <div
                  className={(profileData.items['offHand']) ? 'item-img img-quality-' + profileData.items['offHand'].quality : 'item-img'}
                  style={{backgroundImage: `url(${(profileData.items['offHand']) ? this.getItemImage(profileData.items['offHand']) : '/images/emptyslots/secondhand.gif'})`}}/>
              </a>
                <div className="item-info d-none d-md-block">
                  <div className="item-name">
                    <h3><span
                      className={(profileData.items['offHand']) ? 'text-quality-' + profileData.items['offHand'].quality : ''}>{(profileData.items['offHand']) ? profileData.items['offHand'].name : ''}</span>
                    </h3>
                  </div>
                  <div className="item-level">
                    <span>{(profileData.items['offHand']) ? profileData.items['offHand'].itemLevel : ''}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row content-info">
              <div className="col-md-5 col-12">
                <div className="points">
                  <div className="chr-info-details">
                    <h4>TOTAL ACHIEVEMENTS POINTS:</h4>
                    <div className="value">
                      <h5>Achievement Points:</h5>
                      <span>{profileData.achievementPoints}</span></div>
                  </div>
                </div>
                <div className="levels">
                  <div className="chr-info-details">
                    <h4>ITEM LEVELS:</h4>
                    <div className="value">
                      <h5>Item Level (Total):</h5>
                      <span>{profileData.items.averageItemLevel}</span></div>
                    <div className="value">
                      <h5>Item Level (Equipped):</h5>
                      <span>{profileData.items.averageItemLevelEquipped}</span></div>
                  </div>
                </div>
                <div className="professions">
                  <div className="chr-info-details">
                    <h4>PRIMARY PROFESSIONS:</h4>
                    <div className="value">
                      <h5>{professions[0].name}</h5>
                      <span>{professions[0].rank}/{professions[0].max}</span></div>
                    <div className="value">
                      <h5>{professions[1].name}</h5>
                      <span>{professions[1].rank}/{professions[1].max}</span></div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-12">
                <div className="summary">
                  <div className="chr-info-details">
                    <h4>STAT SUMMARY:</h4>
                    <div className="row">
                      <div className="col-6">
                        <h4>Attributes:</h4>
                        <div className="value">
                          <h5>Strength</h5>
                          <span>{profileData.stats.str}</span></div>
                        <div className="value">
                          <h5>Agility</h5>
                          <span>{profileData.stats.agi}</span></div>
                        <div className="value">
                          <h5>Intellect</h5>
                          <span>{profileData.stats.int}</span></div>
                        <div className="value">
                          <h5>Stamina</h5>
                          <span>{profileData.stats.sta}</span></div>
                      </div>
                      <div className="col-6">
                        <h4>Defense:</h4>
                        <div className="value">
                          <h5>Armor</h5>
                          <span>{profileData.stats.armor}</span></div>
                        <div className="value">
                          <h5>Dodge</h5>
                          <span>{Math.round(profileData.stats.dodge)}%</span></div>
                        <div className="value">
                          <h5>Parry</h5>
                          <span>{Math.round(profileData.stats.parry)}%</span></div>
                        <div className="value">
                          <h5>Block</h5>
                          <span>{Math.round(profileData.stats.block)}%</span></div>
                      </div>
                    </div>
                    <div className="row mar-top">
                      <div className="col-6">
                        <h4>Attributes:</h4>
                        <div className="value">
                          <h5>Damage</h5>
                          <span>{Math.round(profileData.stats.mainHandDmgMin)} - {Math.round(profileData.stats.mainHandDmgMax)}</span>
                        </div>
                        <div className="value">
                          <h5>Speed</h5>
                          <span>{Math.round(profileData.stats.mainHandSpeed)}</span></div>
                      </div>
                      <div className="col-6">
                        <h4>Enhancements:</h4>
                        <div className="value">
                          <h5>Crit</h5>
                          <span>{Math.round(profileData.stats.crit)}%</span></div>
                        <div className="value">
                          <h5>Haste</h5>
                          <span>{Math.round(profileData.stats.haste)}%</span></div>
                        <div className="value">
                          <h5>Mastery</h5>
                          <span>{Math.round(profileData.stats.mastery)}%</span></div>
                        <div className="value">
                          <h5>Leech</h5>
                          <span>{Math.round(profileData.stats.leech)}%</span></div>
                        <div className="value">
                          <h5>Versatility</h5>
                          <span>{Math.round(profileData.stats.versatility)}%</span></div>
                        <div className="value">
                          <h5>Avoidance</h5>
                          <span>{Math.round(profileData.stats.avoidanceRating)}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MainProfileView;