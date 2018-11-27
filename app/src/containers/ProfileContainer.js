import React, {Component, Fragment} from 'react';
import {getProfile} from "../utils/api";
import MainProfileView from '../components/MainProfileView';
import TitleProfileView from '../components/TitleProfileView';

class ProfileContainer extends Component {

    state = {
        profileId: '',
        profileData: {},
        loading: false,
        currentView: 'main',
        componentToRender: <div />
    };

    async componentDidMount() {
        this.setState({
            loading: true
        });

        const profileId = this.props.match.params.id;

        getProfile(profileId).then((data) => {
            this.setState({
                profileId: profileId,
                profileData: data.data.profile,
                loading: false
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
    };

    getComponentToRender(selectedView) {
        const {profileData, profileId} = this.state;

        let componentToRender = '';

        switch (selectedView) {
            case 'main':
                componentToRender = <MainProfileView profileData={profileData} />;
                break;
            case 'titles':
                componentToRender = <TitleProfileView profileData={profileData} />;
                break;
            // case 'mounts':
            //     componentToRender = <MountProfileView profileData={profileData} profileId={profileId} />;
            //     break;
            // case 'pets':
            //     componentToRender = <PetProfileView profileData={profileData} profileId={profileId} />;
            //     break;
            // case 'reputations':
            //     componentToRender = <ReputationProfileView profileData={profileData} profileId={profileId} />;
            //     break;
            // case 'achievements':
            //     componentToRender = <AchievementProfileView profileData={profileData} profileId={profileId} />;
            //     break;
            // case 'share':
            //     componentToRender = <ShareProfileView profileData={profileData} profileId={profileId} />;
            //     break;
                default:
                    break;
        }

        this.setState({
            componentToRender
        });
    }

    render() {
        const {profileData, loading, componentToRender} = this.state;

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
                                <li className="active"><a onClick={() => this.changeView('main')}>
                                    <div><img src="/images/main.svg" alt=""/></div>
                                    MAIN</a></li>
                                <li><a onClick={() => this.changeView('titles')}>
                                    <div><img src="/images/titles.svg" alt=""/></div>
                                    TITLES</a></li>
                                <li><a href="mounts.html">
                                    <div><img src="/images/mounts.svg" alt=""/></div>
                                    MOUNTS</a></li>
                                <li><a href="pets.html">
                                    <div><img src="/images/pets.svg" alt=""/></div>
                                    PETS</a></li>
                                <li><a href="reputations.html">
                                    <div><img src="/images/rebutations.svg" alt=""/></div>
                                    REPUTATIONS</a></li>
                                <li><a href="achievments.html">
                                    <div><img src="/images/achievements.svg" alt=""/></div>
                                    ACHIEVEMENTS</a></li>
                                {/*<li><a href="progress.html">*/}
                                    {/*<div><img src="/images/progress.svg" alt=""/></div>*/}
                                    {/*PROGRESS</a></li>*/}
                                <li className="no-border"><a href="share.html">
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
                                    <li className="active"><a onClick={() => this.changeView('main')}>
                                        <div><img src="/images/main.svg" alt=""/></div>
                                        MAIN</a></li>
                                    <li><a onClick={() => this.changeView('titles')}>
                                        <div><img src="/images/titles.svg" alt=""/></div>
                                        TITLES</a></li>
                                    <li><a href="mounts.html">
                                        <div><img src="/images/mounts.svg" alt=""/></div>
                                        MOUNTS</a></li>
                                    <li><a href="pets.html">
                                        <div><img src="/images/pets.svg" alt=""/></div>
                                        PETS</a></li>
                                    <li><a href="reputations.html">
                                        <div><img src="/images/rebutations.svg" alt=""/></div>
                                        REPUTATIONS</a></li>
                                    <li><a href="achievments.html">
                                        <div><img src="/images/achievements.svg" alt=""/></div>
                                        ACHIEVEMENTS</a></li>
                                    {/*<li><a href="progress.html">*/}
                                        {/*<div><img src="/images/progress.svg" alt=""/></div>*/}
                                        {/*PROGRESS</a></li>*/}
                                    <li className="no-border"><a href="share.html">
                                        <div><img src="/images/share.svg" alt=""/></div>
                                        SHARE</a></li>
                                    <li className="head">SIDE NAVIGATION</li>
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