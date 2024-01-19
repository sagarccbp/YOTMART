import React from "react";

import Alert from "react-bootstrap/Alert";

export default function AlertDialog({ message, isShowable }) {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>{message}</Alert.Heading>
      </Alert>
    </>
  );
}
