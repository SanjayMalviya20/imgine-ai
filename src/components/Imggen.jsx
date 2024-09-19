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
const [error, seterror] = useState(false);
const run=()=>{
  localStorage.setItem("name",apikey)
  setapikey("")
}
  


  const imgGenerate=async()=>{
if(inputValue===""){
  return 0
}
setloader(true)
// https://api.edenai.run/v2/image/generation
// const response =await fetch('https://api.edenai.run/v2/image/generation ',
//   {method:"POST",
//     headers: {
//       'content-type': 'application/json',
//       authorization: `Bearer ${localStorage.getItem("name")}`,
//     },
//   body:JSON.stringify(  {"providers": "openai",
//     "text": inputValue,
//     "resolution": "1024x1024",
//     "num_images": 1})
// })
try {
const response =await fetch('https://modelslab.com/api/v6/realtime/text2img',
  {method:"POST",
    headers: {
      'content-type': 'application/json',
    },
  body:JSON.stringify(  {
    key :!localStorage.getItem("name")?"irOtlUJWXmhp4iIFMiG6rPCY1pBKjainx1ShF4zMBqVE1M5H8ypgLuTRrZH5":localStorage.getItem("name"),
    prompt: inputValue,
    negative_prompt: "bad quality",
    width: "512",
    height: "512",
    safety_checker: false,
    seed: null,
    samples:1,
    base64:false,
    webhook: null,
    track_id: null

  }),
  redirect:"follow"
})

const data =await response.json()
console.log(data)
setimgurl( data.proxy_links[0])
setdownload(true)
setloader(false)
setTimeout(() => {
  setdownload(false)
}, 17000);

  
} catch (error) {
console.log(error)
error&&seterror(true)
setloader(false)
}
 }
  // console.log(apikey)
  return (
    <>
    <div className="ai-header">
        <div className='heading'>{error?<h1 style={{color:"#247aff", fontFamily:"monospace", fontSize:"30px"}}>set api key🙃</h1>:<h1>Ai image <span>generator</span></h1>}</div>
<div style={{display:"flex",gap:"10px", justifyContent:"center" }} className="imgloader">
    <div className="image">
        <img className='imgai'  src={imgurl==="/"?aiimage:imgurl } alt="error" /> 
    </div>

    </div>
    <div className="loading-bar">
      <div className={loader?"loading-full":"loading"}></div>
      <p className={loader?"loadinig-text":"none"} style={{color:"whitesmoke"}}>loading...</p>
    </div>

    <div className="inputfield">
        <input type="text" onKeyDown={(e)=>{e.key==="Enter"?imgGenerate():0}}   onChange={(e)=>{setinputValue(e.target.value)}} value={inputValue}  className='searchbox ' placeholder='Describe What You Want To See'/>
        <div style={{display:"flex",gap:"10px", justifyContent:"center",alignItems:"center"}}>
        <button disabled={ inputValue===""}   onClick={imgGenerate}  className='btn'>Generate</button>
        {download&&<a href={imgurl}  style={{borderRadius:"20px"}} download> <img style={{width:"30px"}} src={dwnld} alt="error" /></a>}
        </div>
    </div>
    <div className="inputfield">
        <input type="text" value={apikey}   onChange={(e)=>{setapikey(e.target.value),setinputValuetwo(e.target.value)}}  className='searchbox box2' placeholder='signup-in edenai and add your apikey'/>
        <div style={{display:"flex",gap:"10px", justifyContent:"center",alignItems:"center"}}>
        <button disabled={inputValuetwo===""}  onClick={run}  className='btn'>SetKey</button>
        <a href='https://docs.modelslab.com/image-generation'  style={{textDecoration:"none" , backgroundColor:"rgb(0 227 255)",fontFamily:"cursive" ,fontWeight:"bold", borderRadius:"28px",padding:"16px",color:"black"}} >modelslab</a>
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