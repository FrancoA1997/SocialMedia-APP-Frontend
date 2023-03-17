import SettingsIcon from '@mui/icons-material/Settings';
import { AuthContext } from '../../context/AuthContext';
import Select from 'react-select'
import React, { useContext, useRef, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import useAxios from '../api/useAxios';

import CircularProgress from '@mui/material/CircularProgress';
import './profileinfo.css'
import { useEffect } from 'react';
const ProfileInfo = ({ user }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUndo, setIsUndo] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const { user: currentUser } = useContext(AuthContext)
    const api = useAxios()
    const city = useRef()
    const country = useRef()
    const relationship = useRef()

    
   
     setTimeout(function(){
     setIsLoaded(true)
     }, 1000);
        
        
   

    const selectRelationship = [
        { value: 1, label: "Single" },
        { value: 2, label: "Married" }
    ]



    const infoHandler = async (e) => {
        e.preventDefault()
        const updatedUserInfo = {
            userId: user._id,
            password: user.passowrd,
            city: (city.current.value ? city.current.value : user.city),
            from: (country.current.value ? country.current.value : user.from),
            relationship: (relationship.current.value ? relationship.current.value : user.relationship)
        }
        try {
            await api.put("/users/" + user._id, updatedUserInfo);
            window.location.reload();
        } catch (err) {
            console.log(err);
        };
    }



    return (
        <>
            {isUpdating
                ? <>
                    <form onSubmit={infoHandler}>
                        <input type="text" className='inputInfo' ref={city} placeholder={"City: " + user.city} />
                        <input type="text" className='inputInfo2' ref={country} placeholder={"Country: " + user.from} />
                        <Select className='inputSelect' placeholder="Relationship: " ref={relationship} options={selectRelationship} />
                        <div className='optionsButtons'>

                            {isUndo

                                ? <><div className="btn-accept" >
                                    <button type='submit' className='btn-styless'> <CheckIcon style={{ paddingRight: "5px", marginRight: "5px" }} /></button>
                                    <p>Done!</p>
                                </div><div className="btn-cancel-toggle" onClick={() => { setIsUpdating(false); setIsUndo(false) }}>
                                        <ClearIcon style={{ paddingRight: "5px" }}  />
                                        <p>Cancel</p>
                                    </div></>
                                : <><div className="btn-accept fade-out">
                                    <button className='btn-styless'> <CheckIcon style={{ paddingRight: "5px", marginRight: "5px" }} /></button>
                                    <p>Done!</p>
                                </div><div className="btn-cancel-toggle fade-out">
                                        <ClearIcon style={{ paddingRight: "5px" }} />
                                        <p>Cancel</p>
                                    </div>
                                </>
                            }

                        </div>
                    </form>
                </>
                :
                <>
                   {isLoaded 
                   ? <>
                   <h4 className='rightbarTitle'>User information</h4><div className="rightbarInfo">
                        <div className="rightbarInfoItem1">
                            <span className="rightbarInfoKey">City:</span>
                            <span className="rightbarInfoValue">{user.city}</span>
                        </div>
                        <div className="rightbarInfoItem2">
                            <span className="rightbarInfoKey">Country:</span>
                            <span className="rightbarInfoValue">{user.from}</span>
                        </div>
                        <div className="rightbarInfoItem3">
                            <span className="rightbarInfoKey">Relationship:</span>
                            <span className="rightbarInfoValue">
                                {user.relationship === 1
                                    ? "Single"
                                    : user.relationship === 2
                                        ? "Married"
                                        : "-"}
                            </span>
                        </div>
                    </div>
                    </>
:
<CircularProgress style={{marginLeft: "20px", marginTop: "20px"}} size={"20px"}/>
} 
                    {user.username === currentUser.username && (
                        <div className="btn-changeInfo"
                         onClick={() => {
                             setIsUpdating(true);
                              setIsUndo(true)
                               }}>
                            <SettingsIcon style={{ paddingRight: "5px" }} />
                            <p>info</p>
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default ProfileInfo