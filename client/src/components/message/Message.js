import { user } from "../../store/user";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import "../../style/message.scss";
import { useEffect } from 'react';

const Message = ({message, user}) => {
    const messageStyle = user?.toLowerCase() === message?.userName?.toLowerCase() ? 'message__inner-author' : 'message__inner'

    return (
        <div className="message">
            <div className={messageStyle}>
                <div className="message__avatar">
                    {message?.userName?.slice(0, 2).toUpperCase()}
                </div>
                <div className="message-wrapper">
                    <div className="message__content">
                        <p className="message__user">
                            {message?.userName}
                        </p>
                        <p className="message__text">
                            {message?.text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user
})

export default connect(mapStateToProps)(Message);