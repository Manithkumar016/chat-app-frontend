import React, { useState, useEffect } from "react";
import "./main.css";
import "bootstrap/dist/css/bootstrap.css";
import { styled } from "styled-components";
import avatar1 from "../image/avatar1.png";
import avatar2 from "../image/avatar2.png";
import avatar3 from "../image/avatar3.jpg";
import { useNavigate } from "react-router-dom";
import { contactRoute, userRoute } from "../Utils/APIRouters";
import List from "./List";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import robot from "../Assets/robot.gif"

function Mainpage() {
  window.onpopstate = () => {
    // URL fragment has changed, perform actions here
    navigate("/main");
  };
  const [isclick, setisclick] = useState(false);
  const [isclicklist, setisclicklist] = useState(false);
  const [contacts,setcontacts]=useState([]);

  const handlelist1 = () => {
    setisclicklist(!isclicklist);
    setisclick(false);
  };

  

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([avatar1, avatar2, avatar3]);
  const [userData, setUserData] = useState({});
  const UN = localStorage.getItem("username");

  useEffect(() => {
    const fetchuserdata = async () => {
      try {
        const response = await fetch(`${userRoute}${UN}`);
        const data = await response.json();
        setUserData(data.user);
        // console.log(userData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchuserdata();
  }, []);


  useEffect(() => {
    const fetchuserdata2 = async () => {
      try {
        const response = await fetch(`${contactRoute}`);
        const data = await response.json();
        setcontacts(data.user);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchuserdata2();

  }, []);


  const handlelist2 = () => {
    localStorage.setItem("username", "");
    navigate("/login");
  };

  const searchHandler = () => {
    setseachvalue2(searchvalue);
    setsearchvalue3(true);
    setTimeout(() => {
      setsearchvalue3(false);
      setseachvalue2("");
    }, 5000);
  };
  const [contactindex,setcontactindex]=useState(0);
  const contacthandle=(index)=>{
    setisclicklist(true);
    setcontactindex(index);
  }

  return (
    <>
      <section>
        <div style={{ padding: "unset" }} className="ctn1 container">
          {/* navbar */}
          <div className="nav">
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
              <div className="container-fluid">
                <div className="product">
                  <div>
                    <img
                      className="image"
                      src={avatars[userData.index]}
                      alt=""
                    />
                  </div>
                  <div className="bname">
                    <a
                      style={{ color: "aqua" }}
                      className="navbar-brand"
                      href="#"
                    >
                      {UN}
                    </a>
                  </div>
                  
                </div>
                <h1 className="chit-chat">Chit-Chat</h1>
                <div className="navbar-nav ">
                    <input
                      type="text"
                      placeholder="Search"
                    ></input>
                    <IconButton>
                      <SearchIcon onClick={searchHandler} />
                    </IconButton>
                    
                </div>
                
              </div>
            </nav>
          </div>
          {/* navbar close */}
          <div className="play">
            <div className="container sidebar">
            <h4 className="oned"><b>Contacts</b></h4>
            <i  className="onec"><ConnectWithoutContactIcon></ConnectWithoutContactIcon></i>
              <div className="container contacts">
                {
                  contacts.map((contact,index)=>{
                    return(
                      <a href="#" onClick=
                      {()=>contacthandle(index)} style={{textDecoration:"none",color:"black"}}> 
                        <div className="single_contact">
                        <img className="onea" src={avatars[contact.index]}></img>
                        <h5 className="onee"><b>{contact.username}</b></h5>
                      </div>
                    </a>
                    )
                  })
                }
                      
              </div>
              <button className="btn btn-primary logout" onClick={handlelist2}>
                Log Out
              </button>
            </div>
            <div className="listbody">
              
              {!isclick && isclicklist && (
                <h1>hiiii</h1>
                <List handlelist={handleDONE} searchvalue={searchvalue2} issearch={searchvalue3} handlelist1={handlelistt} handleDONE={handleDONE}
                handleCancel={handleCancel} contacts={contacts}  contactindex={contactindex} />
              )}
              {
                !isclicklist && 
                (
                  <div style={{display:"grid",justifyContent:"center",zIndex:"100"}}>
                    <img src={robot} alt="robot" />
                    <h1>hii</h1>
                  </div>
                )
              }
            </div>
            
          </div>
          <div className="addtolist">
            <div className="parent">
              <div className="child">{/* <List/> */}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Mainpage;

const side = styled.div`
  background-color: rgb(2, 2, 65);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: start;
  width: 0vw;
  height: 74.5vh;
`;
