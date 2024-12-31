import react from "react";
import { useState } from "react";


const useInput=(validateInput)=>{
    const [value, setValue] = useState('');
    const [InputTouched, setInputTouched] = useState(false);

    const valueIsValid = validateInput(value)
    // const valueIsValid = ""//value.trim() !== ''; // this should be generic
    const hasError = InputTouched && !valueIsValid;
    // const InputisInValid = InputTouched && !valueIsValid; // haserror to add invlaid css classes 

    const InputValueHandler = (event) => {
    setValue(event.target.value);
    
      };

    const onBlurInputValueHandler=()=>{
        if (value.trim() === "") {
          setInputTouched(true)
          return;
        }
        
    
      }
    const resetForm = ()=>{
        setValue('')
        setInputTouched(false)
    }


return{
    valueIsValid,
    value,
    hasError,
    onBlurInputValueHandler,
    resetForm,
    InputValueHandler
}
}

export default useInput;


// crap

// const InputValueHandler = (event) => {
    
//     setValue(event.target.value);  // react shedules that state  update so validation event.target.value ko upr logic

//     // Tried and this is not instant 
//     // if (name.trim()!=='') {
//     //   setEnterNameIsValid(true)
      
//     // }
    
//     // if (enterNameIsValid) {
//     //   // setEnterNameIsValid(true)
      
//     // } 

//   };

// const onBlurInputHandler=()=>{
    // if (name.trim() === "") {
//       setInputTouched(true)
//       console.log("galat");
//       // setEnterNameIsValid(false);
//       return;
//     }
    

//   }