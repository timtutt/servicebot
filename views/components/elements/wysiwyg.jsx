import React from 'react';
import $ from "jquery";
import "../../../public/js/scripts/redactor/redactor.min.css";
import "../../../public/js/scripts/redactor/redactor.min.js";


class Wysiwyg extends React.Component {
    constructor(props){
        super(props)
        this.insert = this.insert.bind(this);

        this.state = {
        }
    }

    insert(content){
        $(this.refs.wysiwygArea).redactor("buffer.set");
        $(this.refs.wysiwygArea).redactor("insert.raw", content);
    }

    componentDidMount() {
        var self = this;
        $(this.refs.wysiwygArea).redactor();
        $(this.refs.wysiwygArea).on('change.callback.redactor', function(e, data) {
            self.props.onChange(e);
        });

    }
    render(){
        return <textarea onChange={this.props.onChange} name={this.props.name} id="editor" ref="wysiwygArea" value={this.props.value}>

        </textarea>
    }
}

class WysiwygRedux extends React.Component {
    constructor(props){
        super(props);
        this.insert = this.insert.bind(this);
    }

    insert(content){
        $(this.refs.wysiwygArea).redactor("buffer.set");
        $(this.refs.wysiwygArea).redactor("insert.raw", content);
    }

    componentDidMount() {
        var self = this;
        $(this.refs.wysiwygArea).redactor();
        $(this.refs.wysiwygArea).on('change.callback.redactor', function(e, data) {
            self.props.input.onChange(e);
        });

    }
    render(){
        return (
            <div className="form-group">
                {this.props.label && <label className="control-label">{this.props.label}</label>}
                <textarea onChange={this.props.onChange} name={this.props.name} id="editor" ref="wysiwygArea" value={this.props.input.value}/>
            </div>
        );
    }
}

class WysiwygTemplater extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if(!this.props.schema){
            return <div>h</div>
        }
        return (
            <div>
                <Wysiwyg name={this.props.name} value={this.props.value || this.props.defaultValue} ref="wysiwyg" onChange={this.props.onChange}/>
            </div>
        )
    }

}

export {Wysiwyg, WysiwygRedux, WysiwygTemplater};
