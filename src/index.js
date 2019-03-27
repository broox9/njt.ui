import React from "react";
import ReactDOM from "react-dom";
import isEmpty from "lodash/isEmpty";
import {
  Flex,
  Box,
  Heading,
  Text,
  Divider,
  Card,
  Link
} from "pcln-design-system";
import "./normalize.css";
import "./styles.css";

import db from "./db";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.db = db.ref("stations");
    this.state = {
      stations: [],
      updatedOn: ""
    };
  }

  componentDidMount() {
    this.db.on("value", snapshot => {
      console.log(snapshot.val());
      const stationObject = snapshot.val();
      const stations = Object.keys(stationObject).map(key => {
        return {
          key,
          ...stationObject[key]
        };
      });
      this.setState({ stations, updatedOn: new Date().toLocaleString() });
    });
  }

  render() {
    const { stations } = this.state;
    return (
      <Box className="App">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading.h2 mr={2}>NJT Trains</Heading.h2>
          <Text.span bold>as of {this.state.updatedOn}</Text.span>
        </Flex>

        {stations.length &&
          stations.map(station => <Station key={station.key} {...station} />)}
      </Box>
    );
  }
}

function Station({ name = "some train", last_run = Date.now(), trains = {} }) {
  const trainItems = Object.keys(trains).map(train => (
    <TrainItem key={train} {...trains[train]} />
  ));
  return (
    <Card mb={5} boxShadowSize="md">
      <Flex alignItems="center" justifyContent="space-between" py={0} px={2}>
        <Heading.h3 color="darkBlue" mr={4} my="0">
          {name}
        </Heading.h3>
        <h5>{new Date(last_run).toLocaleString()}</h5>
      </Flex>
      <Divider my={0} />
      <ul className="train-list">{trainItems}</ul>
    </Card>
  );
}

function TrainItem({ dest, train_time, line, train_num, track, status, link }) {
  return (
    <li className="train-item">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        color="text"
        mb={2}
      >
        <Text.span fontSize={3}>
          {train_time} to <strong>{dest}</strong>
        </Text.span>
        <Text.span fontSize={3}>{status}</Text.span>
      </Flex>
      <Flex
        alignItems="center"
        color="gray"
        justifyContent="space-between"
        fontSize={1}
      >
        <Text.span>
          {line} <Link href={link}>{train_num}</Link>
        </Text.span>
        <Text.span italic>track {track}</Text.span>
      </Flex>
    </li>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
