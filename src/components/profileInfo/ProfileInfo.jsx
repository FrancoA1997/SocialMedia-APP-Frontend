import SettingsIcon from '@mui/icons-material/Settings';
import { AuthContext } from '../../context/AuthContext';
import Select from 'react-select'
import React, { useContext, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import './profileinfo.css'
const ProfileInfo = ({ user }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const { user: currentUser } = useContext(AuthContext)
    const selectRelationship = [
        {value: 1, label: "Single"},
        {value: 2, label: "Married"} 
    ]
       
    
    return (
        <>
         {isUpdating 
         ?   <>
             <input type="text" className='inputInfo' placeholder={user.city} />
             <input type="text"  className='inputInfo2' placeholder={user.from} />
             <Select  className='inputSelect' options={selectRelationship}/>
             <div className='optionsButtons'>
             <div className="btn-accept">
                <CheckIcon style={{paddingRight: "5px", marginRight: "5px"}}/>
                <p>Done!</p>
            </div>
            <div className="btn-cancel-toggle" >
                <ClearIcon style={{paddingRight: "5px"}}/>
                <p>Cancel</p>
            </div>
            </div>
             </>
         :  <><h4 className='rightbarTitle'>User information</h4><div className="rightbarInfo">
         <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">City:</span>
             <span className="rightbarInfoValue">{user.city}</span>
         </div>
         <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">Country:</span>
             <span className="rightbarInfoValue">{user.from}</span>
         </div>
         <div className="rightbarInfoItem">
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
     <div className="btn-changeInfo" onClick={() => setIsUpdating(true)}>
                <SettingsIcon style={{paddingRight: "5px"}}/>
                <p>info</p>
            </div>
            </>
             }
        </>
    )
}

export default ProfileInfo