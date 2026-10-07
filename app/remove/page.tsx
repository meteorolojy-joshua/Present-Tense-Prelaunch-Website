"use client";
import {useState} from "react";
export default function Remove(){
 const [status,setStatus]=useState("idle"),[error,setError]=useState("");
 async function remove(){setStatus("saving");try{const token=new URLSearchParams(window.location.hash.slice(1)).get("token");const r=await fetch("/api/waitlist/remove",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token})});if(!r.ok){const data=await r.json() as {error?:string};throw new Error(data.error);}setStatus("done");history.replaceState(null,"","/remove");}catch(e){setStatus("idle");setError(e instanceof Error?e.message:"Please try again.");}}
 return <main className="wrap privacy-page"><a href="/">Present Tense · Back to the website</a><p className="eyebrow" style={{marginTop:40}}>Your waitlist signup</p><h1>{status==="done"?"You’re off the list.":"Remove your signup?"}</h1>{status==="done"?<p role="status">Your signup has been removed if this link matched an entry. Thank you for your interest in Present Tense.</p>:<><p>This removes the signup associated with your personal removal link, including its paid testing preference.</p><button className="button" disabled={status==="saving"} onClick={remove}>{status==="saving"?"Removing…":"Confirm removal"}</button>{error&&<p role="alert" className="form-error">{error}</p>}</>}</main>
}
