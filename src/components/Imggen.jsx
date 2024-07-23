import React ,{useRef, useState}from 'react'
// import "./imagegen.css"
import aiimage from "../assets/aiimage.png"
import dwnld from "../assets/download.png"
const Imggen = () => {
  const [imgurl, setimgurl] = useState("/");
  const [loader, setloader] = useState(false);
  const [download, setdownload] = useState(false);
  const [inputValue, setinputValue] = useState("");

  
  let inputref= useRef(null)

  const imgGenerate=async()=>{
if(inputref.current.value===""){
  return 0
}

setloader(true)
// https://api.edenai.run/v2/image/generation
const response =await fetch('https://api.edenai.run/v2/image/generation',
  {method:"POST",
    headers: {
      'content-type': 'application/json',
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTg1ZTMwMGQtOGFlYy00MGYwLWE4MmYtMTkxMzBjYTNhMDlkIiwidHlwZSI6ImFwaV90b2tlbiJ9.YdpLBKjObVyA6U_XENVeyOLXC6eBLZK8wfO1v8sWhnE",
    },
  body:JSON.stringify(  {     providers: "openai",
    text: inputValue,
    resolution: "1024x1024",  "num_images": 1})
})

let data =await response.json()
console.log(data)
let img =data.openai.items
setimgurl(img[0].image_resource_url)
setdownload(true)
setloader(false)
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
    </div>
   
    </>
  )
}

export default Imggen
