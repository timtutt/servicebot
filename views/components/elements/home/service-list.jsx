import React from 'react';
import {browserHistory} from 'react-router';
import Load from '../../utilities/load.jsx';
import Fetcher from "../../utilities/fetcher.jsx"
import {Authorizer} from "../../utilities/authorizer.jsx";
import ServiceListItem from "./service-list-item.jsx"
import SVGIcons from "../../utilities/svg-icons.jsx";
import ServiceBotTableNoData from '../../elements/bootstrap-tables/servicebot-table-no-data.jsx';
let _ = require("lodash");
import { connect } from "react-redux";

class ServiceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: [],
            url: this.props.url || "/api/v1/service-templates/public",
            loading:true,
            width: 0,
        };
    }

    componentDidMount() {
        let that = this;
        Fetcher(that.state.url).then(function(response){
            if(!response.error){
                that.setState({services : response});
            }
            that.setState({loading:false});
        });
    }

    componentDidUpdate(){
        let myItemsList = document.getElementsByClassName('card-wrapper');
        let max = 0;
        for(let i = 0; i < myItemsList.length; i++){
            if(myItemsList[i].clientHeight > max){
                max = myItemsList[i].clientHeight;
            }
        }

        if(this.state.height != max) {
            this.setState({height: max});
        }
    }

    componentWillReceiveProps(nextProps){
        let self = this;
        if(nextProps.url != this.props.url){
            console.log("updated props url", nextProps.url);
            Fetcher(nextProps.url).then(function(response){
                console.log("url response", response);
                if(!response.error){
                    self.setState({services : response});
                }
            })
        }
    }

    render () {
        let {options} = this.props;

        if(this.state.loading)
            return <Load/>;
        if(this.state.services.length<1) {
            return (
                <div>
                    <Authorizer permissions={["can_administrate", "can_manage"]}>
                        <ServiceBotTableNoData
                            title="Welcome to your store!"
                            body="Let's get started by creating your first product / service!"
                            buttonLabel="Create Now!"
                            buttonAction={()=>{browserHistory.push('/manage-catalog/create')}}>
                            <SVGIcons id="custom-field-svg" width="550px" height="400px" viewBoxX="700" viewBoxY="500" fillColor={_.get(options, 'service_template_icon_background_color.value', '#000000')}>
                                <g opacity=".1">
                                    <circle cx="344.14" cy="234.42" r="136.86" fill="#1C75BC"/>
                                </g>
                                <g opacity=".1">
                                    <circle cx="180.56" cy="344.98" r="3.458" fill="#1C75BC"/>
                                </g>
                                <g opacity=".1">
                                    <circle cx="205.66" cy="334.26" r="12.705" fill="#1C75BC"/>
                                </g>
                                <g opacity=".1">
                                    <circle cx="513.93" cy="230.63" r="9.855" fill="#1C75BC"/>
                                </g>
                                <g opacity=".1">
                                    <circle cx="509.21" cy="215.85" r="3.778" fill="#1C75BC"/>
                                </g>
                                <g opacity=".4">
                                    <ellipse cx="346.43" cy="403.5" rx="82.971" ry="3.5" fill="#1C75BC"/>
                                </g>
                                <path d="m423.29 168.7h-3e-3c-0.121-1e-3 -0.224-0.089-0.243-0.208-0.2-1.19-0.889-4.446-1.659-5.212-0.76-0.753-3.973-1.408-5.147-1.596-0.123-0.02-0.213-0.128-0.21-0.253s0.098-0.229 0.222-0.243c1.104-0.125 4.131-0.595 4.86-1.269 0.858-0.792 1.688-4.271 1.936-5.544 0.022-0.12 0.149-0.212 0.251-0.202 0.121 3e-3 0.224 0.093 0.241 0.213 0.179 1.194 0.81 4.462 1.575 5.228 0.766 0.767 4.033 1.397 5.228 1.576 0.12 0.018 0.21 0.12 0.213 0.242s-0.083 0.228-0.203 0.251c-1.159 0.223-4.335 0.968-5.091 1.722-0.756 0.756-1.5 3.933-1.724 5.093-0.023 0.117-0.126 0.202-0.246 0.202zm-5.498-7.228c1.372 0.296 3.295 0.808 3.944 1.453 0.708 0.702 1.27 2.894 1.567 4.286 0.323-1.358 0.914-3.473 1.602-4.161 0.679-0.678 2.75-1.263 4.108-1.588-1.4-0.276-3.559-0.799-4.255-1.496-0.697-0.697-1.22-2.859-1.496-4.259-0.354 1.481-1.024 3.849-1.813 4.578-0.625 0.578-2.365 0.968-3.657 1.187z" fill="#1C75BC"/>
                                <path d="m416.28 170.22h-2e-3c-0.078-1e-3 -0.144-0.058-0.157-0.134-0.088-0.523-0.305-1.429-0.512-1.635-0.204-0.202-1.099-0.409-1.614-0.491-0.08-0.013-0.138-0.083-0.136-0.163s0.063-0.147 0.144-0.156c0.484-0.054 1.326-0.208 1.521-0.388 0.231-0.214 0.49-1.183 0.599-1.743 0.015-0.076 0.081-0.13 0.158-0.13h4e-3c0.078 2e-3 0.144 0.06 0.155 0.137 0.079 0.524 0.28 1.433 0.485 1.639 0.205 0.205 1.113 0.407 1.639 0.486 0.077 0.012 0.135 0.078 0.137 0.156 2e-3 0.079-0.054 0.147-0.131 0.162-0.51 0.098-1.395 0.329-1.599 0.532-0.203 0.203-0.435 1.088-0.532 1.599-0.015 0.074-0.081 0.129-0.159 0.129zm-1.385-2.401c0.378 0.099 0.773 0.236 0.941 0.402 0.191 0.19 0.347 0.673 0.452 1.094 0.112-0.407 0.271-0.87 0.455-1.054 0.181-0.18 0.628-0.336 1.028-0.447-0.417-0.099-0.888-0.246-1.075-0.433-0.187-0.188-0.333-0.658-0.432-1.075-0.124 0.454-0.308 0.981-0.522 1.181-0.158 0.147-0.505 0.256-0.847 0.332z" fill="#1C75BC"/>
                                <path d="m418.54 158.19c-0.069-4e-3 -0.146-0.057-0.159-0.134-0.088-0.523-0.305-1.43-0.512-1.635-0.204-0.202-1.099-0.409-1.614-0.492-0.08-0.013-0.138-0.083-0.136-0.163s0.063-0.147 0.144-0.156c0.484-0.054 1.326-0.208 1.521-0.388 0.231-0.213 0.49-1.182 0.599-1.743 0.015-0.076 0.081-0.13 0.158-0.13h4e-3c0.078 2e-3 0.144 0.06 0.155 0.137 0.079 0.525 0.28 1.435 0.485 1.64s1.113 0.406 1.638 0.485c0.078 0.011 0.136 0.077 0.138 0.156s-0.054 0.146-0.131 0.162c-0.51 0.099-1.395 0.331-1.598 0.534-0.204 0.204-0.436 1.088-0.533 1.598-0.015 0.074-0.082 0.129-0.159 0.129zm-1.387-2.402c0.378 0.1 0.774 0.236 0.942 0.403 0.191 0.189 0.347 0.673 0.453 1.094 0.111-0.407 0.271-0.869 0.454-1.053 0.181-0.181 0.628-0.337 1.029-0.449-0.418-0.099-0.889-0.245-1.076-0.432s-0.333-0.658-0.432-1.075c-0.124 0.454-0.308 0.982-0.522 1.181-0.157 0.147-0.505 0.255-0.848 0.331z" fill="#1C75BC"/>
                                <path d="m296.14 134.83h-3e-3c-0.121-1e-3 -0.224-0.089-0.243-0.208-0.146-0.864-0.505-2.362-0.849-2.703-0.339-0.335-1.816-0.678-2.669-0.814-0.123-0.02-0.213-0.128-0.21-0.253s0.098-0.229 0.222-0.243c0.801-0.09 2.19-0.344 2.514-0.643 0.384-0.355 0.812-1.955 0.993-2.88 0.022-0.12 0.119-0.199 0.251-0.202 0.121 3e-3 0.224 0.093 0.241 0.213 0.13 0.867 0.462 2.369 0.803 2.71s1.843 0.674 2.71 0.804c0.12 0.018 0.21 0.12 0.213 0.242 2e-3 0.122-0.083 0.228-0.203 0.251-0.842 0.162-2.305 0.543-2.643 0.881-0.337 0.337-0.72 1.8-0.882 2.643-0.023 0.117-0.125 0.202-0.245 0.202zm-2.356-3.943c0.642 0.164 1.328 0.395 1.612 0.677 0.322 0.319 0.583 1.147 0.756 1.853 0.184-0.682 0.45-1.476 0.761-1.786 0.305-0.304 1.071-0.567 1.744-0.75-0.7-0.162-1.507-0.406-1.821-0.721-0.315-0.316-0.56-1.125-0.721-1.825-0.206 0.759-0.513 1.663-0.874 1.998-0.265 0.245-0.873 0.428-1.457 0.554z" fill="#1C75BC"/>
                                <path d="m277.9 153.6h-3e-3c-0.121-1e-3 -0.224-0.089-0.244-0.208-0.13-0.775-0.452-2.117-0.757-2.421-0.301-0.298-1.625-0.604-2.39-0.726-0.124-0.02-0.213-0.128-0.21-0.253s0.098-0.229 0.222-0.243c0.718-0.081 1.964-0.308 2.25-0.573 0.342-0.315 0.725-1.749 0.885-2.579 0.023-0.12 0.127-0.22 0.251-0.203 0.122 3e-3 0.224 0.093 0.242 0.213 0.116 0.777 0.414 2.122 0.717 2.425s1.648 0.601 2.425 0.718c0.121 0.018 0.21 0.12 0.213 0.242 2e-3 0.122-0.083 0.228-0.203 0.251-0.755 0.145-2.065 0.487-2.366 0.788-0.3 0.3-0.642 1.611-0.788 2.367-0.022 0.117-0.125 0.202-0.244 0.202zm-2.012-3.573c0.55 0.146 1.116 0.346 1.36 0.588 0.279 0.278 0.507 0.973 0.664 1.59 0.166-0.596 0.398-1.259 0.667-1.529 0.263-0.263 0.905-0.492 1.49-0.656-0.61-0.147-1.287-0.361-1.559-0.635-0.273-0.273-0.487-0.948-0.634-1.559-0.186 0.666-0.453 1.426-0.768 1.716-0.228 0.212-0.723 0.372-1.22 0.485z" fill="#1C75BC"/>
                                <path d="m286.72 154.74c-0.122 0-0.226-0.088-0.247-0.208-0.015-0.09-1.533-9.014-3.527-10.994-1.965-1.951-10.772-3.384-10.861-3.398-0.124-0.02-0.213-0.128-0.21-0.253s0.098-0.229 0.222-0.243c0.083-9e-3 8.375-0.96 10.271-2.71 2.218-2.049 4.089-11.592 4.107-11.688 0.023-0.12 0.119-0.208 0.251-0.203 0.122 2e-3 0.224 0.093 0.242 0.213 0.014 0.09 1.373 9.047 3.357 11.032 1.985 1.984 10.94 3.344 11.03 3.357 0.122 0.018 0.213 0.123 0.213 0.247s-0.09 0.229-0.212 0.248c-0.092 0.014-9.229 1.436-11.18 3.385-1.949 1.949-3.196 10.91-3.208 11-0.017 0.123-0.12 0.214-0.244 0.216-2e-3 -1e-3 -3e-3 -1e-3 -4e-3 -1e-3zm-12.97-14.81c2.691 0.518 7.986 1.702 9.548 3.253 1.615 1.603 2.872 7.144 3.399 9.815 0.448-2.684 1.542-8.244 3.125-9.827 1.586-1.585 7.269-2.781 9.993-3.276-2.686-0.482-8.237-1.646-9.845-3.253-1.638-1.638-2.814-7.37-3.28-9.994-0.605 2.744-2.142 8.951-3.985 10.653-1.494 1.38-6.386 2.254-8.955 2.629z" fill="#1C75BC"/>
                                <path d="m198.35 349.15c-0.222 0-0.402-0.179-0.404-0.4l-0.053-7.535c-2e-3 -0.224 0.146-0.409 0.404-0.406 0.222 0 0.402 0.179 0.404 0.4l0.053 7.535c1e-3 0.223-0.178 0.405-0.401 0.406h-3e-3z" fill="#1C75BC"/>
                                <path d="m198.43 359.91c-0.222 0-0.402-0.179-0.404-0.4l-0.054-7.533c-1e-3 -0.224 0.181-0.438 0.404-0.406 0.222 0 0.402 0.179 0.404 0.4l0.054 7.533c1e-3 0.223-0.178 0.405-0.401 0.406h-3e-3z" fill="#1C75BC"/>
                                <path d="m189.48 350.83c-0.222 0-0.402-0.179-0.404-0.4-1e-3 -0.223 0.178-0.405 0.401-0.406l6.996-0.05h3e-3c0.222 0 0.402 0.179 0.404 0.4 1e-3 0.223-0.178 0.405-0.401 0.406l-6.996 0.05h-3e-3z" fill="#1C75BC"/>
                                <path d="m200.28 350.75c-0.222 0-0.402-0.179-0.404-0.4-1e-3 -0.223 0.178-0.405 0.401-0.406l6.997-0.049c0.2 5e-3 0.405 0.178 0.407 0.4 1e-3 0.223-0.178 0.405-0.401 0.406l-6.997 0.049h-3e-3z" fill="#1C75BC"/>
                                <path d="m186.25 327.61c-0.09 0-0.164-0.073-0.164-0.163l-0.021-3.064c0-0.09 0.072-0.165 0.163-0.165h1e-3c0.09 0 0.164 0.073 0.164 0.163l0.021 3.064c1e-3 0.091-0.072 0.165-0.164 0.165 1e-3 0 1e-3 0 0 0z" fill="#1C75BC"/>
                                <path d="m186.28 331.98c-0.09 0-0.164-0.072-0.164-0.163l-0.022-3.062c-1e-3 -0.091 0.072-0.164 0.163-0.165h1e-3c0.09 0 0.164 0.072 0.164 0.163l0.022 3.062c1e-3 0.091-0.072 0.164-0.164 0.165 1e-3 0 0 0 0 0z" fill="#1C75BC"/>
                                <path d="m182.64 328.29c-0.09 0-0.164-0.072-0.164-0.163-1e-3 -0.091 0.072-0.165 0.163-0.165l2.846-0.021h1e-3c0.09 0 0.164 0.072 0.164 0.163 1e-3 0.091-0.072 0.164-0.163 0.165l-2.846 0.021h-1e-3z" fill="#1C75BC"/>
                                <path d="m187.03 328.26c-0.09 0-0.164-0.072-0.164-0.163s0.072-0.165 0.163-0.165l2.846-0.02h1e-3c0.09 0 0.164 0.073 0.164 0.163 0 0.091-0.072 0.164-0.163 0.165l-2.847 0.02c1e-3 0 0 0 0 0z" fill="#1C75BC"/>
                                <path d="m507.64 229.64c-0.184 0-0.333-0.149-0.333-0.333l-4e-3 -6.217c0-0.184 0.148-0.333 0.333-0.333 0.184 0 0.333 0.149 0.333 0.333l4e-3 6.217c0 0.183-0.149 0.333-0.333 0.333z" fill="#1C75BC"/>
                                <path d="m507.65 238.52c-0.184 0-0.333-0.149-0.333-0.333l-4e-3 -6.217c0-0.184 0.148-0.333 0.333-0.333 0.184 0 0.333 0.149 0.333 0.333l4e-3 6.217c0 0.183-0.148 0.333-0.333 0.333z" fill="#1C75BC"/>
                                <path d="m500.32 230.97c-0.184 0-0.333-0.149-0.333-0.333s0.148-0.333 0.333-0.333l5.771-4e-3c0.184 0 0.333 0.149 0.333 0.333s-0.148 0.333-0.333 0.333l-5.771 4e-3z" fill="#1C75BC"/>
                                <path d="m509.22 230.97c-0.184 0-0.333-0.149-0.333-0.333s0.148-0.333 0.333-0.333l5.772-3e-3c0.184 0 0.333 0.149 0.333 0.333s-0.148 0.333-0.333 0.333l-5.772 3e-3z" fill="#1C75BC"/>
                                <path d="m519.01 221.56c-0.042 0-0.083-0.016-0.115-0.047-0.064-0.063-0.065-0.167-2e-3 -0.232l2.151-2.182c0.064-0.065 0.168-0.065 0.232-1e-3s0.065 0.167 2e-3 0.232l-2.151 2.182c-0.032 0.032-0.075 0.048-0.117 0.048z" fill="#1C75BC"/>
                                <path d="m515.94 224.67c-0.042 0-0.083-0.016-0.115-0.047-0.064-0.063-0.065-0.167-2e-3 -0.232l2.15-2.182c0.064-0.065 0.168-0.065 0.232-1e-3s0.065 0.167 2e-3 0.232l-2.15 2.182c-0.033 0.032-0.076 0.048-0.117 0.048z" fill="#1C75BC"/>
                                <path d="m518 221.48c-0.042 0-0.083-0.016-0.115-0.047l-2.027-1.997c-0.064-0.064-0.065-0.168-2e-3 -0.232 0.064-0.065 0.168-0.064 0.232-2e-3l2.027 1.997c0.064 0.064 0.065 0.168 2e-3 0.232-0.032 0.033-0.075 0.049-0.117 0.049z" fill="#1C75BC"/>
                                <path d="m521.13 224.57c-0.042 0-0.083-0.016-0.115-0.047l-2.026-1.999c-0.064-0.063-0.065-0.167-2e-3 -0.232 0.064-0.065 0.168-0.065 0.232-1e-3l2.026 1.999c0.064 0.063 0.065 0.167 2e-3 0.232-0.032 0.032-0.075 0.048-0.117 0.048z" fill="#1C75BC"/>
                                <path d="m511.62 214.96c-0.111-1e-3 -0.201-0.091-0.2-0.202l0.013-1.958c1e-3 -0.11 0.09-0.199 0.2-0.199h1e-3c0.11 1e-3 0.2 0.091 0.199 0.202l-0.013 1.958c-1e-3 0.11-0.09 0.199-0.2 0.199z" fill="#1C75BC"/>
                                <path d="m511.6 217.75c-0.111-1e-3 -0.201-0.091-0.2-0.202l0.013-1.957c1e-3 -0.11 0.09-0.199 0.2-0.199h1e-3c0.11 1e-3 0.2 0.091 0.199 0.202l-0.013 1.957c-1e-3 0.11-0.09 0.199-0.2 0.199z" fill="#1C75BC"/>
                                <path d="m511.13 215.37l-1.82-0.012c-0.11-1e-3 -0.2-0.091-0.199-0.202 1e-3 -0.11 0.09-0.199 0.2-0.199h1e-3l1.819 0.012c0.11 1e-3 0.2 0.091 0.199 0.202-1e-3 0.11-0.09 0.199-0.2 0.199z" fill="#1C75BC"/>
                                <path d="m513.93 215.39l-1.818-0.012c-0.11-1e-3 -0.2-0.091-0.199-0.202 1e-3 -0.11 0.09-0.199 0.2-0.199h1e-3l1.817 0.012c0.11 1e-3 0.2 0.091 0.199 0.202-1e-3 0.11-0.09 0.199-0.2 0.199z" fill="#1C75BC"/>
                                <polygon points="289.01 257.56 289.01 262.96 293.78 259.07" fill="#fff"/>
                                <polygon points="288.62 262.96 288.62 257.48 283.84 259.06" fill="#fff"/>
                                <path d="m288.94 263.52c-9e-3 7e-3 -0.019 0.011-0.028 0.016-6e-3 3e-3 -9e-3 7e-3 -0.016 0.01-3e-3 2e-3 -6e-3 2e-3 -8e-3 4e-3 -0.022 8e-3 -0.046 0.013-0.069 0.013-0.024 0-0.047-5e-3 -0.068-0.013-4e-3 -1e-3 -6e-3 -1e-3 -0.01-4e-3 -6e-3 -2e-3 -9e-3 -7e-3 -0.015-0.01-0.01-5e-3 -0.02-9e-3 -0.028-0.016l-5.288-4.319-12.342 4.079 18.015 6.006 18.015-6.006-12.878-4.071-5.28 4.311z" fill="#fff"/>
                                <polygon points="345 239.36 345 249.82 354.23 242.28" fill="#fff"/>
                                <polygon points="344.26 249.82 344.26 239.2 334.99 242.26" fill="#fff"/>
                                <path d="m344.86 250.9c-0.016 0.015-0.036 0.021-0.056 0.031-0.01 6e-3 -0.018 0.016-0.027 0.019-6e-3 3e-3 -0.013 5e-3 -0.019 6e-3 -0.042 0.017-0.087 0.026-0.133 0.026s-0.091-9e-3 -0.133-0.026c-7e-3 -1e-3 -0.012-3e-3 -0.018-6e-3 -0.012-3e-3 -0.02-0.013-0.029-0.019-0.021-0.01-0.039-0.017-0.056-0.031l-10.233-8.359-23.889 7.894 34.867 11.624 34.868-11.624-24.925-7.879-10.217 8.344z" fill="#fff"/>
                                <polygon points="400.7 256.97 400.7 262.38 405.47 258.48" fill="#fff"/>
                                <polygon points="400.31 262.38 400.31 256.89 395.53 258.47" fill="#fff"/>
                                <path d="m400.63 262.93c-8e-3 7e-3 -0.019 0.011-0.027 0.016-6e-3 3e-3 -0.01 9e-3 -0.016 0.01-3e-3 1e-3 -7e-3 2e-3 -9e-3 3e-3 -0.022 9e-3 -0.046 0.014-0.069 0.014s-0.047-5e-3 -0.068-0.014c-3e-3 0-6e-3 -1e-3 -9e-3 -3e-3 -7e-3 -1e-3 -0.01-7e-3 -0.016-0.01-0.01-4e-3 -0.02-8e-3 -0.028-0.016l-5.287-4.319-12.343 4.079 18.015 6.006 18.016-6.006-12.878-4.07-5.281 4.31z" fill="#fff"/>
                                <path d="m284.1 259.13c-0.081 0-0.155-0.051-0.182-0.132-0.034-0.1 0.021-0.208 0.121-0.243l4.239-1.412c0.101-0.034 0.208 0.021 0.242 0.12 0.033 0.101-0.021 0.209-0.122 0.243l-4.238 1.412c-0.02 8e-3 -0.041 0.012-0.06 0.012z" fill="#1C75BC"/>
                                <path d="m289.22 269.43c-0.02 0-0.041-4e-3 -0.061-0.01l-18.015-6.005c-0.079-0.026-0.132-0.099-0.132-0.182 0-0.082 0.053-0.156 0.132-0.182l11.919-3.973c0.101-0.034 0.209 0.021 0.242 0.121 0.034 0.101-0.021 0.209-0.122 0.243l-11.374 3.792 17.409 5.804 17.396-5.799-12.099-3.853c-0.102-0.031-0.157-0.14-0.124-0.24 0.031-0.101 0.14-0.156 0.239-0.125l12.661 4.03c0.079 0.025 0.133 0.098 0.133 0.181 1e-3 0.083-0.052 0.158-0.13 0.184l-18.016 6.005c-0.017 5e-3 -0.038 9e-3 -0.058 9e-3z" fill="#1C75BC"/>
                                <path d="m293.54 259.07c-0.019 0-0.038-3e-3 -0.058-9e-3l-4.268-1.358c-0.101-0.032-0.156-0.14-0.124-0.241s0.139-0.157 0.241-0.125l4.267 1.358c0.101 0.033 0.156 0.14 0.124 0.241-0.025 0.082-0.101 0.134-0.182 0.134z" fill="#1C75BC"/>
                                <path d="m307.24 263.24v18.015l-18.015 5.906-18.015-5.906v-18.015l18.015 5.906 18.015-5.906zm-18.014 6.006v17.916" fill="#fff"/>
                                <path d="m289.22 287.35c-0.022 0-0.044-4e-3 -0.063-0.012l-18.011-5.905c-0.079-0.026-0.132-0.1-0.132-0.182v-18.015c0-0.061 0.03-0.119 0.08-0.155 0.05-0.037 0.115-0.046 0.172-0.027l17.955 5.887 17.955-5.887c0.059-0.019 0.123-9e-3 0.172 0.027 0.05 0.036 0.079 0.094 0.079 0.155v18.015c0 0.083-0.053 0.156-0.131 0.182l-18.012 5.905c-0.02 8e-3 -0.042 0.012-0.064 0.012zm0.191-18.068v17.611l17.632-5.781v-17.611l-17.632 5.781zm-18.015 11.83l17.632 5.781v-17.611l-17.632-5.782v17.612z" fill="#1C75BC"/>
                                <path d="m312.04 244.59c0-13.104-10.369-23.163-23.164-23.163-12.792 0-23.163 10.059-23.163 23.163 0 0 11.81 3.678 23.163 3.678 11.586 0 23.164-3.678 23.164-3.678z" fill="#1C75BC"/>
                                <path d="m288.82 263.53c-0.043 0-0.086-0.013-0.121-0.043l-23.031-18.814c-0.083-0.067-0.095-0.188-0.027-0.271 0.066-0.082 0.187-0.094 0.27-0.027l23.031 18.814c0.082 0.067 0.095 0.188 0.027 0.271-0.038 0.046-0.093 0.07-0.149 0.07z" fill="#1C75BC"/>
                                <path d="m288.82 263.53c-0.057 0-0.111-0.024-0.149-0.07-0.067-0.083-0.055-0.204 0.027-0.271l23.04-18.814c0.082-0.067 0.202-0.055 0.27 0.027 0.066 0.083 0.055 0.204-0.027 0.271l-23.04 18.814c-0.037 0.03-0.079 0.043-0.121 0.043z" fill="#1C75BC"/>
                                <path d="m288.82 263.53c-0.106 0-0.192-0.085-0.192-0.191v-18.814c0-0.106 0.085-0.191 0.192-0.191s0.191 0.085 0.191 0.191v18.814c1e-3 0.105-0.084 0.191-0.191 0.191z" fill="#1C75BC"/>
                                <path d="m395.79 258.54c-0.08 0-0.154-0.05-0.182-0.13-0.034-0.101 0.021-0.209 0.121-0.242l4.238-1.413c0.102-0.033 0.209 0.021 0.242 0.122 0.034 0.1-0.021 0.209-0.121 0.242l-4.238 1.413c-0.02 5e-3 -0.04 8e-3 -0.06 8e-3z" fill="#1C75BC"/>
                                <path d="m400.91 268.84c-0.02 0-0.04-3e-3 -0.061-0.01l-18.015-6.005c-0.078-0.027-0.131-0.1-0.131-0.182s0.053-0.155 0.131-0.182l11.92-3.973c0.101-0.034 0.209 0.021 0.242 0.121s-0.021 0.209-0.121 0.243l-11.375 3.791 17.409 5.803 17.396-5.799-12.097-3.851c-0.102-0.033-0.157-0.14-0.125-0.241 0.031-0.101 0.141-0.156 0.24-0.125l12.66 4.031c0.08 0.025 0.134 0.099 0.134 0.182 0 0.082-0.053 0.156-0.131 0.183l-18.016 6.005c-0.019 6e-3 -0.039 9e-3 -0.06 9e-3z" fill="#1C75BC"/>
                                <path d="m405.23 258.48c-0.019 0-0.038-2e-3 -0.058-9e-3l-4.268-1.357c-0.1-0.032-0.155-0.141-0.124-0.242 0.033-0.1 0.14-0.156 0.241-0.124l4.268 1.358c0.101 0.032 0.156 0.141 0.124 0.241-0.025 0.081-0.102 0.133-0.183 0.133z" fill="#1C75BC"/>
                                <path d="m418.93 262.65v18.015l-18.015 5.907-18.015-5.907v-18.015l18.015 5.906 18.015-5.906zm-18.015 6.006v17.916" fill="#fff"/>
                                <path d="m400.91 286.76c-0.022 0-0.044-4e-3 -0.063-0.01l-18.011-5.906c-0.079-0.025-0.132-0.099-0.132-0.182v-18.015c0-0.062 0.029-0.119 0.079-0.155s0.114-0.045 0.172-0.027l17.955 5.887 17.955-5.887c0.06-0.019 0.123-9e-3 0.173 0.027 0.05 0.037 0.079 0.094 0.079 0.155v18.015c0 0.083-0.054 0.156-0.132 0.182l-18.011 5.906c-0.019 5e-3 -0.041 0.01-0.064 0.01zm0.192-18.068v17.612l17.632-5.782v-17.611l-17.632 5.781zm-18.015 11.83l17.632 5.782v-17.612l-17.632-5.781v17.611z" fill="#1C75BC"/>
                                <path d="m423.73 244c0-13.104-10.369-23.163-23.163-23.163-12.792 0-23.163 10.06-23.163 23.163 0 0 11.758 4.266 23.111 4.266 11.586 1e-3 23.215-4.266 23.215-4.266z" fill="#1C75BC"/>
                                <path d="m400.51 262.94c-0.043 0-0.085-0.013-0.121-0.042l-23.031-18.815c-0.081-0.067-0.093-0.188-0.026-0.27 0.066-0.082 0.188-0.094 0.27-0.026l23.03 18.814c0.082 0.067 0.095 0.188 0.027 0.27-0.039 0.046-0.094 0.069-0.149 0.069z" fill="#1C75BC"/>
                                <path d="m400.51 262.94c-0.057 0-0.111-0.023-0.149-0.07-0.067-0.082-0.055-0.203 0.027-0.27l23.041-18.814c0.081-0.067 0.201-0.055 0.27 0.026 0.065 0.083 0.054 0.203-0.027 0.27l-23.041 18.815c-0.036 0.03-0.079 0.043-0.121 0.043z" fill="#1C75BC"/>
                                <path d="m400.51 262.94c-0.106 0-0.191-0.084-0.191-0.19v-18.816c0-0.105 0.085-0.191 0.191-0.191s0.191 0.086 0.191 0.191v18.816c0 0.106-0.085 0.19-0.191 0.19z" fill="#1C75BC"/>
                                <path d="m335.5 242.4c-0.156 0-0.3-0.099-0.353-0.254-0.065-0.193 0.04-0.403 0.234-0.469l8.205-2.734c0.195-0.064 0.404 0.041 0.468 0.234 0.065 0.195-0.039 0.406-0.234 0.47l-8.204 2.735c-0.038 0.012-0.078 0.018-0.116 0.018z" fill="#1C75BC"/>
                                <path d="m345.42 262.34c-0.038 0-0.078-7e-3 -0.118-0.019l-34.866-11.624c-0.151-0.05-0.253-0.191-0.253-0.352 0-0.159 0.102-0.301 0.253-0.352l23.07-7.689c0.195-0.065 0.405 0.041 0.469 0.235s-0.04 0.404-0.235 0.469l-22.014 7.338 33.694 11.232 33.669-11.224-23.417-7.456c-0.195-0.062-0.303-0.271-0.241-0.465 0.062-0.196 0.271-0.302 0.466-0.242l24.503 7.801c0.154 0.048 0.258 0.189 0.259 0.352 1e-3 0.16-0.101 0.303-0.253 0.354l-34.868 11.624c-0.039 0.011-0.079 0.018-0.118 0.018z" fill="#1C75BC"/>
                                <path d="m353.78 242.28c-0.038 0-0.075-6e-3 -0.112-0.017l-8.26-2.628c-0.194-0.062-0.302-0.271-0.24-0.466 0.062-0.194 0.27-0.303 0.468-0.241l8.257 2.628c0.196 0.062 0.304 0.271 0.241 0.466-0.05 0.157-0.197 0.258-0.354 0.258z" fill="#1C75BC"/>
                                <path d="m380.28 250.35v34.869l-34.867 11.432-34.867-11.432v-34.869l34.867 11.432 34.867-11.432zm-34.867 11.625v34.676" fill="#fff"/>
                                <path d="m345.42 297.02c-0.044 0-0.085-8e-3 -0.123-0.021l-34.859-11.429c-0.153-0.051-0.255-0.192-0.255-0.353v-34.869c0-0.119 0.056-0.229 0.152-0.299 0.096-0.071 0.22-0.088 0.334-0.053l34.751 11.395 34.752-11.395c0.112-0.037 0.237-0.018 0.333 0.053 0.097 0.07 0.153 0.181 0.153 0.299v34.869c0 0.16-0.104 0.302-0.255 0.353l-34.859 11.429c-0.038 0.013-0.081 0.021-0.124 0.021zm0.37-34.971v34.087l34.126-11.188v-34.087l-34.126 11.188zm-34.867 22.899l34.126 11.188v-34.087l-34.126-11.188v34.087z" fill="#1C75BC"/>
                                <path d="m389.57 214.26c0-25.362-20.069-44.831-44.832-44.831-24.76 0-44.83 19.469-44.83 44.831 0 0 23.113 7.165 45.087 7.165 22.424 0 44.575-7.165 44.575-7.165z" fill="#1C75BC"/>
                                <path d="m344.64 250.93c-0.084 0-0.165-0.027-0.234-0.082l-44.575-36.416c-0.159-0.129-0.183-0.363-0.052-0.522 0.128-0.158 0.361-0.182 0.521-0.052l44.575 36.414c0.159 0.129 0.182 0.364 0.053 0.523-0.074 0.09-0.18 0.135-0.288 0.135z" fill="#1C75BC"/>
                                <path d="m344.64 250.93c-0.108 0-0.216-0.045-0.289-0.135-0.128-0.159-0.105-0.394 0.054-0.523l44.594-36.414c0.159-0.129 0.392-0.106 0.522 0.052 0.129 0.159 0.105 0.393-0.054 0.522l-44.593 36.416c-0.069 0.055-0.151 0.082-0.234 0.082z" fill="#1C75BC"/>
                                <path d="m344.64 250.93c-0.205 0-0.371-0.165-0.371-0.37v-36.416c0-0.205 0.166-0.371 0.371-0.371 0.206 0 0.371 0.166 0.371 0.371v36.416c0 0.205-0.165 0.37-0.371 0.37z" fill="#1C75BC"/>
                                <g opacity=".7">
                                    <polygon points="306.88 280.91 289.53 286.75 289.53 269.48 306.93 263.82" fill="#1C75BC"/>
                                </g>
                                <g opacity=".7">
                                    <polygon points="418.57 280.33 401.22 286.16 401.22 268.9 418.62 263.23" fill="#1C75BC"/>
                                </g>
                                <g opacity=".7">
                                    <polygon points="379.59 284.56 346.02 295.86 346.02 262.44 379.68 251.48" fill="#1C75BC"/>
                                </g>
                                <g opacity=".1">
                                    <polygon points="271.75 280.87 288.82 286.35 288.82 269.62 271.7 264.04" fill="#1C75BC"/>
                                </g>
                                <g opacity=".1">
                                    <polygon points="383.44 280.28 400.51 285.76 400.51 269.03 383.4 263.46" fill="#1C75BC"/>
                                </g>
                                <g opacity=".1">
                                    <polygon points="311.6 284.48 344.64 295.08 344.64 262.7 311.51 251.92" fill="#1C75BC"/>
                                </g>
                                <path d="m286.59 234.13c-0.153 0-0.282-0.12-0.292-0.275-0.017-0.273-0.116-0.53-0.289-0.744-0.22-0.273-0.533-0.444-0.882-0.481-0.351-0.037-0.692 0.062-0.965 0.283-0.274 0.221-0.445 0.536-0.482 0.886-0.017 0.16-0.162 0.276-0.321 0.259-0.161-0.016-0.277-0.16-0.26-0.321 0.054-0.505 0.301-0.959 0.696-1.279 0.395-0.318 0.89-0.464 1.394-0.409 0.505 0.053 0.958 0.301 1.276 0.696 0.249 0.308 0.393 0.68 0.417 1.075 0.01 0.161-0.113 0.3-0.273 0.309-7e-3 0-0.012 1e-3 -0.019 1e-3z" fill="#fff"/>
                                <path d="m294.5 234.13c-0.153 0-0.281-0.12-0.29-0.275-0.018-0.273-0.118-0.53-0.29-0.744-0.22-0.273-0.533-0.444-0.883-0.481s-0.691 0.062-0.966 0.283c-0.272 0.221-0.443 0.536-0.48 0.886-0.018 0.16-0.165 0.275-0.321 0.259-0.161-0.016-0.276-0.16-0.26-0.321 0.054-0.505 0.301-0.959 0.695-1.279 0.396-0.317 0.891-0.463 1.394-0.409 0.506 0.053 0.958 0.301 1.276 0.696 0.248 0.308 0.393 0.68 0.417 1.075 0.011 0.161-0.112 0.299-0.274 0.309-5e-3 0-0.012 1e-3 -0.018 1e-3z" fill="#fff"/>
                                <path d="m398.28 233.54c-0.153 0-0.282-0.119-0.291-0.274-0.018-0.273-0.116-0.531-0.29-0.744-0.22-0.274-0.532-0.445-0.882-0.483-0.351-0.037-0.691 0.063-0.965 0.284s-0.445 0.536-0.482 0.886c-0.017 0.16-0.162 0.276-0.321 0.259-0.16-0.017-0.276-0.161-0.26-0.322 0.054-0.504 0.302-0.958 0.695-1.278 0.396-0.318 0.891-0.464 1.395-0.41 0.505 0.054 0.957 0.301 1.275 0.696 0.249 0.309 0.394 0.68 0.417 1.075 0.011 0.161-0.111 0.299-0.273 0.31-6e-3 1e-3 -0.012 1e-3 -0.018 1e-3z" fill="#fff"/>
                                <path d="m406.19 233.54c-0.153 0-0.281-0.119-0.291-0.274-0.018-0.273-0.117-0.531-0.289-0.744-0.221-0.274-0.534-0.445-0.884-0.483-0.349-0.037-0.691 0.063-0.965 0.284-0.272 0.221-0.444 0.535-0.481 0.886-0.017 0.16-0.165 0.275-0.321 0.259-0.16-0.017-0.276-0.161-0.26-0.322 0.054-0.504 0.301-0.958 0.696-1.278 0.395-0.318 0.89-0.463 1.394-0.41 0.505 0.054 0.958 0.301 1.275 0.696 0.249 0.308 0.393 0.68 0.417 1.075 0.011 0.16-0.112 0.299-0.273 0.31-6e-3 1e-3 -0.013 1e-3 -0.018 1e-3z" fill="#fff"/>
                                <path d="m340.32 194.02c-0.297 0-0.546-0.23-0.563-0.53-0.033-0.529-0.226-1.027-0.56-1.44-0.427-0.53-1.032-0.861-1.709-0.933-0.678-0.072-1.338 0.122-1.866 0.548-0.531 0.428-0.863 1.037-0.935 1.713-0.033 0.311-0.313 0.535-0.622 0.502-0.31-0.033-0.535-0.311-0.502-0.622 0.103-0.976 0.583-1.855 1.347-2.473 0.765-0.617 1.722-0.899 2.698-0.792 0.978 0.104 1.853 0.582 2.468 1.347 0.483 0.598 0.762 1.316 0.809 2.081 0.021 0.312-0.218 0.58-0.529 0.599h-0.036z" fill="#fff"/>
                                <path d="m355.62 194.02c-0.297 0-0.546-0.23-0.563-0.53-0.033-0.529-0.227-1.028-0.561-1.44-0.427-0.53-1.033-0.861-1.709-0.933s-1.338 0.122-1.868 0.548c-0.528 0.428-0.858 1.036-0.931 1.713-0.033 0.311-0.319 0.532-0.622 0.502-0.311-0.033-0.535-0.311-0.503-0.622 0.104-0.977 0.582-1.855 1.347-2.473 0.765-0.615 1.723-0.896 2.697-0.792 0.977 0.104 1.854 0.582 2.47 1.347 0.48 0.597 0.76 1.316 0.808 2.081 0.02 0.312-0.218 0.579-0.53 0.599h-0.035z" fill="#fff"/>
                                <path d="m344.91 207.16c-0.52 7e-3 -1.04-8e-3 -1.561-0.043-8.752-0.605-14.382-6.974-14.617-7.245-0.275-0.317-0.241-0.797 0.076-1.073 0.314-0.274 0.796-0.243 1.072 0.074 0.033 0.038 3.339 3.778 8.623 5.673 7.023 2.519 14.08 0.745 20.977-5.271 0.314-0.276 0.796-0.245 1.074 0.073 0.276 0.317 0.243 0.797-0.074 1.073-5.054 4.409-10.284 6.672-15.57 6.739z" fill="#fff"/>
                                <path d="m401.37 240.35c-0.279 3e-3 -0.557-4e-3 -0.836-0.023-4.684-0.324-7.696-3.733-7.821-3.877-0.147-0.17-0.13-0.426 0.04-0.574 0.17-0.146 0.425-0.13 0.574 0.04 0.017 0.021 1.786 2.022 4.613 3.036 3.761 1.347 7.534 0.398 11.226-2.82 0.169-0.147 0.427-0.131 0.574 0.039 0.149 0.169 0.132 0.427-0.039 0.575-2.704 2.358-5.503 3.569-8.331 3.604z" fill="#fff"/>
                                <path d="m289.02 240.56c-0.277 3e-3 -0.557-5e-3 -0.837-0.024-4.682-0.324-7.694-3.732-7.821-3.876-0.147-0.169-0.129-0.427 0.041-0.575 0.169-0.146 0.426-0.13 0.574 0.04 0.018 0.021 1.787 2.022 4.614 3.036 3.76 1.348 7.536 0.398 11.227-2.82 0.169-0.147 0.427-0.13 0.574 0.039s0.13 0.427-0.039 0.575c-2.706 2.358-5.506 3.569-8.333 3.605z" fill="#fff"/>
                                <g opacity=".6">
                                    <path d="m305.62 215.84s-1.673-39.825 35.27-46.25c0 0-26.392 12.908-20.487 49.451-1e-3 -1e-3 -11.328-2.025-14.783-3.201z" fill="#fff"/>
                                </g>
                                <g opacity=".6">
                                    <path d="m268.77 245.46s-0.869-20.688 18.322-24.027c0 0-13.71 6.706-10.643 25.689 0 0-5.885-1.052-7.679-1.662z" fill="#fff"/>
                                </g>
                                <g opacity=".6">
                                    <path d="m421.2 244.62s0.863-20.275-18.328-23.613c0 0 13.71 6.706 10.643 25.689 0 0 5.89-1.465 7.685-2.076z" fill="#fff"/>
                                </g>
                            </SVGIcons>
                        </ServiceBotTableNoData>
                    </Authorizer>
                </div>
            )
        }
        else {
            return(
                <div className="all-services" ref="allServices">
                    <div className="row" ref="hello">
                        {this.state.services.map(service => (
                            <ServiceListItem key={`service-${service.id}`}
                                             service={service}
                                             height={this.state.height || 'auto'}
                                             name={service.name}
                                             created={service.created}
                                             description={service.description}
                                             amount={service.amount}
                                             interval={service.interval}
                                             url={`/service-catalog/${service.id}/request`} />
                        ))}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return { options: state.options }
};

export default connect(mapStateToProps)(ServiceList);
