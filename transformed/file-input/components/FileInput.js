var emptyFn = function() {};

var FileInput = React.createClass({displayName: "FileInput",
    propTypes: {

        /** @prop {String} chooseButtonClassName - The className of the choose button. */
        chooseButtonClassName: React.PropTypes.string,

        /** @prop {String} chooseButtonText - The text of the choose button. */
        chooseButtonText: React.PropTypes.string,

        /** @prop {String} className - The className of the file input. */
        className: React.PropTypes.string,

        /** @prop {String} clearButtonClassName - The className of the clear button. */
        clearButtonClassName: React.PropTypes.string,

        /** @prop {String} clearButtonText - The text of the clear button. */
        clearButtonText: React.PropTypes.string,

        /** @prop {String} fileNameClassName - The class name of the file name input. */
        fileNameClassName: React.PropTypes.string,

        /** @prop {String} name - The name of the input. */
        name: React.PropTypes.string,

        /** @prop {Function} onChooseClick - The method to call when the choose button is clicked. */
        onChooseClick: React.PropTypes.func,

        /** @prop {Function} onClearClick - The method to call when the clear button is clicked. */
        onClearClick: React.PropTypes.func,

        /** @prop {Function} onFileChange - The method to call when the file input changes. */
        onFileChange: React.PropTypes.func,

        /** @prop {String} placeholder - The placeholder text for the file input */
        placeholder: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            chooseButtonClassName: 'react-ui-file-input-choose',
            chooseButtonText: 'Choose File',
            className: 'react-ui-file-input',
            clearButtonClassName: 'react-ui-file-input-clear',
            clearButtonText: 'Clear File',
            disabled: false,
            fileNameClassName: 'react-ui-file-input-file-name',
            onChooseClick: emptyFn,
            onClearClick: emptyFn,
            onFileChange: emptyFn
        };
    },

    getInitialState: function() {
        return {
            inputKey: 0,
            inputValue: ''
        };
    },

    render: function() {
        return (
            React.createElement("div", {className: this.props.className}, 
                this.renderHiddenInput(), 

                React.createElement("button", {
                className: this.props.chooseButtonClassName, 
                disabled: this.props.disabled, 
                onClick: this.onChooseClick, 
                type: "button"}, this.props.chooseButtonText), 

                React.createElement("button", {
                className: this.props.clearButtonClassName, 
                disabled: this.props.disabled, 
                onClick: this.onClearClick, 
                type: "button"}, this.props.clearButtonText), 

                React.createElement("input", {
                className: this.props.fileNameClassName, 
                disabled: this.props.disabled, 
                placeholder: this.props.placeholder, 
                readOnly: true, 
                type: "textbox", 
                value: this.state.inputValue})
            )
        );
    },

    /**
     * @method renderHiddenInput
     * Renders a hidden input to contain the file uploader.
     */
    renderHiddenInput: function() {
        var hiddenStyle = {display: 'none'};
        var key = 'hidden-input-' + this.state.inputKey;

        return (
            React.createElement("input", {
            key: key, 
            name: this.props.name, 
            onChange: this.onFileChange, 
            ref: "fileInput", 
            style: hiddenStyle, 
            type: "file"})
        );
    },

    /**
     * @method onChooseClick
     * Opens the file selection dialog by programmatically clicking the file input.
     * @param {Object} evt - The click event.
     */
    onChooseClick: function(evt) {
        evt.preventDefault();
        this.refs.fileInput.getDOMNode().click();
        this.props.onChooseClick(evt);
    },

    /**
     * @method onClearClick
     * Clears the file input increasing the id on the input key.
     * Clears the file name by emptying the input value.
     * @param {Object} evt - The click event.
     */
    onClearClick: function(evt) {
        evt.preventDefault();
        this.setState({
            inputKey: this.state.inputKey + 1,
            inputValue: ''
        });
        this.props.onClearClick(evt);
    },

    /**
     * @method onFileChange
     * Sets the input value to the file name when a file is chosen.
     * @param {Object} evt - The click event.
     */
    onFileChange: function(evt) {
        this.setState({
            inputValue: evt.target.value.split('\\').pop()
        });
        this.props.onFileChange(evt);
    }
});

module.exports = FileInput;
