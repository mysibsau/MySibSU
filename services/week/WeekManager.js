import React from 'react'
import { CurrentWeekApiCall } from '../api/timetable';

export const ManageWeekContext = React.createContext({
    week: 0,
  });

export const useWeek = () => React.useContext(ManageWeekContext);

export class WeekManager extends React.Component {

    state = {
      week: 0
    };

    async componentDidMount() {
        this.setState({week: await CurrentWeekApiCall()})
    }

    render () {
      return (
        <ManageWeekContext.Provider value={{
          week: this.state.week,
        }}>
          {this.props.children}
        </ManageWeekContext.Provider>
      )
    }
  }
  
  export default WeekManager;