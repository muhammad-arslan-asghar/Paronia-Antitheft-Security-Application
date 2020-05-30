import React, { Component } from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {BrowserRouter as Router,Route, withRouter} from 'react-router-dom';
import Surveillance from '../main/Surveillance';
import CallLogs from '../main/CallLogs';
import Mapwrap from '../main/MapContainer';
// import Dashboard1 from '../main/Dashboard';

 class Dashboard extends Component {
    render() {
        return (

            <Router>
    <Route render={({ location, history }) => (
        <React.Fragment>

          <SideNav style={{ marginTop: '56px',marginBottom: '60px' }}
          onSelect={(selected) => {
            const to = '/' + selected;
            if (location.pathname !== to) {
                history.push(to);
            }
        }}
      >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home" >
              <NavItem eventKey="home">
                  <NavIcon>
                      <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Home
                  </NavText>
              </NavItem>
              <NavItem eventKey="surveillance">
                  <NavIcon>
                      <i className="fa fa-mobile" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Surveillance
                  </NavText>
              </NavItem>
              <NavItem eventKey="call">
                  <NavIcon>
                      <i className="fa fa-phone" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Call Logs
                  </NavText>
              </NavItem>
              <NavItem eventKey="monitoring">
                  <NavIcon>
                      <i className="fa fa-lock" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Monitoring
                  </NavText>
                  <NavItem eventKey="charts/linechart">
                      <NavText>
                          Line Chart
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="charts/barchart">
                      <NavText>
                          Bar Chart
                      </NavText>
                  </NavItem>
              </NavItem>
          </SideNav.Nav>
      </SideNav>
                <main>
                {/* <Route path="/" exact component={props => <Dashboard1 />} /> */}
                <Route path="/surveillance" component={Surveillance} />
                <Route path="/call" component={props => <CallLogs />} />
                 </main>
        </React.Fragment>
    )}
    />

    
</Router>



 

      
        )
    }
}
export default withRouter( Dashboard);