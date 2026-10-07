"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const categories=[
 {name:"Personality Traits",image:"leaf-traits",color:"#ddd3eb",title:"My humorous side",words:"I like making jokes with my close friends. I want to make room for that side of me, and seek company where I feel safe enough to let it show."},
 {name:"Interests",image:"leaf-interests",color:"#f5df9e",title:"Drawing for myself",words:"I enjoy drawing when no one is watching. When other demands fill my week, I want to leave some time for drawing just for myself."},
 {name:"Places",image:"leaf-places",color:"#dbe6c5",title:"A quiet library corner",words:"The quiet corner of the library feels like somewhere I can settle into myself. When everything feels demanding, I want to give myself permission to spend time there."},
];
export function PlantPreview({onOpen,title="My humorous side",image="leaf-traits"}:{onOpen?:()=>void;title?:string;image?:string}){
 const leaves=[
  {side:"right",image:"leaf-places",title:"A place I feel at home",flip:true},
  {side:"left",image:"leaf-interests",title:"Drawing for myself",flip:true},
  {side:"right",image:"leaf-feelings",title:"Room for my feelings",flip:false},
  {side:"left",image,title,flip:image==="leaf-interests"},
 ];
 return <div className="faithful-plant" aria-label="A plant with leaves alternating along its stem">
  <img className="faithful-stem" src="./images/stem.svg" alt=""/><img className="faithful-pot" src="./images/pot.svg" alt=""/>
  {leaves.map((leaf,i)=><div key={i} className={"plant-row row-"+i+" "+leaf.side}>
   <span className="leaf-label">{leaf.title}</span>
   {onOpen&&i===3?<button className="attached-leaf" aria-label={"Revisit "+title} onClick={onOpen}><img src={"./images/"+leaf.image+".svg"} style={{transform:leaf.flip?"scaleX(-1)":undefined}} alt=""/></button>:<img className="attached-leaf" src={"./images/"+leaf.image+".svg"} style={{transform:leaf.flip?"scaleX(-1)":undefined}} alt=""/>}
  </div>)}
 </div>;
}

export default function ExplorationDemo(){
 const [step,setStep]=useState("write"),[category,setCategory]=useState("0");
 const [drafts,setDrafts]=useState(categories.map(c=>({title:c.title,words:c.words})));
 const selected=Number(category),draft=drafts[selected],c=categories[selected];
 function update(field:"title"|"words",value:string){setDrafts(prev=>prev.map((d,i)=>i===selected?{...d,[field]:value}:d));}
 return <Tabs value={step} onValueChange={setStep} className="exploration-tabs">
  <TabsList aria-label="Steps in the plant exploration" className="demo-steps">
   <TabsTrigger value="choose"><span>1</span>Choose a leaf</TabsTrigger>
   <TabsTrigger value="write"><span>2</span>Write into it</TabsTrigger>
   <TabsTrigger value="keep"><span>3</span>Revisit it</TabsTrigger>
  </TabsList>
  <TabsContent value="choose" className="demo-surface">
   <h3>What would you like to keep?</h3><p>Choose a category for your leaf.</p>
   <RadioGroup value={category} onValueChange={setCategory} aria-label="Leaf category" className="category-options">
    {categories.map((c,i)=><label className="category-option" htmlFor={"category-"+i} key={c.name}><RadioGroupItem value={String(i)} id={"category-"+i}/><img src={"./images/"+c.image+".svg"} alt=""/><span>{c.name}</span></label>)}
   </RadioGroup>
   <button className="button" onClick={()=>setStep("write")}>Write on this leaf</button>
  </TabsContent>
  <TabsContent value="write" className="demo-surface">
   <form className="leaf-writing-panel" style={{backgroundColor:c.color}} onSubmit={e=>{e.preventDefault();setStep("keep");}}>
    <h3>{c.name}</h3><label htmlFor="leaf-title">Title</label><input id="leaf-title" value={draft.title} maxLength={60} onChange={e=>update("title",e.target.value)} required/>
    <label htmlFor="leaf-words">What would you like to grow?</label><textarea id="leaf-words" value={draft.words} maxLength={1500} onChange={e=>update("words",e.target.value)} rows={5}/>
    <button className="button" type="submit">Place on the plant</button>
   </form>
  </TabsContent>
  <TabsContent value="keep" className="demo-surface kept-plant">
   <PlantPreview title={draft.title||"My leaf"} image={c.image} onOpen={()=>setStep("write")}/>
   <p>Revisit your leaf. How might these words guide a choice you are facing?</p><button className="text-link" onClick={()=>setStep("write")}>Revisit {draft.title||"my leaf"}</button>
  </TabsContent>
  <p className="demo-note">Try the example. Changes stay in this page while it is open; they are not sent or saved. This is a simplified demonstration of the prototype.</p>
 </Tabs>;
}
