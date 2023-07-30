function validation(values){
    let error={}
    const email_pattern=/^[A-Z0-9._%+-]+@[A-Z0-9]+\.[A-Z]{2,4}$/i;
    const password_pattern=/[0-9]/
    if(values.email===""){
      error.email=""
    }else if(!email_pattern.test(values.email)){
      error.email="Please enter valid email"
    }else{
      error.email=""
    }
    if(values.password===""){
      error.password=""
    }else if(!password_pattern.test(values.password)){
      error.password=""
    }else{
      error.password=""
    }
    return error;
  }
  export default validation;