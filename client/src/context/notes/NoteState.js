import React, { useState } from 'react'
import { useEffect } from 'react';
import { BASE_URL } from '../../services/helper';
import storage from '../../utils/storage';
import NoteContext from './noteContext'

const NoteState = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [allNotes, setAllNotes] = useState([]);
    const [user, setUser] = useState();


    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}api/auth/getallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": storage.get('thread_token')
            }
        }).then(response => response.json()).then(data => {
            setAllNotes(data.notes);
            setIsLoading(false);
        })
    }, []);


    // Get logged in user
    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}api/auth/access-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": storage.get('thread_token')
            }
        }).then(response => response.json()).then(data => {
            setUser(data.response);
            setIsLoading(false);
        })
    }, []);


    // Create Notes 
    async function createNotes(note) {
        const response = await fetch(`${BASE_URL}api/auth/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": storage.get('thread_token')
            },
            body: JSON.stringify({
                title: note.title,
                description: note.description,
                important: note.important
            }),
        });
        const jsonData = await response.json();
        setAllNotes([...allNotes, jsonData.savedNote])
        return jsonData;
    }

    // Delete Notes 
    async function deleteNote(id) {
        fetch(`${BASE_URL}api/auth/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": storage.get('thread_token')
            }
        }).then(response => response.json()).then(data => {
            setAllNotes(allNotes.filter((note) => note._id !== id))
        })
    }

    return (
        <NoteContext.Provider value={{ allNotes, isLoading, loggedInUser: user, createNotes, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;