/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    HOST_URL: process.env.REACT_APP_HOST_URL,
    USER_LOGIN_URL: process.env.REACT_APP_HOST_URL + process.env.REACT_APP_USER_LOGIN_URL,
    TRANSACTIONS_REPORT_URL: process.env.REACT_APP_HOST_URL + process.env.REACT_APP_TRANSACTIONS_REPORT_URL,
    TRANSACTIONS_LIST_URL: process.env.REACT_APP_HOST_URL + process.env.REACT_APP_TRANSACTIONS_LIST_URL,
    TRANSACTION_QUERY_URL: process.env.REACT_APP_HOST_URL + process.env.REACT_APP_TRANSACTION_QUERY_URL,
    CLIENT_QUERY_URL: process.env.REACT_APP_HOST_URL + process.env.REACT_APP_CLIENT_QUERY_URL
  }
}

module.exports = nextConfig