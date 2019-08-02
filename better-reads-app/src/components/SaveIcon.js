import React from 'react'
import { Icon } from "semantic-ui-react";

const SaveIcon = ({liked, addToSavedList, deleteFromSavedList}) => {
  if (liked) {
    return (<Icon className="heart" color="red" onClick={deleteFromSavedList} />)
  } else if (!liked) {
    return (<Icon className="heart outline" onClick={addToSavedList} />)
  }
}


export default SaveIcon
