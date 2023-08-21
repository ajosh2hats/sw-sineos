import { useEffect, useState } from 'react';

import HelpScout, { NOTIFICATION_TYPES } from '@helpscout/javascript-sdk';
import {
  Button,
  Heading,
  Text,
  useHelpScoutContext,
  useSetAppHeight,
} from '@helpscout/ui-kit';

import { Divider } from '../components/';

function Sidebar() {
  const appRef = useSetAppHeight();

  const [userEmail, setUserEmail] = useState<string | undefined>(
    'unknown user'
  );

  const [status, setStatus] = useState<string | undefined>('unknown status');

  const { user, conversation } = useHelpScoutContext();
  useEffect(() => {
    setUserEmail(user?.email);
    setStatus(conversation?.status);
  }, [user, conversation]);

  function onClick() {
    HelpScout.showNotification(
      NOTIFICATION_TYPES.SUCCESS,
      'Hello from the sidebar app'
    );
  }

  function openSidePanel() {
    const url = new URL(window.location.href);

    if (url.origin) {
      HelpScout.openSidePanel(`${url.origin}/side-panel`);
    }
  }

  return (
    <div ref={appRef}>
      <Heading level="h1">Hi, {userEmail}</Heading>
      <Text>The conversation is {status}</Text>
      <Divider />
      <Button size="sm" onClick={() => onClick()}>
        Click me
      </Button>
      <Divider />
      <Button size="sm" onClick={() => openSidePanel()} theme="red">
        Open side panel
      </Button>
    </div>
  );
}

export default Sidebar;
