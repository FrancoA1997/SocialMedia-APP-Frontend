import SettingsIcon from '@mui/icons-material/Settings';
import { AuthContext } from '../../context/AuthContext';
import Select from 'react-select'
import React, { useContext, useRef, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import useAxios from '../api/useAxios';
import './profileinfo.css'

const ProfileInfo = ({ user }) => {
    const [isRightInfo, setIsRightInfo] = useState(false);
    const [isUndo, setIsUndo] = useState(false)
    const [status, setStatus] = useState(null)
    const { user: currentUser } = useContext(AuthContext)
    const api = useAxios()
    const city = useRef()
    const country = useRef()
    const onChangeSelect = (value)=>{
        setStatus(value)
    }
    const selectRelationship = [
        { value: 1, label: "Unemployed" },
        { value: 2, label: "Employed" }
    ]



    const infoHandler = async (e) => {
        e.preventDefault()
        const updatedUserInfo = {
            userId: user._id,
            password: user.password,
            city: (city.current.value ? city.current.value : user.city),
            from: (country.current.value ? country.current.value : user.from),
            relationship: (status.value ? status.value : user.relationship)
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
            {isRightInfo
                ? <>
                    <form onSubmit={infoHandler}>
                        <input type="text" className='inputInfo' ref={city} placeholder={"City: " + user.city} />
                        <input type="text" className='inputInfo2' ref={country} placeholder={"Country: " + user.from} />
                        <Select className='inputSelect' placeholder="Status: " value={status} onChange={onChangeSelect}  options={selectRelationship} />
                        <div className='optionsButtons'>

                            {isUndo

                                ? <>
                                
                                    <button  className="btn-accept" type='submit'>
                                    <CheckIcon style={{ paddingRight: "5px", marginRight: "5px" }} />
                                    <p>Done!</p>
                                    </button>
                                    
                               
                                <div className="btn-cancel-toggle" onClick={() => { setIsRightInfo(false); setIsUndo(false) }}>
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
                            <span className="rightbarInfoKey">Status:</span>
                            <span className="rightbarInfoValue">
                                {user.relationship === 1
                                    ? "Unemployed"
                                    : user.relationship === 2
                                        ? "Employed"
                                        : "-"}
                            </span>
                        </div>
                    </div>
                    {user.username === currentUser.username && (
                        <div className="btn-changeInfo"
                         onClick={() => {
                            setIsRightInfo(true);
                              setIsUndo(true)
                               }}>
                            <SettingsIcon style={{ paddingRight: "5px" }} fontSize='small'/>
                            <p>info</p>
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default ProfileInfo