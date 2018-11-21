import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Awesomplete from 'awesomplete';
import {getUsServerList, getEuServerList} from "../utils/api";
import $ from 'jquery';

class CreateProfile extends Component {
  state = {
    region: 'us',
    usServerList: [],
    euServerList: [],
    characterName: '',
    serverName: '',
    submissionError: ''
  };

  /**
   * Getting the US and EU server lists and setting them to the component state.
   * Outside of that, we are also initializing the Awesompletes for both regions.
   *
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    const usServers = await getUsServerList();
    const euServers = await getEuServerList();

    this.setState({
      usServerList: usServers,
      euServerList: euServers
    });

    this.initAwesompletes();
    this.handleFlagSelection({}, 'us');
  }

  /**
   * Handling the initialization of both Awesomplete, one for US and one for EU servers.
   */
  initAwesompletes() {
    const usServerInput = document.getElementById('usServers');
    const euServerInput = document.getElementById('euServers');

    new Awesomplete(usServerInput, {
      minChars: 2,
      maxItems: 5,
      replace: this.handleServerNameSelectionReplace(usServerInput),
      list: this.state.usServerList
    });

    new Awesomplete(euServerInput, {
      minChars: 2,
      maxItems: 5,
      replace: this.handleServerNameSelectionReplace(euServerInput),
      list: this.state.euServerList
    });
  }

  /**
   * Handling the submission for the profile creation.
   *
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state.region);
    console.log(this.state.serverName);
    console.log(this.state.characterName);
  };

  /**
   * Handling the region flag change event.
   *
   * @param event
   * @param region
   */
  handleFlagSelection = (event, region) => {
    this.setState({
      serverName: '',
      region
    });

    // The reason for the use of jQuery here is to use the fadeIn functionality.
    const usInputContainer = $('#usInputContainer');
    const euInputContainer = $('#euInputContainer');

    if (region === 'us') {
      usInputContainer.fadeIn();
      euInputContainer.hide();
    } else if (region === 'eu') {
      usInputContainer.hide();
      euInputContainer.fadeIn();
    }
  };

  /**
   * Handling the character name input change.
   *
   * @param event
   */
  handleCharacterNameChange = (event) => {
    this.setState({
      characterName: event.target.value
    });
  };

  /**
   * Handling the server name selection change from the Awesomplete.
   *
   * @param input
   * @returns {Function}
   */
  handleServerNameSelectionReplace = (input) => {
    return ((item) => {
      this.setState({
        serverName: item.value
      });
    })
  };

  /**
   * Handling the input change for the server name in the event that the user enters it in by hand
   * and doesn't use the Awesomplete.
   *
   * @param event
   */
  handleServerNameChange = (event) => {
    this.setState({
      serverName: event.target.value
    });
  };

  render() {
    return (
      <Fragment>
        <div className="container-fluid home">
          <div className="container">
            <div className="logo"><img src="images/logo.png" alt=""/></div>
            <div className="site-description">
              <p>Masked Armory has been around since 2007 and has become the most well-known anonymous armory profile source for
                World of Warcraft.  We aim to keep things simple and just ask for your character's region, server, and name and
                we do the rest of the heavy lifting.  Our aim is to provide you a profile link that will keep you protected
                when you are attempting to buy, sell, or trade your World of Wacraft account.
              </p>
            </div>
            <div className="select"> Select Your Region</div>
            <div className="region">
              <Link to="/" onClick={(event) => this.handleFlagSelection(event, 'us')}><div className="us"/></Link>
              <Link to="/" onClick={(event) => this.handleFlagSelection(event, 'eu')}><div className="eu"/></Link>
            </div>
            <div className="popup" id="usInputContainer">
              <div className="form-group">
                <form>
                  <input
                    value={this.state.serverName}
                    className='form-control'
                    id="usServers"
                    onChange={(event) => this.handleServerNameChange(event)}
                    placeholder="Server Name"
                  />
                  <input type="text" className="form-control" placeholder="Character Name"
                         onChange={(event) => this.handleCharacterNameChange(event)}/>
                  <button className="select" type="submit" style={{marginTop: "10px"}} onClick={(event) => this.handleSubmit(event)}>Create Armory Profile</button>
                </form>
              </div>
            </div>
            <div className="popup" id="euInputContainer">
              <div className="form-group">
                <form>
                  <input
                    value={this.state.serverName}
                    className='form-control'
                    id="euServers"
                    onChange={(event) => this.handleServerNameChange(event)}
                    placeholder="Server Name"
                  />
                  <input type="text" className="form-control" placeholder="Character Name"
                         onChange={(event) => this.handleCharacterNameChange(event)}/>
                  <button className="select" type="submit" style={{marginTop: "10px"}} onClick={(event) => this.handleSubmit(event)}>Create Armory Profile</button>
                </form>
              </div>
            </div>
            <div className="footer">
              <ul>
                <li><Link to='https://www.khaccounts.net'>Buy Sell WoW Accounts</Link></li>
                <li className="none">|</li>
                <li><Link to='https://www.khaccounts.net/buy-wow-accounts'>Buy High End Elite Premium WoW Accounts</Link></li>
                <li className="none">|</li>
                <li><Link to='https://www.khaccounts.net/sell-wow-accounts'>Sell High End Elite Premium WoW Accounts</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default CreateProfile;