
import { useEffect,  useState } from "react";
import { useRef } from "react";
import useInput from "../hooks/use-input";
const SimpleInput = (props) => {

  // const {hasError:enteredNameIsInValid,value:name}
  const NameInputRef = useRef();
  const [name, setName] = useState('');
  // const [age,setAge]  // imaginary for illustrating multiple input fields 
  const [InputTouched, setInputTouched] = useState(false);
// ==
  // islo replacing =========with let 
  // const [formIsValid,setFormIsValid]= useState(false)  // states for overall form validity
  // const [enterNameIsValid, setEnterNameIsValid] = useState(false); 
  const enterNameIsValid = name.trim() !== '';
  // const EnteredAgesValid = ""   // if there is some Age input field 

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setInputTouched(true);
    if (!enterNameIsValid) {          // ye change 
      NameInputRef.current.focus()
      return;
    }

    // setEnterNameIsValid(true);
    console.log("Ref se lia gya input", NameInputRef.current.value);
    console.log("states se lia gya input", name);
    // NameInputRef.current.value = ''
    setName("");
    NameInputRef.current.focus()
    setInputTouched(false) // ye islia add krna para coz hm name empty string bna rhy thy so phr se invalid ho rha th once the form is submitted it will behave like it never be submitted 
  };

  // LET A FORMISVALID STATE INSTEAD OF USEEFFECT  

  let formIsValid = false
  if (enterNameIsValid) {
    formIsValid = true
    
  }
//----iski jagah let 
//   useEffect(() => {
//     // if (enterNameIsValid && EnteredAgesValid) {  // entered age is only when there is an age input field 
//     setFormIsValid(false)
//     if (enterNameIsValid)
//      {  // entered age is only when there is an age input field 
//     setFormIsValid(true)   
//    }


//     // if (enterNameIsValid) {
//     //   console.log("http request to  nabiha");
//     // }


//   }, [enterNameIsValid]);
// //----
  
  // ======= Ye wala function 
  const InputHandler = (event) => {
    
    setName(event.target.value);  // react shedules that state  update so validation event.target.value ko upr logic

    // Tried and this is not instant 
    // if (name.trim()!=='') {
    //   setEnterNameIsValid(true)
      
    // }
    
    // if (enterNameIsValid) {
    //   // setEnterNameIsValid(true)
      
    // } 

  };


  // setting blur input handler -------------------------
  const onBlurInputHandler=()=>{
    if (name.trim() === "") {
      setInputTouched(true)
      console.log("galat");
      // setEnterNameIsValid(false);
      return;
    }
    

  }

  const InputisInValid = InputTouched && !enterNameIsValid; // ye initially false ha // Inpput touch ke baad hi true ho aa ga


  const nameInputClasses = InputisInValid
    ? "form-control invalid"
    : "form-control";
  // const classes = enterNameIsValid ? "form-control" : "form-control invalid"
  return (
    <form onSubmit={onSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          value={name}
          onChange={InputHandler}
          ref={NameInputRef}
          type="text"
          id="name"
          onBlur={onBlurInputHandler}
        />
      </div>
      {InputisInValid && <p className="error-text">Invalid input </p>}
      <div className="form-actions">
        <button  disabled={!formIsValid} type="submit">Submit</button>
        {/* <button className={!formIsValid&&"disabled"} disabled={!formIsValid} type="submit">Submit</button> */}
      </div>
    </form>
  );
};

export default SimpleInput;
