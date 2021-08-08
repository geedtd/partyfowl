import React, { useState } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import Signup from '../Auth/Signup/Signup'
import Login from '../Auth/Login/Login'
import Landing from '../Landing/Landing'
import Users from '../Users/Users'
import Profile from '../Profile/Profile'
import EventDetails from '../EventDetails/EventDetails'
import * as authService from '../../services/authService'

const App = () => {
	const history = useHistory()
	const [user, setUser] = useState(authService.getUser())
	

	const handleLogout = () => {
		authService.logout()
		setUser(null)
		history.push('/')
	}

	const handleSignupOrLogin = () => {
		setUser(authService.getUser())
	}

	return (
		<>
			<NavBar user={user} handleLogout={handleLogout}/>
			<Route exact path='/'>
				<Landing user={user} />
			</Route>
			<Route exact path='/signup'>
				{user ? 
					<Redirect to='/' /> : 
					<Signup handleSignupOrLogin={handleSignupOrLogin}/>
				}
			</Route>
			<Route exact path='/login'>
				{user ? 
					<Redirect to='/' /> : 
					<Login handleSignupOrLogin={handleSignupOrLogin}/>
				}
			</Route>
			<Route exact path='/users'>
				{user ? <Users /> : <Redirect to='/login' />}
			</Route>
			<Route exact path='/profile'>
				<Profile user={user}/>
			</Route>
			<Route path="/events/:id">
				<EventDetails
				/>
			</Route>
		</>
	)
}
 
export default App
