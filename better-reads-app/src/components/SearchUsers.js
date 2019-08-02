import React, {useState, useEffect} from "react";
import { Form, Container, Dimmer, Loader, Input, Button } from "semantic-ui-react";
import axios from "axios"

// TODO... ALL THIS STUFF IN THE FUTURE

function SearchUsers(props) {
    const [userToSearch, setUserToSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = e => {
        e.preventDefault();
    }

    useEffect(() => {
        axios.get()
    }, [])

    return <div>
        <Form onSubmit={handleSearch}>
        <Input name="search" onChange={e => setUserToSearch(e.target.value)} />
            <Button>Search user</Button>
      </Form>
  </div>
}

export default SearchUsers;
