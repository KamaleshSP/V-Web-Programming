import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [
        'John Doe', 'Jane Smith', 'Mike johnson', 'Emily Davis', 'James Brown', 'Jennifer Wilson', 'Paul Garcia', 'Laura Martinez'
      ],
      query: '',
      filteredEmployees: [],
    };
  }

  componentDidMount() {
    this.setState({
      filteredEmployees: this.state.employees
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.filterEmployees();
    }
  }

  handleSearch = (event) => {
    this.setState({ query: event.target.value })
  }

  filterEmployees = () => {
    const { employees, query } = this.state;
    const lowercasedQuery = query.toLowerCase();
    const filtered = employees.filter(employee => {
      return employee.toLowerCase().includes(lowercasedQuery);
    });
    this.setState({ filteredEmployees: filtered });
  };

  render() {
    return (
      <div className="App">
        <div className="employee-directory">
          <h1>Employee Directory</h1>
          <input
            type="text"
            className="search-input"
            placeholder="Search employees..."
            value={this.state.query}
            onChange={this.handleSearch}
          />
          <div className="employee-list">
            {this.state.filteredEmployees.map((name, index) => (
              <div key={index} className="employee-item">{name}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
