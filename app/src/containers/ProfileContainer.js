import React, {Component, Fragment} from 'react';
import {getProfile} from "../utils/api";
import MainProfileView from '../components/MainProfileView';
import TitleProfileView from '../components/TitleProfileView';
import MountProfileView from '../components/MountProfileView';
import PetProfileView from '../components/PetProfileView';
import ReputationProfileView from '../components/ReputationProfileView';
import AchievementProfileView from '../components/AchievementProfileView';
import ShareProfileView from '../components/ShareProfileView';

class ProfileContainer extends Component {

  state = {
    profileId: '',
    profileData: {},
    loading: false,
    currentView: 'main',
    componentToRender: <div/>,
    profilePicture: ''
  };

  async componentDidMount() {
    this.setState({
      loading: true
    });

    const profileId = this.props.match.params.id;

    getProfile(profileId).then(async (data) => {

      const profilePicture = await this.buildProfilePictureLink(data.data.profile.thumbnail, data.data.profile.origin);

      this.setState({
        profileId: profileId,
        profileData: data.data.profile,
        loading: false,
        profilePicture
      });

      this.getComponentToRender('main');
    })
  }

  openNav() {
    document.getElementById("mynav").classList.add('mynav2');
  }

  closeNav() {
    document.getElementById("mynav").classList.remove('mynav2');
  }

  changeView = (selectedView) => {
    this.setState({
      currentView: selectedView
    });

    this.getComponentToRender(selectedView);

    this.closeNav();
  };

  buildProfilePictureLink(thumbnail, origin) {
    let profilePicture;

    if (typeof thumbnail !== 'undefined') {
      let profilePictureBase = thumbnail.replace('-avatar.jpg', '');
      profilePicture = 'https://render-' + origin + '.worldofwarcraft.com/character/' + profilePictureBase + '-main.jpg';
    } else {
      profilePicture = '';
    }

    return profilePicture;
  }

  getComponentToRender(selectedView) {
    const {profileData, profileId, profilePicture} = this.state;

    let componentToRender = '';

    switch (selectedView) {
      case 'main':
        componentToRender = <MainProfileView profileData={profileData} profilePicture={profilePicture} />;
        break;
      case 'titles':
        componentToRender = <TitleProfileView profileData={profileData} profilePicture={profilePicture} />;
        break;
      case 'mounts':
        componentToRender = <MountProfileView profileData={profileData} profilePicture={profilePicture} />;
        break;
      case 'pets':
        componentToRender = <PetProfileView profileData={profileData} profilePicture={profilePicture} />;
        break;
      case 'reputations':
        componentToRender = <ReputationProfileView profileData={profileData} profilePicture={profilePicture} />;
        break;
      case 'achievements':
        componentToRender = <AchievementProfileView profileData={profileData} profilePicture={profilePicture} />;
        break;
      case 'share':
        componentToRender = <ShareProfileView profileData={profileData} profileId={profileId} profilePicture={profilePicture} />;
        break;
      default:
        break;
    }

    this.setState({
      componentToRender
    });
  }

