import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = apiPath => {
    const [ pendingApiCall, setPendingApiCall] = useState(false)

    useEffect(() => {
        let requestInterceptor, responseInterceptor;

        const updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                setPendingApiCall(inProgress);
            }
        };
        const registerInterceptor = () => {
            requestInterceptor = axios.interceptors.request.use(request =>  {
                updateApiCallFor(request.url, true);
                return request;
            });
            responseInterceptor = axios.interceptors.response.use( 
                response => {
    
                    updateApiCallFor(response.config.url, false);
                    return response;
                } , 
                error =>  {
                    updateApiCallFor(error.config.url, false)
                    throw error;
                }
            );

        }
        const unregistorInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    

        registerInterceptor();

        return function unmount() {
            unregistorInterceptors();
        }
    });

    return pendingApiCall;

}


function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component' ;
}

export function withApiProgress(WrappedComponent, apiPath ) {
    return class extends Component {

        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;

        state = {
            pendingApiCall: false
        };
        componentDidMount() {
            this.registerInterceptor();
        }
        
        componentWillUnmount() {
            this.unregistorInterceptors();
        }
        registerInterceptor = () => {   
        };
        

        unregistorInterceptors = () => {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        

        

        render() {
           const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall;
           return <WrappedComponent { ...this.props}  pendingApiCall= {pendingApiCall} />;
        }
    };
}

