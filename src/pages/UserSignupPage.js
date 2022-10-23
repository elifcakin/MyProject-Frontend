import axios from 'axios';
import React from 'react';
import { signup, changeLanguage } from '../api/apiCalls';
import Input  from '../components/Input';
import {withTranslation} from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { signupHandler } from '../redux/authActions';

class UserSignupPage extends React.Component{

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    };

    onChange = event => {
       const { t } = this.props; 
       const { name, value } = event.target;
       console.log(event.target)
       const errors = {...this.state.errors}
       errors[name] = undefined;

       if ( name === 'password' || name === 'passwordRepeat') {
          if( name === 'password' && value !== this.state.passwordRepeat  ) {
            errors.passwordRepeat = t('Password mismatch');
          } else if (name === 'passwordRepeat' && value !== this.state.password) {
            errors.passwordRepeat = t('Password mismatch');

          }else {
            errors.passwordRepeat = undefined;
          }
       }
        this.setState({
            [name]:value,
            errors 
        });
    };

    onChangeUserName = event => {
      this.state.username=event.target.value
    };
    onChangePassword = event => {
      this.state.password=event.target.value
    };
    onChangePasswordRepeat = event => {
      this.state.passwordRepeat=event.target.value
    };

    onChangeDisplayName = event => {
      this.state.displayName=event.target.value
    };

    onClickSignup = async  event => {
      

        event.preventDefault();

        const { history, dispatch } = this.props;
        const { push } = history;
        const { username, displayName, password} = this.state;

       
        const body = {
            username,
            displayName,
            password
        };
       
        console.log('body')
        console.log(body)
      
        try {
          await dispatch(signupHandler(body));
          push('/');
        } catch  (error) {
            if (error.response.data.validationErrors) {
             this.setState({error: error.response.data.validationErrors});
            }
          }
 
    };

;
    
    render() {
        const {errors } = this.state; 
        const { username , displayName, password, passwordRepeat} = errors;
        const { t, pendingApiCall } = this.props;
        this.state.password= this.state.passwordRepeat;   
        return(
            <div className = "container "> 
              <form>
                <h1 className="text-center " >{t('Sign Up')}</h1> 
                <Input name = "username " label={t("Username")} error={username} onChange={this.onChangeUserName} />
                <Input name = "displayName" label={t("Display Name")} error={displayName} onChange={this.onChangeDisplayName} />
                <Input name = "passsword" label={t("Password")} error={password} onChange={this.onChangePassword} type= "password" />
                <Input name = "passwordRepeat" label={t("Password Repeat")} error={passwordRepeat} onChange={this.onChangePasswordRepeat} type= "password" />
                <div className="text-center " style={{margin:"10px"}}>
                 <ButtonWithProgress 
                  onClick= {this.onClickSignup} 
                  disabled={pendingApiCall || passwordRepeat !== undefined} 
                  pendingApiCall={pendingApiCall} 
                  text = {t('Sign Up ')}
                 />  
               </div>
              </form>
            </div> 
        );
    }
}

const UserSignupPageWithApiProgressForSiqnupRequest = withApiProgress(UserSignupPage, '/api/1.0/users');
const UserSignupPageWithApiProgressForAuthRequest = withApiProgress(UserSignupPageWithApiProgressForSiqnupRequest, '/api/1.0/auth')
const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgressForAuthRequest);

export default connect()(UserSignupPageWithTranslation); 
