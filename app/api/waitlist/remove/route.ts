import { database, tokenHash, validOrigin } from "@/lib/waitlist";
export async function POST(request:Request){
 if(!validOrigin(request))return Response.json({error:"Please use the removal page on this website."},{status:403});
 let p:{token?:unknown};try{p=await request.json() as {token?:unknown};}catch{return Response.json({error:"Invalid removal link."},{status:400});}
 if(typeof p.token!=="string"||p.token.length!==72)return Response.json({error:"Use the complete removal link shown after signup."},{status:400});
 try{await database().prepare("DELETE FROM waitlist WHERE removal_token_hash = ?").bind(await tokenHash(p.token)).run();return Response.json({ok:true},{headers:{"Cache-Control":"no-store"}});}
 catch{console.error("Waitlist removal storage failed");return Response.json({error:"Removal is temporarily unavailable. Please try again shortly."},{status:503});}
}
