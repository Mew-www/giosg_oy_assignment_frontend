import React, { Component } from 'react';
import './scss-common/DateControl.scss';
import './scss-common/MediaObject.scss';
import './App.scss';
import account_img from './account.svg'
import DataPanel from "./subcomponents/DataPanel";
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      start_date: '',
      end_date: '',
      access_token: '',
      error: '',
      total_numbers: null,
      daily_numbers: null
    };
    this.changeStart = this.changeStart.bind(this);
    this.changeEnd = this.changeEnd.bind(this);
    this.changeToken = this.changeToken.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
  }
  changeStart(event) {
    this.setState({start_date: event.target.value});
    localStorage.setItem('start_date', event.target.value);
  }
  changeEnd(event) {
    this.setState({end_date: event.target.value});
    localStorage.setItem('end_date', event.target.value);
  }
  changeToken(event) {
    this.setState({access_token: event.target.value});
    localStorage.setItem('access_token', event.target.value);
  }
  submitQuery(event) {
    if (this.state.start_date.trim().length === 0) {
      this.setState({error: 'Start date is required field'});
    } else if (this.state.end_date.trim().length === 0) {
      this.setState({error: 'End date is required field'});
    } else if (this.state.access_token.trim().length === 0) {
      this.setState({error: 'Access token is required field'});
    } else {
      this.setState({error: ''});
      axios.get(
        `${process.env.REACT_APP_API_ROOT}/reporting/v1/total/from-${this.state.start_date}/to-${this.state.end_date}/`,
        {headers: {'X-Gi-Token': this.state.access_token}}
      )
        .then((response) => {
          this.setState({total_numbers: response.data});
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.setState({error: 'Invalid start- or end-date'});
          } else if (error.response) {
            this.setState({error: error.response.data});
          } else if (error.request) {
            this.setState({error: error.request});
          } else {
            this.setState({error: error.message});
          }
        })
    }
    event.preventDefault();
  }
  componentDidMount() {
    this.setState({
      start_date: localStorage.getItem('start_date') || '',
      end_date: localStorage.getItem('end_date') || '',
      access_token: localStorage.getItem('access_token') || ''
    });
  }
  render() {
    return (
      <div className="App">
        {/* Header panel */}
        <header className="App__header">
          Backend test UI
        </header>

        {/* Main controls, to query API */}
        <form className="App__controls" onSubmit={this.submitQuery}>
          <div className="App__controls-options">
            <div className="DateControl">
              <label>
                <span className="DateControl__label">Start date</span>
                <br/>
                <input className="DateControl__input"
                       type="text"
                       value={this.state.start_date}
                       onChange={this.changeStart}
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
                       value={this.state.end_date}
                       onChange={this.changeEnd}
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
                     value={this.state.access_token}
                     onChange={this.changeToken}
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
        {this.state.error ?
          <p className="App__error">{this.state.error}</p>
          :
          ""
        }

        {/* Printout from the API result (if any) */}
        {this.state.total_numbers ?
          <div className="App__total-numbers">
            <DataPanel
              name="Total conversation count"
              count={this.state.total_numbers.total_conversation_count}
            />
            <DataPanel
              name="Total user message count"
              count={this.state.total_numbers.total_user_message_count}
            />
            <DataPanel
              name="Total visitor messages count"
              count={this.state.total_numbers.total_visitor_message_count}
            />
          </div>
          :
          ""
        }

        {/* Detailed printout with its own sub-controls*/}
        {this.state.daily_numbers ?
          <div className="App__daily-numbers">
            <div>
              daily table
            </div>
            <div>
              table controls (page)
            </div>
          </div>
          :
          ""
        }
      </div>
    );
  }
}

export default App;
