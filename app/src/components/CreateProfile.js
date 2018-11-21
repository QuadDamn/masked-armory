import React, {Component, Fragment} from 'react';
import {getUsServerList, getEuServerList} from "../utils/api";

class CreateProfile extends Component {

    state = {
        region: 'us',
        usServerList: {},
        euServerList: {},
        characterName: '',
        serverName: ''
    };

    async componentDidMount() {
        const usServers = await getUsServerList();
        const euServers = await getEuServerList();

        this.setState({
            usServerList: usServers,
            euServerList: euServers
        })
    }

    initAwesomplete() {

    }

    handleSubmit = (event) => {

    };

    handleFlagSelection = (event) => {

    };

    handleCharacterNameChange = (event) => {
        this.setState({
           characterName: event.target.value
        });
    };

    render() {
        return (
            <Fragment>
                <div className="container-fluid home">
                    <div className="container">
                        <div className="logo"><img src="images/logo.png" alt=""/></div>
                        <div className="site-description">
                        <p>Masked Armory is the most well known anonymous World of Warcraft (WoW) profile source in the Real
                            Money Trading (RMT) market. We hide your character and server name so that you can be protected
                            when you are attempting to buy, sell, or trade a WoW account! <span className="bold">Come create your Masked Armory profile today in just a matter of seconds!</span>
                        </p>
                        </div>
                        <div className="select"> Select Your Region</div>
                        <div className="region"><a href="#">
                            <div className="usa" />
                        </a> <a href="#">
                            <div className="euro" />
                        </a></div>
                        <div className="popup data1">
                            <div className="form-group">
                                <form>
                                    <input className="form-control" placeholder="Your Server Name" id="usServers" />
                                    <input type="text" className="form-control" placeholder="Your Character Name" onChange={(event) => this.handleCharacterNameChange(event) } />
                                    <button className="select" type="submit">Create Armory Profile</button>
                                </form>
                            </div>
                        </div>
                        <div className="popup data2">
                            <div className="form-group">
                                <form>
                                    <input className="form-control" placeholder="Your Server Name" id="euServers" />
                                    <input type="text" className="form-control" placeholder="Your Character Name" onChange={(event) => this.handleCharacterNameChange(event) } />
                                        <button className="select" type="submit">Create Armory Profile</button>
                                </form>
                            </div>
                        </div>
                        <div className="footer">
                            <ul>
                                <li><a href="#">Buy Sell WoW Accounts</a></li>
                                <li className="none">|</li>
                                <li><a href="#">Buy High End Elite Premium WoW Accounts</a></li>
                                <li className="none">|</li>
                                <li><a href="#">Sell High End Elite Premium WoW Accounts</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CreateProfile;