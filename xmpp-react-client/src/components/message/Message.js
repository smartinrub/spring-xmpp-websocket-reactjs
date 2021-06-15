import React from 'react';

const Message = ({ content, type }) => {
  let wrapperClassName = 'outgoing-msg';
  let className = 'sent-msg';
  if (type === 'NEW_MESSAGE') {
    wrapperClassName = 'incoming-msg';
    className = 'received-msg received-withd-msg';
  }
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var today = new Date();
  let minutes =
    today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
  let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
  let time = hours + ':' + minutes;
  let date =
    days[today.getDay()] +
    ' ' +
    today.getDate() +
    ' ' +
    months[today.getMonth()];

  return (
    <div className={wrapperClassName}>
      {/* <div className="incoming-msg-img">
        {' '}
        <Image
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />{' '}
      </div> */}
      <div className={className}>
        <p>{content}</p>
        <span className="time-date">
          {time} | {date}
        </span>
      </div>
    </div>
  );
};

export default Message;
