import React, { useContext, useEffect, useState } from 'react';
import firebase from '../firebase';
import { AuthContext } from '../store/auth';

import './Home.css';

interface ITeam { 
    name: string;
    id: string;
}

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const [teams, setTeams] = useState([] as any[]);
    
    useEffect(() => {
        // firebase.firestore().collection('teams').get()
        //     .then(querySnapshot => querySnapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
        //     .then(teams => setTeams(teams))
        //     .catch(err => console.log('get teams error', err))
    }, [])

    const handleAddTeam = (event: any) => {
        event.preventDefault()
        const { teamName } = event.target.elements;
        const data = { name: teamName.value }
        
        firebase.firestore().collection('teams').add(data)
            .then(({id}) => setTeams([...teams, {id, ...data}]))
            .catch(err => console.log('added teams error', err))
        
        teamName.value = '';
    }

    const handleUpdateTeam = (team: any) => {
        firebase.firestore().collection('teams').doc(team.id).update({...team.name})
            .then((tm) => {
                console.log('tm',tm)
                setTeams([...teams.filter(t => t.id !== team.id), team])
            })
            .catch(err => console.log('deleting team error', err))
    }

    const handleDeleteTeam = (team: any) => {
        firebase.firestore().collection('teams').doc(team.id).delete()
            .then(() => setTeams(teams.filter(t => t.id !== team.id)))
            .catch(err => console.log('deleting team error', err))
    }

    return (
        <div id="Home">
            <header>
                <h1>Home</h1>
                <button className="btn btn-outline-secondary"
                    onClick={() => firebase.auth().signOut()}>Log out</button>
            </header>
            <hr />

            <div className="card bg-light mb-3">
                <h3 className="card-header">
                    <img src={currentUser.photoURL} width="30" alt={currentUser.displayName}/>
                    {currentUser.displayName || 'User'}
                </h3>
                <div className="card-body">
                    <pre className="card-text">{JSON.stringify(currentUser, null, 2)}</pre>
                </div>
            </div>

            <hr/>
            {/* TEAMS LIST  */}
            <div id="Teams">
                <h2>Teams</h2>

                <ul>{teams.map(team => 
                    <li key={team.id}>
                        <input id={team.id} defaultValue={team.name} />
                        <div>
                            <button onClick={() => handleUpdateTeam(team)}>Save</button>
                            <button onClick={() => handleDeleteTeam(team)}>Delete</button>
                        </div>
                    </li>
                )}</ul>

                {/* CREATE TEAM */}
                <form onSubmit={handleAddTeam}>
                    <div className="form-group">
                        <label htmlFor="teamName">Team Name</label>
                        <input placeholder="Enter team name" type="teamName" className="form-control" id="teamName" autoComplete="off" />
                    </div>
                    <button type="submit" className="btn btn-success">Add team</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
