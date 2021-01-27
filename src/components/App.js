import './App.css';
import React from 'react';
import employeeData from '../data/employeeData.js';
import Select from 'react-select';

const ages = [...new Set(employeeData.map(employee => employee.age))].sort();

const ageOptions = ages.map(age => ({
  label: age,
  value: age
}));

const departments = [...new Set(employeeData.map(employee => employee.department))];

const departmentOptions = departments.map(dep => ({
  label: dep,
  value: dep
}));

ageOptions.unshift({ label: 'Any Age', value: null});
departmentOptions.unshift({ label: 'Any Department', value: null});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      ageQuery: null,
      departmentQuery: null
    };
    this.filterAge = this.filterAge.bind(this);
    this.filterDepartment = this.filterDepartment.bind(this);
  }

  handleSearch(event) {
    let query = event.target.value;
    this.setState({searchQuery: query === '' ? null : query});
  }

  filterAge(selected) {
    this.setState({ageQuery: selected.value});
  }

  filterDepartment(selected) {
    this.setState({departmentQuery: selected.value});
  }

  render() {
    const listItems = employeeData.filter((data) => {
      if (!this.state.searchQuery && !this.state.ageQuery && !this.state.departmentQuery) {
        return data;
      } else if ((!this.state.searchQuery || data.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())) && (data.age === this.state.ageQuery || !this.state.ageQuery) && (data.department === this.state.departmentQuery || !this.state.departmentQuery)) {
        return data;
      }
    }).map((data, index) => {
      return(
      <div className="employee-info" key={index}>
        <h4>{data.name} </h4>
        <p>Age: {data.age} </p>
        <p>Department: {data.department}</p>
      </div>
      )
    });

    return (
      <div className="container">
        <h1>Find Employees!</h1>
        <input type="text" placeholder="Search for an employee.." onChange={(e) => this.handleSearch(e)} />
        <Select className="select" onChange={this.filterAge} options={ageOptions}/>
        <Select className="select" onChange={this.filterDepartment} options={departmentOptions}/>
        {listItems}
      </div>
    );
  }
}

export default App;
