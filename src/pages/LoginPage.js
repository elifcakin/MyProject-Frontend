import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import {useTranslation} from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';

import { useDispatch } from 'react-redux';
import { loginHandler} from '../redux/authActions';

const LoginPage = (props) => {
  

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError ] = useState();
    
    const  dispatch  = useDispatch();

    useEffect(() => {
        setError(undefined)
    }, [username,password])
    
    
    
    // state = {
    //     username: null,
    //     password: null,
    //     error: null,

    // };

    // const onChangePassword = event => {
        // const {name, value} = event.target.value;
        // this.setState({
        //     [name]: value,
        //     error: null
        // });
        // this.state.password=event.target.value; //silme
    // };

    // const onChangeName= event => {
    //     const {name, value} = event.target.value;
        // this.setState({
        //     [name]: value,
        //     error: null
        // });
        // this.state.username=event.target.value; //silme
    // };

    const onChange = event => {
        const { name, value} = event.target;
        if ( name === 'username') {
            setUsername(value)
        } else {
            setPassword(value)
        }

    }

    const onClickLogin = async event => {
        event.preventDefault();
        // const { username, password } = this.state;
        const creds = {
            username,
            password
        };

        
        const { history } = props;
        const { push } = history;

        // this.setState({
        //     error: null
        // })
        setError(undefined);
        try {
            await dispatch(loginHandler(creds))
            push('/');
        }   catch (apiError) {
            setError(apiError.response.data.message);
            // this.setState({
            //   error: apiError.response.data.message
            // })
            }
    };

        const { t } = useTranslation();
        const pendingApiCall  = useApiProgress('/api/1.0/auth');
        

        const buttonEnabled = username && password;

        return (
               <div className = "container">
                <form>
                    <h1 className="text-center">{t('Login')}</h1>
                    <Input  label={t("Username")}  onChange={event => setUsername(event.target.value)} />
                    <Input  label={t("Password")}   type= "password" onChange={event => setPassword(event.target.value) }/>
                    {error && <div className="alert alert-danger" >{error}</div>}
                <div className="text-center" style={{margin:"10px"}}>
                    <ButtonWithProgress onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall} pendingApiCall={pendingApiCall}   text = {t('Login')}/>
                </div>
              </form>
            </div>
        );

}



export default LoginPage;