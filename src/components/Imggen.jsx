import React ,{useRef, useState}from 'react'
// import "./imagegen.css"
import aiimage from "../assets/aiimage.png"
import dwnld from "../assets/download.png"
const Imggen = () => {
  const [imgurl, setimgurl] = useState("/");
  const [loader, setloader] = useState(false);
  const [download, setdownload] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [inputValuetwo, setinputValuetwo] = useState("");
const [apikey, setapikey] = useState("");
const run=()=>{
  localStorage.setItem("name",apikey)
  // console.log(apikey)
  
}
  
  let inputref= useRef(null)

  const imgGenerate=async()=>{
if(inputref.current.value===""){
  return 0
}

setloader(true)
// https://api.edenai.run/v2/image/generation
const response =await fetch('https://api.edenai.run/v2/image/generation ',
  {method:"POST",
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("name")}`,
    },
  body:JSON.stringify(  {"providers": "openai",
    "text": inputValue,
    "resolution": "1024x1024",
    "num_images": 1})
})


let data =await response.json()
// console.log(data)
setimgurl( data.openai.items[0].image_resource_url)
setdownload(true)
setloader(false)
setTimeout(() => {
  setdownload(false)
}, 17000);
  }
  return (
    <>
    <div className="ai-header">
        <div className='heading'><h1>Ai image <span>generator</span></h1></div>

<div style={{display:"flex",gap:"10px", justifyContent:"center" }} className="imgloader">
    <div className="image">
        <img className='imgai'  src={imgurl==="/"?aiimage :imgurl } alt="error" /> 
    </div>

   
    </div>
    <div className="loading-bar">
      <div className={loader?"loading-full":"loading"}></div>
      <p className={loader?"loadinig-text":"none"} style={{color:"whitesmoke"}}>loading...</p>
    </div>

    <div className="inputfield">
        <input type="text" ref={inputref} onChange={(e)=>{setinputValue(e.target.value)}}  className='searchbox ' placeholder='Describe What You Want To See'/>
        <div style={{display:"flex",gap:"10px", justifyContent:"center",alignItems:"center"}}>
        <button disabled={ inputValue===""}   onClick={imgGenerate}  className='btn'>Generate</button>
        {download&&<a href={imgurl}  style={{borderRadius:"20px"}} download="Ai-image" > <img style={{width:"30px"}} src={dwnld} alt="error" /></a>}
        </div>
    </div>
    <div className="inputfield">
        <input type="text"   onChange={(e)=>{setapikey(e.target.value),setinputValuetwo(e.target.value)}}  className='searchbox box2' placeholder='signup-in edenai and add your apikey'/>
        <div style={{display:"flex",gap:"10px", justifyContent:"center",alignItems:"center"}}>
        <button disabled={inputValuetwo===""}  onClick={run}  className='btn'>SetKey</button>
        <a    href='https://app.edenai.run/user/register' style={{textDecoration:"none" , backgroundColor:"rgb(0 227 255)",fontFamily:"cursive" ,fontWeight:"bold", borderRadius:"28px",padding:"16px",color:"black"}} >edenai</a>
        </div>
    </div>
  
    </div>
   
    </>
  )
}

export default Imggen
{/* <div className="inputfield">
<div style={{display:"flex", gap:"10px", justifyContent:"center",alignContent:"center"}}>
  <input onChange={(e)=>{setapikey(e.target.value)}} type="text" placeholder='please describe yur api key ' className='searchbox'/>
  <button onClick={run} className='btn'>load</button>
</div>
</div> */}