  render() {
    const {profileData, loading, componentToRender, currentView} = this.state;

    if (loading === true || !profileData) {
      return <div/>;
    }

    return (
      <Fragment>
        <div className="page">
          <nav className="side-nav d-none d-lg-block">
            <div className="nav-logo"><img src="/images/logo.png" alt=""/></div>
            <div className="navigation">
              <ul>
                <li className="head">ARMORY NAVIGATION</li>
                <li className={(currentView === 'main') ? 'active' : ""}><a onClick={() => this.changeView('main')}>
                  <div><img src="/images/main.svg" alt=""/></div>
                  MAIN</a></li>
                <li className={(currentView === 'titles') ? 'active' : ""}><a onClick={() => this.changeView('titles')}>
                  <div><img src="/images/titles.svg" alt=""/></div>
                  TITLES</a></li>
                <li className={(currentView === 'mounts') ? 'active' : ""}><a onClick={() => this.changeView('mounts')}>
                  <div><img src="/images/mounts.svg" alt=""/></div>
                  MOUNTS</a></li>
                <li className={(currentView === 'pets') ? 'active' : ""}><a onClick={() => this.changeView('pets')}>
                  <div><img src="/images/pets.svg" alt=""/></div>
                  PETS</a></li>
                <li className={(currentView === 'reputations') ? 'active' : ""}><a
                  onClick={() => this.changeView('reputations')}>
                  <div><img src="/images/reputations.svg" alt=""/></div>
                  REPUTATIONS</a></li>
                <li className={(currentView === 'achievements') ? 'active' : ""}><a
                  onClick={() => this.changeView('achievements')}>
                  <div><img src="/images/achievements.svg" alt=""/></div>
                  ACHIEVEMENTS</a></li>
                {/*<li><a href="progress.html">*/}
                {/*<div><img src="/images/progress.svg" alt=""/></div>*/}
                {/*PROGRESS</a></li>*/}
                <li className={(currentView === 'share') ? 'active' : ""}><a onClick={() => this.changeView('share')}>
                  <div><img src="/images/share.svg" alt=""/></div>
                  SHARE</a></li>
                <li className="head">ADVERTISEMENTS</li>
                <li className="ad"><a href="https://www.khaccounts.net/">BUY SELL WOW ACCOUNTS</a>
                </li>
                <li className="ad"><a href="https://www.khaccounts.net/buy-wow-accounts">BUY HIGH
                  END WOW ACCOUNTS</a></li>
                <li className="ad"><a href="https://www.khaccounts.net/sell-wow-accounts">SELL ELITE
                  WOW ACCOUNTS</a></li>
              </ul>
            </div>
          </nav>
          <div id="mynav" className="friendlymenu d-lg-none">
            <nav className="nav-menu">
              <div className="side-logo1"><img src="/images/logo.png" alt=""/></div>
              <a onClick={this.closeNav} className="closebtn">
                <img src="/images/close.svg" alt="close"/>
              </a>
              <div className="hamburger">
                <a onClick={this.openNav} style={{cursor: "pointer"}}>
                  <img src="/images/menu.svg" alt="menu"/>
                </a>
              </div>
              <div className="navigation">
                <ul>
                  <li className="head">ARMORY NAVIGATION</li>
                  <li className={(currentView === 'main') ? 'active' : ""}><a onClick={() => this.changeView('main')}>
                    <div><img src="/images/main.svg" alt=""/></div>
                    MAIN</a></li>
                  <li className={(currentView === 'titles') ? 'active' : ""}><a
                    onClick={() => this.changeView('titles')}>
                    <div><img src="/images/titles.svg" alt=""/></div>
                    TITLES</a></li>
                  <li className={(currentView === 'mounts') ? 'active' : ""}><a
                    onClick={() => this.changeView('mounts')}>
                    <div><img src="/images/mounts.svg" alt=""/></div>
                    MOUNTS</a></li>
                  <li className={(currentView === 'pets') ? 'active' : ""}><a onClick={() => this.changeView('pets')}>
                    <div><img src="/images/pets.svg" alt=""/></div>
                    PETS</a></li>
                  <li className={(currentView === 'reputations') ? 'active' : ""}><a
                    onClick={() => this.changeView('reputations')}>
                    <div><img src="/images/reputations.svg" alt=""/></div>
                    REPUTATIONS</a></li>
                  <li className={(currentView === 'achievements') ? 'active' : ""}><a
                    onClick={() => this.changeView('achievements')}>
                    <div><img src="/images/achievements.svg" alt=""/></div>
                    ACHIEVEMENTS</a></li>
                  {/*<li><a href="progress.html">*/}
                  {/*<div><img src="/images/progress.svg" alt=""/></div>*/}
                  {/*PROGRESS</a></li>*/}
                  <li className={(currentView === 'share') ? 'no-border active' : "no-border"}><a
                    onClick={() => this.changeView('share')}>
                    <div><img src="/images/share.svg" alt=""/></div>
                    SHARE</a></li>
                  {/*<li className="head">SIDE NAVIGATION</li>*/}
                  {/*<li className="ad"><a href="#"><img src="/images/donate.svg" alt=""/>Want to Donate?</a>*/}
                  {/*</li>*/}
                  {/*<li className="ad"><a href="#"><img src="/images/bug.svg" alt=""/>Report Bug | Site*/}
                  {/*Feeedback</a>*/}
                  {/*</li>*/}
                  {/*<li className="ad no-border"><a href="#"><img src="/images/about.svg" alt=""/>About*/}
                  {/*Masked*/}
                  {/*Armory</a></li>*/}
                  <li className="head">ADVERTISEMENTS</li>
                  <li className="ad"><a href="https://www.khaccounts.net/">BUY SELL WOW ACCOUNTS</a>
                  </li>
                  <li className="ad"><a href="https://www.khaccounts.net/buy-wow-accounts">BUY HIGH
                    END WOW ACCOUNTS</a></li>
                  <li className="ad"><a href="https://www.khaccounts.net/sell-wow-accounts">SELL ELITE
                    WOW ACCOUNTS</a></li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="main">
            <div className="nav-bar d-none d-lg-block">
              <ul>
                {/*<li><a href="#"><img src="/images/donate.svg" alt=""/>Want to Donate?</a></li>*/}
                {/*<li><a href="#"><img src="/images/bug.svg" alt=""/>Report Bug | Site Feeedback</a></li>*/}
                {/*<li><a href="#"><img src="/images/about.svg" alt=""/>About Masked Armory</a></li>*/}
              </ul>
            </div>

            {componentToRender}
          </div>
        </div>
      </Fragment>);
  }
}

export default ProfileContainer;