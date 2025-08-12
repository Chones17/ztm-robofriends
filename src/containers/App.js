import { connect } from "react-redux";
import CardList from "../components/CardList.js";
import SearchBox from "../components/SearchBox.js";
import Scroll from "../components/Scroll.js";
import { setSearchField, requestRobots } from "../actions.js";
import "./App.css";
import { useEffect } from "react";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  };
};

const App = ({ searchField, onSearchChange, robots, isPending, onRequestRobots }) => {

  useEffect(() => {
    onRequestRobots()
  }, [onRequestRobots])

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return isPending ? (
    <h1>Loading</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardList robots={filteredRobots} />
      </Scroll>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
