import React from 'react';
import { Title } from 'bloomer';
import NotificationSettings from './NotificationSettings';
import Page from './Page';

const Settings = () => (
  <Page>
    <Title isSize={3} tag="h1">Settings</Title>
    <NotificationSettings />
  </Page>
);

export default Settings;
