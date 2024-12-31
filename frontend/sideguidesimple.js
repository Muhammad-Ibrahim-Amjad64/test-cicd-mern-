import { useEffect, useState } from "react";
import { useRef } from "react";
import useInput from "../hooks/use-input";
const SimpleInput = (props) => {
  const nameValidator = (value) => value.trim() !== "";
  const {
    valueIsValid: enterNameIsValid,
    hasError: InputisInValid,
    value: name,
    onBlurInputValueHandler: onBlurInputHandler,
    InputValueHandler: InputHandler,
    resetForm: resetFormHandler,
  } = useInput(nameValidator);

  const NameInputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // setInputTouched(true);   lets test ////===========
    if (!enterNameIsValid) {
      // ye change
      NameInputRef.current.focus();
      return;
    }

    // setEnterNameIsValid(true);
    console.log("Ref se lia gya input", NameInputRef.current.value);
    console.log("states se lia gya input", name);
    // NameInputRef.current.value = ''
    // using reset function of use-hook instead of them ======
    // setName("");
    resetFormHandler();
    setEmail("");  ///+++++++
    setemailTouched(false);//++++++++++++++++++++
    // setInputTouched(false) // ye islia add krna para coz hm name empty string bna rhy thy so phr se invalid ho rha th once the form is submitted it will behave like it never be submitted

    NameInputRef.current.focus();
  };

  // LET A FORMISVALID STATE INSTEAD OF USEEFFECT

  // Email Form ka samaan

  const [email, setEmail] = useState("");
  const [emailTouched, setemailTouched] = useState(false);

  const emailIsValid = email.includes("@"); // yahan validation logic aa a gi
  const emailIsInvalid = emailTouched && !emailIsValid;

  const emailInputHandler = (event) => {
    // setemailTouched(true)
    setEmail(event.target.value);
  };

  const onBlurEmailInputHandler = () => {
    if (email.trim() === "") {
      setemailTouched(true);
      return;
    }
    setemailTouched(true)   // yahan upper walay if ki zaroorat nai ha 

  };

  //---------------------------------
  //  verifying the overall form validity
  let formIsValid = false;
  if (enterNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  // const nameInputClasses = InputisInValid
  const nameInputClasses = InputisInValid
    ? "form-control invalid "
    : "form-control";

  const emailInputClasses = emailIsInvalid
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={onSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // className={ InputisInValid ? "invalid" : ""}
          value={name}
          onChange={InputHandler}
          ref={NameInputRef}
          type="text"
          id="name"
          onBlur={onBlurInputHandler}
        />
      </div>
      {InputisInValid && (
        <p className="error-text">Please enter a valid name </p>
      )}
      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={emailInputHandler}
          onBlur={onBlurEmailInputHandler}
          id="email"
        />
      </div>

      {emailIsInvalid && (
        <p className="error-text">Please enter a valid email </p>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;

// SIMPLIFYING
