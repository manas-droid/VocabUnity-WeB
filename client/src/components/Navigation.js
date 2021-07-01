import React from 'react'
import { Link , useHistory } from 'react-router-dom'
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Button
} from 'semantic-ui-react'


import { useAuth } from '../context/AuthContext'

function Navigation () {  
   const history = useHistory();

    const {currentUser  , logout} = useAuth();

  
    async function LogOut(){
      await logout();
      return history.push('/login');
    }
return (
  <Menu fixed='top' inverted size="large">
    <Container>
      <Menu.Item as='a' header>
        <Image size='mini' src='https://toppng.com/uploads/preview/community-icon-one-stop-solution-icon-11553449230cw4322bto3.png' style={{ marginRight: '1.5em', borderRadius: "50px" }} />
        Vocabunity
      </Menu.Item>
      <Menu.Item as={Link} to="/">Home</Menu.Item>
      <Menu.Menu position='right'>

        {
          currentUser ? (
            <Menu.Item>
              <Dropdown text={`${currentUser.displayName.substring(0, 5) || "Your Profile"}...` || `${currentUser.email.substring(0, 5)}...`} className='link item' >
                <Dropdown.Menu >
                  <Dropdown.Header>You</Dropdown.Header>

                  <Dropdown.Item as={Link} to='/your-profile'>Your Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to='/add-post'>Add a New Post</Dropdown.Item>
                  <Dropdown.Item onClick={LogOut}>Log Out</Dropdown.Item>
                  <Dropdown.Divider />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          ) : (
            <Menu.Item >
              <Button inverted as={Link} to="/login" > Login </Button>
            </Menu.Item>
          )
        }

      </Menu.Menu>

    </Container>
  </Menu>
   )
}


export default Navigation