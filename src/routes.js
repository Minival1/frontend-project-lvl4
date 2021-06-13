

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  mainPagePath: () => [host, ""].join("/"),
  loginFormPath: () => [host, "login"].join("/"),
  registerPagePath: () => [host, "signup"].join("/"),
  errorPagePath: () => [host, "*"].join("/"),
  channelsPagePath: () => [host, "channels"].join("/"),
  loginPath: () => [host, prefix, "login"].join("/"),
  registerPath: () => [host, prefix, "signup"].join("/"),
  dataChats: () => [host, prefix, "data"].join("/")
};
