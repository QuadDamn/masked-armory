import React, {Component, Fragment} from 'react';
import {Loader} from 'react-overlay-loader';
import {getProfile} from "../utils/api";
import MainProfileView from '../components/MainProfileView';
import TitleProfileView from '../components/TitleProfileView';
import MountProfileView from '../components/MountProfileView';
import PetProfileView from '../components/PetProfileView';
import ReputationProfileView from '../components/ReputationProfileView';
import AchievementProfileView from '../components/AchievementProfileView';
import ShareProfileView from '../components/ShareProfileView';
import PageNotFound from '../components/PageNotFound';
import DocumentTitle from "react-document-title";

class ProfileContainer extends Component {

  state = {
    profileId: '',
    profileData: {},
    loading: false,
    currentView: 'main',
    componentToRender: <div/>,
    profilePicture: '',
    pageNotFound: false
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
    }).catch((err) => {
      console.log(err);
      this.setState({
        pageNotFound: true,
        loading: false
      });
    })
  }

  openNav() {
    document.getElementById("mynav").classList.add('mynav2');
  }

  closeNav() {
    document.getElementById("mynav").classList.remove('mynav2');
  }

  handleChangeView = (event, selectedView) => {
    event.preventDefault();

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
        componentToRender = <MainProfileView profileData={profileData} profilePicture={profilePicture}/>;
        break;
      case 'titles':
        componentToRender = <TitleProfileView profileData={profileData} profilePicture={profilePicture}/>;
        break;
      case 'mounts':
        componentToRender = <MountProfileView profileData={profileData} profilePicture={profilePicture}/>;
        break;
      case 'pets':
        componentToRender = <PetProfileView profileData={profileData} profilePicture={profilePicture}/>;
        break;
      case 'reputations':
        componentToRender = <ReputationProfileView profileData={profileData} profilePicture={profilePicture}/>;
        break;
      case 'achievements':
        componentToRender = <AchievementProfileView profileData={profileData} profilePicture={profilePicture}/>;
        break;
      case 'share':
        componentToRender =
          <ShareProfileView profileData={profileData} profileId={profileId} profilePicture={profilePicture}/>;
        break;
      default:
        break;
    }

    this.setState({
      componentToRender
    });
  }

  render() {
    const {profileData, loading, componentToRender, currentView, pageNotFound} = this.state;

    if (pageNotFound === true) {
      return <PageNotFound/>;
    }

    return (
      <DocumentTitle
        title={`Level ${profileData.level} ${profileData.raceName} ${profileData.className} Anonymous World of Warcraft Armory Profile | Masked Armory`}>
        <Fragment>
          <div className="page">
            <nav className="side-nav d-none d-lg-block">
              <div className="nav-logo"><a href="/"><img src="/images/logo.png" alt=""/></a></div>
              <div className="navigation">
                <ul>
                  <li className="head">ARMORY NAVIGATION</li>
                  <li className={(currentView === 'main') ? 'active' : ""}><a
                    onClick={(event) => this.handleChangeView(event, 'main')}>
                    <div><img src="/images/main.svg" alt=""/></div>
                    MAIN</a></li>
                  <li className={(currentView === 'titles') ? 'active' : ""}><a
                    onClick={(event) => this.handleChangeView(event, 'titles')}>
                    <div><img src="/images/titles.svg" alt=""/></div>
                    TITLES</a></li>
                  <li className={(currentView === 'mounts') ? 'active' : ""}><a
                    onClick={(event) => this.handleChangeView(event, 'mounts')}>
                    <div><img src="/images/mounts.svg" alt=""/></div>
                    MOUNTS</a></li>
                  <li className={(currentView === 'pets') ? 'active' : ""}><a
                    onClick={(event) => this.handleChangeView(event, 'pets')}>
                    <div><img src="/images/pets.svg" alt=""/></div>
                    PETS</a></li>
                  <li className={(currentView === 'reputations') ? 'active' : ""}><a
                    onClick={(event) => this.handleChangeView(event, 'reputations')}>
                    <div><img src="/images/reputations.svg" alt=""/></div>
                    REPUTATIONS</a></li>
                  <li className={(currentView === 'achievements') ? 'active' : ""}><a
                    onClick={(event) => this.handleChangeView(event, 'achievements')}>
                    <div><img src="/images/achievements.svg" alt=""/></div>
                    ACHIEVEMENTS</a></li>
                  <li className={(currentView === 'share') ? 'active' : ""}><a
                    onClick={(event) => this.handleChangeView(event, 'share')}>
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
                    <li className={(currentView === 'main') ? 'active' : ""}><a
                      onClick={(event) => this.handleChangeView(event, 'main')}>
                      <div><img src="/images/main.svg" alt=""/></div>
                      MAIN</a></li>
                    <li className={(currentView === 'titles') ? 'active' : ""}><a
                      onClick={(event) => this.handleChangeView(event, 'titles')}>
                      <div><img src="/images/titles.svg" alt=""/></div>
                      TITLES</a></li>
                    <li className={(currentView === 'mounts') ? 'active' : ""}><a
                      onClick={(event) => this.handleChangeView(event, 'mounts')}>
                      <div><img src="/images/mounts.svg" alt=""/></div>
                      MOUNTS</a></li>
                    <li className={(currentView === 'pets') ? 'active' : ""}><a
                      onClick={(event) => this.handleChangeView(event, 'pets')}>
                      <div><img src="/images/pets.svg" alt=""/></div>
                      PETS</a></li>
                    <li className={(currentView === 'reputations') ? 'active' : ""}><a
                      onClick={(event) => this.handleChangeView(event, 'reputations')}>
                      <div><img src="/images/reputations.svg" alt=""/></div>
                      REPUTATIONS</a></li>
                    <li className={(currentView === 'achievements') ? 'active' : ""}><a
                      onClick={(event) => this.handleChangeView(event, 'achievements')}>
                      <div><img src="/images/achievements.svg" alt=""/></div>
                      ACHIEVEMENTS</a></li>
                    <li className={(currentView === 'share') ? 'no-border active' : "no-border"}><a
                      onClick={(event) => this.handleChangeView(event, 'share')}>
                      <div><img src="/images/share.svg" alt=""/></div>
                      SHARE</a></li>
                    <li className="head">SITE SUPPORT</li>
                    <li className="ad"><a href="mailto:shanej@khaccounts.net?subject=Masked Armory Bug / Feedback"><img
                      src="/images/bug.svg" alt=""/>Report Bug | Site Feeedback</a></li>
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
                  <li><a href="mailto:shanej@khaccounts.net?subject=Masked Armory Bug / Feedback"><img
                    src="/images/bug.svg" alt=""/>Report Bug | Site Feeedback</a></li>
                </ul>
              </div>

              {componentToRender}
            </div>
          </div>

          <Loader fullPage loading={loading} text="Loading Profile..."
                  containerStyle={{backgroundColor: "rgba(0, 0, 0, 0.9)"}}
                  textStyle={{color: "#fff", marginTop: "70px"}}/>
        </Fragment>
      </DocumentTitle>
    );
  }
}

export default ProfileContainer;