import { database, tokenHash, validOrigin } from "@/lib/waitlist";
export async function POST(request:Request){
 if(!validOrigin(request))return Response.json({error:"Please submit the form from this website."},{status:403});
 if(Number(request.headers.get("content-length"))>4096)return Response.json({error:"Please enter only your email address."},{status:413});
 let p;try{p=JSON.parse(await request.text());}catch{return Response.json({error:"Please check your email and try again."},{status:400});}
 if(p.website)return Response.json({ok:true});
 const email=typeof p.email==="string"?p.email.trim().toLowerCase():"";
 if(email.length>254||!/^\S+@\S+\.\S+$/.test(email)||typeof p.testing!=="boolean")return Response.json({error:"Please enter a valid email address."},{status:400});
 try{
  const token=crypto.randomUUID()+crypto.randomUUID(),hash=await tokenHash(token);
  const result=await database().prepare("INSERT INTO waitlist (email, testing, removal_token_hash) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING").bind(email,p.testing?1:0,hash).run();
  return Response.json({ok:true,removalToken:result.meta.changes>0?token:null},{headers:{"Cache-Control":"no-store"}});
 }catch{console.error("Waitlist signup storage failed");return Response.json({error:"We couldn’t save your signup right now. Your email is still here—please try again shortly."},{status:503});}
}
