import React, { Component } from 'react';
import Input from '../components/Input';
import {withTranslation} from 'react-i18next';
import { login } from '../api/apiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';

class LoginPage extends Component {

    state = {
        username: null,
        password: null,
        error: null,
       
    };

    
    
    onChangePassword = event => {
        const {name, value} = event.target.value;
        this.setState({
            [name]: value,
            error: null
        });
        this.state.password=event.target.value;

    };

    onChangeName= event => {
        const {name, value} = event.target.value;
        this.setState({
            [name]: value,
            error: null
        });
        this.state.username=event.target.value;
    };

    onClickLogin = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        const creds = {
            username,
            password
        };
        this.setState({
            error: null
        })
        try {

           await login(creds) 
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            })
        }

    };
 
    render() {
        const { t, pendingApiCall } = this.props;
        const { username, password, error } = this.state;
        const buttonEnabled = username && password;
    
        return (
            
               <div className = "container"> 
              <form> 
                <h1 className="text-center">{t('Login')}</h1> 
                <Input name = "Username"  label={t("Username")} onChange={this.onChangeName}/>
                <Input name = "Password"  label={t("Password")} onChange={this.onChangePassword} type= "password" />
                {error && <div className="alert alert-danger" >{error}</div>}
                <div className="text-center">
                    <ButtonWithProgress onClick={this.onClickLogin} disabled={!buttonEnabled || pendingApiCall} pendingApiCall={pendingApiCall}   text = {t('Login')}/>
                </div>
              </form>
            </div>
        );
    }
}

export default withTranslation()(LoginPage);