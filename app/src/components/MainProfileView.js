import React, {Component, Fragment} from 'react';


class MainProfileView extends Component {

    getItemLink(item) {
        let azeritePowers = '';
        let bonusLists = '';
        let ilvl = '&ilvl=' + item.itemLevel;

        console.log(item);

        if (item.azeriteEmpoweredItem) {
            azeritePowers = item.azeriteEmpoweredItem.azeritePowers.map((azeritePower) => {
               return azeritePower.id;
            });

            azeritePowers = '&azerite-powers=' + azeritePowers.join(":");
        }

        if (item.bonusLists) {
            bonusLists = '&bonus=' + item.bonusLists.join(":")
        }

        return `https://www.wowhead.com/item=${item.id}${bonusLists}${azeritePowers}${ilvl}`;
    }

    getItemImage(item) {
        return `https://wow.zamimg.com/images/wow/icons/large/${item.icon}.jpg`
    }

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
        const {profileData} = this.props;
        const professions = this.getProfessions(profileData.professions.primary);

        return (
            <Fragment>
                <div id="main-content">
                    <div className="content cont-main" id="content">
                        <div className="background"/>
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
                                            <h3>{(profileData.items['head']) ? profileData.items['head'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['head']) ? profileData.items['head'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                    <a href={(profileData.items['head']) ? this.getItemLink(profileData.items['head']) : ""}>
                                        <div className="item-img"
                                             style={{backgroundImage: `url(${(profileData.items['head']) ? this.getItemImage(profileData.items['head']) : '/images/emptyslots/head.gif'})`}}/>
                                    </a></div>
                                <div className="item">
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['neck']) ? profileData.items['neck'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['neck']) ? profileData.items['neck'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                    <a href={(profileData.items['neck']) ? this.getItemLink(profileData.items['neck']) : ""}>
                                        <div className="item-img"
                                             style={{backgroundImage: `url(${(profileData.items['neck']) ? this.getItemImage(profileData.items['neck']) : '/images/emptyslots/neck.gif'})`}}/>
                                    </a></div>
                                <div className="item">
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['shoulder']) ? profileData.items['shoulder'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['shoulder']) ? profileData.items['shoulder'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                    <a href={(profileData.items['shoulder']) ? this.getItemLink(profileData.items['shoulder']) : ""}>
                                        <div className="item-img"
                                             style={{backgroundImage: `url(${(profileData.items['shoulder']) ? this.getItemImage(profileData.items['shoulder']) : '/images/emptyslots/shoulder.gif'})`}}/>
                                    </a></div>
                                <div className="item">
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['head']) ? profileData.items['back'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['back']) ? profileData.items['back'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                    <a href={(profileData.items['back']) ? this.getItemLink(profileData.items['back']) : ""}>
                                        <div className="item-img"
                                             style={{backgroundImage: `url(${(profileData.items['back']) ? this.getItemImage(profileData.items['back']) : '/images/emptyslots/back.gif'})`}}/>
                                    </a></div>
                                <div className="item">
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['chest']) ? profileData.items['chest'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['chest']) ? profileData.items['chest'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                    <a href={(profileData.items['chest']) ? this.getItemLink(profileData.items['chest']) : ""}>
                                        <div className="item-img"
                                             style={{backgroundImage: `url(${(profileData.items['chest']) ? this.getItemImage(profileData.items['chest']) : '/images/emptyslots/chest.gif'})`}}/>
                                    </a></div>
                                <div className="item">
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['shirt']) ? profileData.items['shirt'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['shirt']) ? profileData.items['shirt'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                    <a href={(profileData.items['shirt']) ? this.getItemLink(profileData.items['shirt']) : ""}>
                                        <div className="item-img"
                                             style={{backgroundImage: `url(${(profileData.items['shirt']) ? this.getItemImage(profileData.items['shirt']) : '/images/emptyslots/shirt.gif'})`}}/>
                                    </a></div>
                                <div className="item">
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['tabard']) ? profileData.items['tabard'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['tabard']) ? profileData.items['tabard'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                    <a href={(profileData.items['tabard']) ? this.getItemLink(profileData.items['tabard']) : ""}>
                                        <div className="item-img"
                                             style={{backgroundImage: `url(${(profileData.items['tabard']) ? this.getItemImage(profileData.items['tabard']) : '/images/emptyslots/tabard.gif'})`}}/>
                                    </a></div>
                                <div className="item">
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['wrist']) ? profileData.items['wrist'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['wrist']) ? profileData.items['wrist'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                    <a href={(profileData.items['wrist']) ? this.getItemLink(profileData.items['wrist']) : ""}>
                                        <div className="item-img"
                                             style={{backgroundImage: `url(${(profileData.items['wrist']) ? this.getItemImage(profileData.items['wrist']) : '/images/emptyslots/wrist.gif'})`}}/>
                                    </a></div>
                            </div>
                            <div className="right-items-group">
                                <div className="item"><a href="#">
                                    <div className="item-img"
                                         style={{backgroundImage: `url(${(profileData.items['hands']) ? this.getItemImage(profileData.items['hands']) : '/images/emptyslots/hands.gif'})`}}/>
                                </a>
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['hands']) ? profileData.items['hands'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['hands']) ? profileData.items['hands'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item"><a href="#">
                                    <div className="item-img"
                                         style={{backgroundImage: `url(${(profileData.items['waist']) ? this.getItemImage(profileData.items['waist']) : '/images/emptyslots/waist.gif'})`}}/>
                                </a>
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['waist']) ? profileData.items['waist'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['waist']) ? profileData.items['waist'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item"><a href="#">
                                    <div className="item-img"
                                         style={{backgroundImage: `url(${(profileData.items['legs']) ? this.getItemImage(profileData.items['legs']) : '/images/emptyslots/legs.gif'})`}}/>
                                </a>
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['legs']) ? profileData.items['legs'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['legs']) ? profileData.items['legs'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item"><a href="#">
                                    <div className="item-img"
                                         style={{backgroundImage: `url(${(profileData.items['feet']) ? this.getItemImage(profileData.items['feet']) : '/images/emptyslots/feet.gif'})`}}/>
                                </a>
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['feet']) ? profileData.items['feet'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['feet']) ? profileData.items['feet'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item"><a href="#">
                                    <div className="item-img"
                                         style={{backgroundImage: `url(${(profileData.items['finger1']) ? this.getItemImage(profileData.items['finger1']) : '/images/emptyslots/ring.gif'})`}}/>
                                </a>
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['finger1']) ? profileData.items['finger1'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['finger1']) ? profileData.items['finger1'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item"><a href="#">
                                    <div className="item-img"
                                         style={{backgroundImage: `url(${(profileData.items['finger2']) ? this.getItemImage(profileData.items['finger2']) : '/images/emptyslots/ring.gif'})`}}/>
                                </a>
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['finger2']) ? profileData.items['finger2'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['finger2']) ? profileData.items['finger2'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item"><a href="#">
                                    <div className="item-img"
                                         style={{backgroundImage: `url(${(profileData.items['trinket1']) ? this.getItemImage(profileData.items['trinket1']) : '/images/emptyslots/trinket.gif'})`}}/>
                                </a>
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['trinket1']) ? profileData.items['trinket1'].name : ''}</h3>
                                        </div>
                                        <div className="item-level">
                                            <span>{(profileData.items['trinket1']) ? profileData.items['trinket1'].itemLevel : ''}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item"><a href="#">
                                    <div className="item-img"
                                         style={{backgroundImage: `url(${(profileData.items['trinket2']) ? this.getItemImage(profileData.items['trinket2']) : '/images/emptyslots/trinket.gif'})`}}/>
                                </a>
                                    <div className="item-info d-none d-md-block">
                                        <div className="item-name">
                                            <h3>{(profileData.items['trinket2']) ? profileData.items['trinket2'].name : ''}</h3>
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
                                        <h3>{(profileData.items['mainHand']) ? profileData.items['mainHand'].name : ''}</h3>
                                    </div>
                                    <div className="item-level">
                                        <span>{(profileData.items['mainHand']) ? profileData.items['mainHand'].itemLevel : ''}</span>
                                    </div>
                                </div>
                                <a href="#">
                                    <div className="item-img"
                                         style={{backgroundImage: `url(${(profileData.items['mainHand']) ? this.getItemImage(profileData.items['mainHand']) : '/images/emptyslots/mainhand.gif'})`}}/>
                                </a></div>
                            <div className="item right-item"><a href="#">
                                <div className="item-img"
                                     style={{backgroundImage: `url(${(profileData.items['offHand']) ? this.getItemImage(profileData.items['offHand']) : '/images/emptyslots/secondhand.gif'})`}}/>
                            </a>
                                <div className="item-info d-none d-md-block">
                                    <div className="item-name">
                                        <h3>{(profileData.items['offHand']) ? profileData.items['offHand'].name : ''}</h3>
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
                                                    <span>{Math.round(profileData.stats.mainHandDmgMin)} - {Math.round(profileData.stats.mainHandDmgMax)}</span></div>
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