import * as React from "react";
import { StyledLink } from "baseui/link";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//https://github.com/uber/baseweb/issues/3777

const SuperLink = props => <StyledLink $as={Link} {...props} />;

export default SuperLink;