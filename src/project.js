import { useState } from "react"


const numbers = [1,2,3,4,5,6,7,8,9,0]
const operators = ["+","-","*","/"]


export default function Proj(){

    let [nb , setNb] = useState("0")
    const [nb2 , setNb2] = useState("0")
    const [res , setRes] = useState(0.0)
    const [opr , setOpr] = useState("")
    const [b,setB] = useState(false)
    
    return(
        <div className="cont">
            <div>
                <input type="text" className="show" value={(b===false)?parseFloat(nb):parseFloat(nb)+opr+parseFloat(nb2)} disabled />
                {/* (b===false)?parseFloat(nb) means that if we dont click on any operator the operations input will show nb only wich is the first number */}
            </div>

            <div className="numbers_container">
                {
                    numbers.map(nbres=><input type="number" onClick={(e)=>{b===false?setNb(nb+e.target.value):setNb2(nb2+e.target.value)}} readOnly value={nbres}/>)
                    // if b === false that means that we didn't click on an oparator so we are just gonna take nb else we gonna take the second number nb2
                }
                
                {
                    operators.map(op=><input type="text" className="op" onClick={(e)=>{setOpr(e.target.value) ; setB(true) ; res!==0?setNb(parseFloat(res)):setNb(nb)}} readOnly value={op}/>)
                    // res!==0?setNb(parseFloat(res)):setNb(nb)} means if we want to do a second operation with the first result we can 
                }
                
                <input type="text" id="res" readOnly value={"="} onClick={()=>{

                    if (opr === "+"){
                        setRes(parseFloat(parseFloat(nb) + parseFloat(nb2)))
                    }
                    else if (opr === '-'){
                        setRes(parseFloat(parseFloat(nb) - parseFloat(nb2)))
                    }
                    else if (opr === '*'){
                        setRes(parseFloat(parseFloat(nb) * parseFloat(nb2)))
                    }
                    else{
                        if(nb2 !== 0){
                            setRes(parseFloat(parseFloat(nb) / parseFloat(nb2)))
                        }
                        else{
                            setRes('Impossible');
                            setTimeout(()=>window.location.reload(false),1000)
                        }
                    }
                    setNb2('0') //to initialise nbr2 for the next operation
                    setNb('0') //to bring the oparations input to 0
                    setOpr(''); //to initialise the operator for the next operation
                    setB(false) //to tell the operator that we r gonna do another operation
                }}/>
                
            </div>
            <div>
                <input type="text" className="show" disabled value={parseFloat(res)} />
            </div>
            <div className="reset_cont">
                <button onClick={()=>{window.location.reload(false)}}>Reset</button>
                {/* refreshs the page to start a new operation */}
            </div>
        </div>
    )
}
