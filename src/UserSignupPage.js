import React from 'react';

class UserSignupPage extends React.Component{

    state = {
        username: null 
    };
    onChangeUsername = event => {
        console.log(event.target.value);
        this.state.username = event.target.value;
    };

    render() {
        return(
            <form>
               <h1>Sign Up</h1> 
               <div>
                <label>Username</label>
                <input onChange={this.onChangeUsername} />
               </div>
               <div>
                <label>Display Name</label>
               <input />
               </div>
               <div>
                <label>Password </label>
                <input type= "password"/>
               </div>
               <div>
                <label>Password Repeat </label>
                <input type= "password"/>
               </div>
               <input type= "checkbox" /> Agreed
               <button>Sign Up</button>
               
            </form>
            
        );
    }
}

export default UserSignupPage; 