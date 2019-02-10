import React, { Component } from 'react';
import './scss-common/DateControl.scss';
import './scss-common/MediaObject.scss';
import './App.scss';
import account_img from './account.svg'
import DataPanel from "./subcomponents/DataPanel";

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentDidMount() {
    // Load start_date, end_date, access_token
  }
  render() {
    return (
      <div className="App">
        {/* Header panel */}
        <header className="App__header">
          Backend test UI
        </header>

        {/* Main controls, to query API */}
        <form className="App__controls" onSubmit={(event) => {event.preventDefault();}}>
          <div className="App__controls-options">
            <div className="DateControl">
              <label>
                <span className="DateControl__label">Start date</span>
                <br/>
                <input className="DateControl__input"
                       type="text"
                       placeholder="YYYY-MM-DD"
                />
              </label>
            </div>
            <div className="DateControl">
              <label>
                <span className="DateControl__label">End date</span>
                <br/>
                <input className="DateControl__input"
                       type="text"
                       placeholder="YYYY-MM-DD"
                />
              </label>
            </div>
          </div>
          <div className="App__controls-auth">
            <div className="MediaObject">
              <img className="MediaObject__icon"
                   src={account_img}
                   alt="AUTH"
              />
              <input className="MediaObject__content"
                     type="text"
                     placeholder="Access token"
              />
            </div>
          </div>
          <br/>
          <br/>
          <input className="App__controls-submit-btn"
                 type="submit"
                 value="Query API"
          />
        </form>

        {/* Errors (if any) */}
        <p className="App__error">Errors</p>

        {/* Printout from the API result (if any) */}
        <div className="App__total-numbers">
          <DataPanel
            name="Total conversation count"
            count={0}
          />
          <DataPanel
            name="Total user message count"
            count={0}
          />
          <DataPanel
            name="Total visitor messages count"
            count={0}
          />
        </div>

        {/* Detailed printout with its own sub-controls*/}
        <div className="App__daily-numbers">
          <div>
            daily table
          </div>
          <div>
            table controls (page)
          </div>
        </div>
      </div>
    );
  }
}

export default App;
