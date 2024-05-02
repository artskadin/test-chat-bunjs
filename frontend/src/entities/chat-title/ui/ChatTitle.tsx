import React from 'react';

function NonMemoChatTitle() {
  return <div>aaa</div>;
}

export const ChatTitle = React.memo(NonMemoChatTitle);
