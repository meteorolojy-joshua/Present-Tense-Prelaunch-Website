export default function Waitlist({url}:{url:string|null}){
 return <div className="signup-card">
  <h3>{url?"Be here for what comes next.":"Waitlist opening soon."}</h3>
  {url?<><p>Use our signup form to join the list and choose whether you’re interested in paid user testing.</p><a className="button" href={url} target="_blank" rel="noopener noreferrer">Join the waitlist</a><p className="small-note">The signup form opens in a new tab. Review its privacy information before submitting.</p></>:<><p>Present Tense is still taking shape. Signups aren’t open yet—please check back here.</p><p className="small-note">When the waitlist opens, you’ll also be able to express interest in paid user testing. Details and compensation will be confirmed before you decide whether to participate.</p></>}
  <p className="consent"><a href="./privacy.html">Signup privacy</a></p>
 </div>;
}
