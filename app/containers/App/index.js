// @flow
import * as React from "react";

type Props = {
  children: React.Node
};

export default function App(props: Props) {
  return <div>{props.children}</div>;
}
